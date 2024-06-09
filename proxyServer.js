var express = require("express");
var cors = require("cors");
const axios = require("axios");

// User cors mode with express
var app = express();
app.use(cors());

// API key
const APIKey = "INSERT API HERE";
const APIParam = `api_key=${APIKey}`;

// Helps to see if the render.com server is up 
app.get("/", function (req, res) {
    res.send("The server is up");
})

// Returns the PUUID of a user
// Requires the "region", "gameName" and "tag" query parameters
app.get("/getPUUID", async (req, res) => {
    // Check if required query parameters are present
    const queries = req.query;
    if(!queries.region) {
        res.json("no region provided")
    } else if(!queries.gameName) {
        res.json("no gameName provided")
    } else if(!queries.tag) {
        res.json("no tag provided")
    } 
    const region = queries.region;
    const gameName = queries.gameName;
    const tag = queries.tag;

    // GET returns PUUID
    const PUUID = await axios.get(`https://${region}/riot/account/v1/accounts/by-riot-id/${gameName}/${tag}?${APIParam}`)
    .then(res => {
        return res.data.puuid;
    }).catch((error) => {
        console.log(`/getPUUID ERROR: ${error}`);
    });
    res.json(PUUID)
});

// Returns the RiotID of a user
// Requires the "region"and "PUUID" query parameters
app.get("/getRiotID", async (req, res) => {
    // Check if required query parameters are present
    const queries = req.query;
    if(!queries.region) {
        res.json("no region provided")
    } else if(!queries.PUUID) {
        res.json("no PUUID provided")
    }
    const region = queries.region;
    const PUUID = queries.PUUID;

    // GET returns a string with the RiotID (gameName#tag)
    const RiotID = await axios.get(`https://${region}/riot/account/v1/accounts/by-puuid/${PUUID}?${APIParam}`)
    .then(res => {
        return `${res.data.gameName}#${res.data.tagLine}`;
    }).catch((error) => {
        console.log(`/getRiotID ERROR: ${error}`);
    });
    res.json(RiotID)
});

// Returns the icon and level of a user
// Requires the "server"and "PUUID" query parameters
app.get("/getIconAndLevel", async (req, res) => {
    // Check if required query parameters are present
    const queries = req.query;
    if(!queries.server) {
        res.json("no server provided")
    } else if(!queries.PUUID) {
        res.json("no PUUID provided")
    }
    const server = queries.server;
    const PUUID = queries.PUUID;

    // GET returns a json object with the profileIconId and the summonerLevel
    const IconAndLevel = await axios.get(`https://${server}/lol/summoner/v4/summoners/by-puuid/${PUUID}?${APIParam}`)
    .then(res => {
        return JSON.parse(`{"profileIconId": "${res.data.profileIconId}", "summonerLevel": "${res.data.summonerLevel}"}`);
    }).catch((error) => {
        console.log(`/getIconAndLevel ERROR: ${error}`);
    });
    res.json(IconAndLevel)
});

// Returns X amount of games from a user
// Requires the "region", "PUUID" and "count" query parameters
// Optional "startTime", "endTime", "type", "start" query parameters
app.get("/getXGameIDs", async (req, res) => {
    // Check if required query parameters are present
    const queries = req.query;
    if(!queries.region) {
        res.json("no region provided");
    } else if(!queries.PUUID) {
        res.json("no PUUID provided");
    } else if(!queries.count) {
        res.json("no PUUID provided");
    }
    const region = queries.region;
    const PUUID = queries.PUUID;
    const count = queries.count;
    // Optional query parameters
    const startTime = queries.startTime;
    const endTime = queries.endTime;
    const type = queries.type;
    const start = queries.start;

    // GET returns a json object with X amount of games depending on the optional query parameters
    const GameIDs = await axios.get(`https://${region}/lol/match/v5/matches/by-puuid/${PUUID}/ids?${APIParam}&count=${count}&start=${start}&startTime=${startTime}&endTime=${endTime}&type=${type}`)
    .then(res => {
        return `${res.data}`;
    }).catch((error) => {
        console.log(`/getXGameIDs ERROR: ${error}`);
    });
    res.json(GameIDs)
});

// Use port 3000 to connect to the server
app.listen(3000, function () {
    console.log("Server started on port 3000");
});