import express from "express"
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(express.static("public")); // make everything inside the public folder directly accessible in the browser

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Route to render the main page
app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/posts`);
        console.log(response);
        res.render("main.ejs", { posts: response.data });
    } catch(error) {
        res.status(500).json({ message: "Error fetching posts" });
    }
});

// Route to render the new page
app.get("/newPost", (req, res) => {
    res.render("post.ejs", { mode: "create"});
});

// Route to render the edit page
app.get("/posts/:id/edit", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await axios.get(`${API_URL}/posts/${id}`);
        res.render("post.ejs", {
            id: id,
            mode: "edit", 
            post: response.data
        });
        console.log("Edit:", response.data);

    } catch(error) {
        res.status(500).json({ message: "Error by fetching post"});
    }
});

// Rout to render the view page
app.get("/posts/:id/view", async(req, res) => {
    try {
        const id = req.params.id;
        const response = await axios.get(`${API_URL}/posts/${id}`);

        res.render("post.ejs", {
            id: id,
            mode: "view",
            post: response.data
        });
        console.log("View:", response.data);

    } catch (error) {
        res.status(500).json({ message: "Error by fetching post"});
    }
});

// Route to render the about page
app.get("/about", (req, res) =>{
    res.render("about.ejs");
});

// Route to render the about page
app.get("/contact", (req, res) =>{
    res.render("contact.ejs");
});

// Create a new post
app.post("/posts", async (req, res) => {
    try{
        const response = await axios.post(`${API_URL}/posts`, req.body);
        console.log(response.data);
        console.log("BODY:", req.body);
        res.redirect("/");
    } catch(error){
        res.status(500).json({ message: "Error creating post"});
    }
});

// Update a post 
app.post("/posts/:id/edit", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await axios.put(`${API_URL}/posts/${id}`, req.body);
        
        console.log(response.data);
        res.redirect("/");
        
    } catch (error) {
        res.status(500).json({ message: "Error updating post"});
    }
});

// Delete a post
app.get("/posts/:id/delete", async (req, res) => {
    try {
        await axios.delete(`${API_URL}/posts/${req.params.id}`);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: "Error deleting post" });
    }
});

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});