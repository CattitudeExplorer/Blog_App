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

// Route to render the nwe page
app.get("/newPost", (req, res) => {
    res.render("newPost.ejs", { heading: "New Post", submit: "Create Post" });
});

// Route to render the edit page
app.get("/posts/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await axios.get(`${API_URL}/posts/${id}`);
        console.log(response.data);

        res.render("editPost.ejs", { heading: "Edit Post", post: response.data});

    } catch(error) {
        res.status(500).json({ message: "Error by fetching post"});
    }
});

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});