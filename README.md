
# proxyServer-for-LeagueClientStats

proxyServer-for-LeagueClientStats is a simple proxy server made with express and axios used to comply with riot's CORS guidelines. This is a supplementary project to [LeagueClientStats](https://github.com/psikoo/LeagueClientStats).

## Running the proxy

**Usage information:**

This script runs with Node.js and npm. To run the script you must install Node.js and npm.

**Before running:**

- Create a ".env" inside the root directory of the project and add the following contents to it:
``` env
KEY="YOURAPIKEY"

```
- Get your TOKEN and CLIENTID [here](https://developer.riotgames.com/create-app).

- You also need to install the needed dependencies by running the following command:

```bash
npm install
```

### Actually running the proxy

**start.cmd:**

It starts the proxy server on port 3000.
```bash
.\start.cmd
```
