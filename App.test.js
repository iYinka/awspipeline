const request = require("supertest");
const { app, server } = require("./App.js"); // Import the app and server instance

describe("Express App", () => {
    let originalDateNow;

    beforeAll(() => {
        originalDateNow = Date.now;
        Date.now = jest.fn(() => 1234567890);
    });

    afterAll(() => {
        Date.now = originalDateNow;
        server.close(); // Close the server to prevent Jest from hanging
    });

    // test("GET /health returns 200", async () => {
    //     const response = await request(app).get("/health");
    //     expect(response.status).toBe(200);
    //     expect(response.text).toBe("Healthy");
    // });

    // // Your tests go here

    // test("GET /health returns 200", async () => {
    //     const response = await request(server).get("/health");
    //     expect(response.status).toBe(200);
    //     expect(response.text).toBe("Healthy");
    // });

    // it("should render the index page", async () => {
    //     const res = await request(server).get("/");
    //     expect(res.statusCode).toEqual(200);
    //     expect(res.text).toContain("<title>Blog App</title>"); // Adjust as needed
    // });

    // it("should render the index page", async () => {
    //     const res = await request(app).get("/");
    //     expect(res.statusCode).toEqual(200);

    //     // Check that the response contains the expected title or any unique content of the index page
    //     expect(res.text).toContain("<title>Blog App</title>"); // Or any unique title/content on your index page

    //     // Alternatively, check for an element that is definitely on the page
    //     expect(res.text).toContain('<h1><a href="#">myDaily Blog</a></h1>'); // Adjust this to something unique to your index.ejs file
    // });

    // it("should render the home page with an empty blog list", async () => {
    //     const res = await request(app).get("/home");
    //     expect(res.statusCode).toEqual(200);
    //     expect(res.text).toContain("You don't have any blogs yet"); // Check for empty blog message
    // });

    // it("should add a new blog and render the home page with the updated blog list", async () => {
    //     const blog = {
    //         blogTitle: "Test Blog",
    //         blogDes: "This is a test blog description.....",
    //     };

    //     const res = await request(app).post("/home").type("form").send(blog);

    //     expect(res.statusCode).toEqual(302); // Check for redirect
    //     expect(res.header.location).toBe("/home");

    //     // Verify the blog is added
    //     const homeRes = await request(app).get("/home");
    //     expect(homeRes.statusCode).toEqual(200);
    //     expect(homeRes.text).toContain(blog.blogTitle); // Verify the title is displayed
    //     expect(homeRes.text).toContain(blog.blogDes.slice(0, 300)); // Verify a snippet of the description is displayed
    // });

    // it("should return a 400 error if blog title or description is missing", async () => {
    //     const resWithoutTitle = await request(app).post("/home").send({
    //         blogDes: "Missing title",
    //     });

    //     expect(resWithoutTitle.statusCode).toEqual(400); // Check for error
    //     expect(resWithoutTitle.text).toContain(
    //         "Missing blog title or description"
    //     );

    //     const resWithoutDescription = await request(app).post("/home").send({
    //         blogTitle: "Missing description",
    //     });

    //     expect(resWithoutDescription.statusCode).toEqual(400); // Check for error
    //     expect(resWithoutDescription.text).toContain(
    //         "Missing blog title or description"
    //     );
    // });

    // it("should delete a blog by ID and redirect to /home", async () => {
    //     // Step 1: Add a blog to delete
    //     let res = await request(app).post("/home").type("form").send({
    //         blogTitle: "Blog to Delete",
    //         blogDes: "Description to delete",
    //     });

    //     // Step 2: Capture the newly added blog ID (assuming Date.now() is used for IDs)
    //     const addedBlogId = 1234567890; // Replace with actual logic if ID is dynamic

    //     // Step 3: Delete the blog using the captured ID
    //     res = await request(app).post(`/delete/${addedBlogId}`);

    //     // Step 4: Check that the deletion was successful (status 302 for redirect)
    //     expect(res.statusCode).toBe(302);
    //     expect(res.headers.location).toBe("/home");

    //     // Step 5: Verify that the blog no longer exists
    //     res = await request(app).get("/home");
    //     expect(res.text).not.toContain("Blog to Delete");
    // });

    // it("should render blog details if the blog exists", async () => {
    //     // Add a blog
    //     await request(app)
    //         .post("/home")
    //         .type("form")
    //         .send({ blogTitle: "Blog Title", blogDes: "Blog Description" });

    //     // Request blog details by ID
    //     const res = await request(app).get("/blogDetails/1234567890");

    //     // Check the response contains the correct blog details
    //     expect(res.statusCode).toBe(200);
    //     expect(res.text).toContain("Blog Title");
    //     expect(res.text).toContain("Blog Description");
    // });

    // it("should return 404 if the blog does not exist", async () => {
    //     const res = await request(app).get("/blogDetails/9999"); // Non-existent blog ID

    //     // Check that a 404 status is returned
    //     expect(res.statusCode).toBe(404);
    //     expect(res.text).toContain("Blog not found");
    // });

    it("should return 404 when trying to edit a non-existent blog", async () => {
        const res = await request(app).get("/edit/9999"); // Non-existent blog ID

        // Check that a 404 status is returned
        expect(res.statusCode).toBe(404);
        expect(res.text).toContain("Blog not found");
    });

    it("should return 404 when updating a non-existent blog", async () => {
        const res = await request(app)
            .post("/edit/9999") // Non-existent blog ID
            .type("form")
            .send({
                blogTitle: "Updated Title",
                blogDes: "Updated Description",
            });

        // Check that a 404 status is returned
        expect(res.statusCode).toBe(404);
        expect(res.text).toContain("Blog not found");
    });
});
