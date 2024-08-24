const request = require("supertest");
const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.send("Hello Beanstalk!");
});

let server;

beforeAll((done) => {
    server = app.listen(port, () => {
        console.log(`Test server listening on port ${port}`);
        done();
    });
});

afterAll((done) => {
    server.close(done);
});

describe("GET /", () => {
    it("should return Hello Beanstalk!", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Hello Beanstalk!");
    });
});
