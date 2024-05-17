var express = require("express");
var cors = require("cors");
const axios = require("axios");

var app = express();

app.use(cors());

const APIKey = "RGAPI-1643052f-39b4-42c6-bdd1-26bae937d3e9";
const APIParam = `?api_key=${APIKey}`;

app.get("/", function (req, res) {
    res.send("working");
})

app.get("/getPUUID", async (req, res) => {
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

    const PUUID = await axios.get(`https://${region}/riot/account/v1/accounts/by-riot-id/${gameName}/${tag}${APIParam}`)
    .then(res => {
        return res.data.puuid;
    }).catch((error) => {
        console.log(`ERROR: ${error}`);
    });
    res.json(PUUID)
});

app.get("/getRiotID", async (req, res) => {
    const queries = req.query;
    if(!queries.region) {
        res.json("no region provided")
    } else if(!queries.PUUID) {
        res.json("no PUUID provided")
    }
    const region = queries.region;
    const PUUID = queries.PUUID;

    const RiotID = await axios.get(`https://${region}/riot/account/v1/accounts/by-puuid/${PUUID}${APIParam}`)
    .then(res => {
        return `${res.data.gameName}#${res.data.tagLine}`;
    }).catch((error) => {
        console.log(`ERROR: ${error}`);
    });
    res.json(RiotID)
});

app.get("/getIconAndLevel", async (req, res) => {
    const queries = req.query;
    if(!queries.server) {
        res.json("no server provided")
    } else if(!queries.PUUID) {
        res.json("no PUUID provided")
    }
    const server = queries.server;
    const PUUID = queries.PUUID;

    const IconAndLevel = await axios.get(`https://${server}/lol/summoner/v4/summoners/by-puuid/${PUUID}${APIParam}`)
    .then(res => {
        return JSON.parse(`{"profileIconId": "${res.data.profileIconId}", "summonerLevel": "${res.data.summonerLevel}"}`);
    }).catch((error) => {
        console.log(`ERROR: ${error}`);
    });
    res.json(IconAndLevel)
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});