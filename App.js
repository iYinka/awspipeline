const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { __express: ejs } = require("ejs");
const app = express();
const port = 3000;



// Configure Express middleware
app.use(bodyParser.urlencoded({ extended: false }));
// Set up EJS as the templating engine
app.set("view engine", "ejs");
app.engine("ejs", ejs);
const paths = {
    index: path.join(__dirname, "index.ejs"),
    home: path.join(__dirname, "views/home.ejs"),
    blogDetails: path.join(__dirname, "views/blogDetails.ejs"),
};
// Initialize blog list
let blogList = [];
app.use(express.static(path.join(__dirname, "public")));
// Health check route
app.get("/health", (req, res) => res.status(200).send("Healthy"));
// Render index page
app.get("/", (req, res) => res.render(paths.index));
// Render home page with blog list
app.get("/home", (req, res) => res.render(paths.home, { blogList }));
// Add new blog
app.post("/home", (req, res) => {
    const { blogTitle, blogDes } = req.body;
    if (!blogTitle || !blogDes) {
        return res.status(400).send("Missing blog title or description");
    }
    blogList.push({
        id: Date.now(),
        title: blogTitle,
        description: blogDes,
    });
    res.redirect("/home");
});
// Delete a blog
app.post("/delete/:id", (req, res) => {
    const blogId = parseInt(req.params.id, 10);
    blogList = blogList.filter((blog) => blog.id !== blogId);
    res.redirect("/home");
});
// Render blog details page
app.get("/blogDetails/:id", (req, res) => {
    const blogId = parseInt(req.params.id, 10);
    const blogDetails = blogList.find((blog) => blog.id === blogId);
    if (!blogDetails) {
        return res.status(404).send("<h1>Blog not found</h1>");
    }
    res.render(paths.blogDetails, { blogDetails });
});
// Render edit blog page
app.get("/edit/:id", (req, res) => {
    const blogId = parseInt(req.params.id, 10);
    const blogDetails = blogList.find((blog) => blog.id === blogId);
    if (!blogDetails) {
        return res.status(404).send("<h1>Blog not found</h1>");
    }
    res.render(paths.index, { isEdit: true, blogDetails });
});
// Update blog
app.post("/edit/:id", (req, res) => {
    const blogId = parseInt(req.params.id, 10);
    const { blogTitle: updatedTitle, blogDes: updatedDescription } = req.body;
    const blogIndex = blogList.findIndex((blog) => blog.id === blogId);
    if (blogIndex === -1) {
        return res.status(404).send("<h1>Blog not found</h1>");
    }
    blogList[blogIndex] = {
        ...blogList[blogIndex],
        title: updatedTitle,
        description: updatedDescription,
    };
    res.redirect("/home");
});
// Start the server
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = { app, server };
