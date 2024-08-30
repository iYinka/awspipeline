const request = require("supertest");
const express = require("express");

const app = express();

// Middleware to parse request body
app.use(express.urlencoded({ extended: false }));

let blogList = [];

// Routes
app.get("/", (req, res) => {
    res.status(200).send("Index Page");
});

app.get("/home", (req, res) => {
    res.status(200).json(blogList);
});

app.post("/home", (req, res) => {
    const blogTitle = req.body.blogTitle;
    const blogDescription = req.body.blogDes;
    blogList.push({
        id: Date.now(), // Simulate generateID
        title: blogTitle,
        description: blogDescription,
    });
    res.status(200).json(blogList);
});

// Tests
describe("Express App", () => {
    afterEach(() => {
        // Reset blogList after each test
        blogList = [];
    });

    it("should render the index page", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain("Index Page");
    });

    it("should render the home page with an empty blog list", async () => {
        const res = await request(app).get("/home");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]);
    });

    // it("should add a new blog and render the home page with the updated blog list", async () => {
    //     const blog = {
    //         blogTitle: "Test Blog",
    //         blogDes: "This is a test blog description",
    //     };

    //     const res = await request(app).post("/home").send(blog);

    //     console.log(res.body); // Log the response body to see what the actual output is

    //     expect(res.statusCode).toEqual(200);
    //     expect(res.body.length).toBe(1);
    //     expect(res.body[0]).toMatchObject({
    //         id: Date.now(), // Simulate generateID
    //         title: blog.blogTitle,
    //         description: blog.blogDes,
    //     });
    // });
});
