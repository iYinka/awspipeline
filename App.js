const express = require("express");
const app = express();
const port = 8080;



const secret = "secret"; // The secret you configured in GitHub

app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
    const payload = req.body;
    const signature = req.headers["x-hub-signature-256"];
    const computedSignature = `sha256=${crypto
        .createHmac("sha256", secret)
        .update(JSON.stringify(payload))
        .digest("hex")}`;

    if (signature === computedSignature) {
        console.log("Received valid payload:", payload);
        // Process the payload here (e.g., extract PR number)
        res.status(200).send("OK");
    } else {
        console.error("Invalid signature");
        res.status(403).send("Forbidden");
    }
});

app.get("/", (req, res) => {
    res.send("Hello Beanstalk!");
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

