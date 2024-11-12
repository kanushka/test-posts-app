const express = require("express");
const os = require("os");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send({ status: "OK", message: "Posts app is up and running" });
});

app.get("/posts", async (req, res) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();
    res.send(posts);
});

// Run the server
const PORT = process.env.PORT || 8000;

function getLocalIpAddress() {
    const interfaces = os.networkInterfaces();
    for (const devName in interfaces) {
        const iface = interfaces[devName];

        for (let i = 0; i < iface.length; i++) {
            const alias = iface[i];
            if (alias.family === "IPv4" && !alias.internal) {
                return alias.address;
            }
        }
    }
    return "localhost";
}

// add a new route to get the local ip address
app.get("/ip", (req, res) => {
    const ip = getLocalIpAddress();
    res.send({ ip });
});

// add a new route to check the health of the server
app.get("/health", (req, res) => {
    res.send({ status: "OK" });
});

app.listen(PORT, () => {
    const ip = getLocalIpAddress();
    console.log(`Server running at http://${ip}:${PORT}`);
});
