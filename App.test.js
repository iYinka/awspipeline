const request = require("supertest");
const express = require("express");

const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.send("Hello Beanstalk!");
});

describe("GET /", () => {
    it("should respond with 'Hello Beanstalk!'", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Hello Beanstalk!");
    });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
