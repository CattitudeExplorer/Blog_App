import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";


const app = express();
const port = 3000;

let contactComment = [];

// for existing posts on blog application
let newPosts = [
    {
        id: 1,
        title: "The Best Chocolate Cake Recipe", 
        content: `<p><strong>Ingredients:</strong></p>
                  <ul>
                    <li>2 cups/240g of All purpose flour</li>
                    <li>2 cups/300g of sugar (granulated)</li>
                    <li>1/2 cup/50g of cocoa powder</li>
                    <li>1 tbsp baking powder</li>
                    <li>1 tbsp baking soda</li>
                    <li>a pinch of salt</li>
                  </ul>
                  <p><strong>Then in another bowl:</strong></p>
                  <ul>
                    <li>1/2 cup/125 ml of veg oil</li>
                    <li>1 cup/240ml of whole milk</li>
                    <li>1 tbsp of vanilla extract</li>
                    <li>2 large eggs</li>
                  </ul>
                  <p>At the end add 1 cup/236ml of boiling water. 
                  The cake will be in the oven at 180°C for 35 minutes.</p>`,
         image: "/images/chocolate_cake.jpg",
         isUserPresent: false
    },
    {
        id: 2,
        title: "No Bake Strawberry Cheesecake",
        content: `<p><strong>For the crust:</strong></p>
                  <ul>
                    <li>400 g digestive biscuits</li>
                    <li>150 g melted butter</li>
                  </ul>

                  <p><strong>For the cream:</strong></p>
                  <ul>
                    <li>600 g cream cheese</li>
                    <li>500 ml whipping cream (liquid)</li>
                    <li>150 g powdered sugar</li>
                    <li>100 ml cold water</li>
                    <li>100 ml hot milk</li>
                    <li>20 g gelatin</li>
                    <li>1 vanilla pod (seeds)</li>
                  </ul>

                  <p><strong>For the jelly:</strong></p>
                  <ul>
                    <li>300 g strawberries (frozen or fresh)</li>
                    <li>100 ml water</li>
                    <li>3 tablespoons sugar</li>
                    <li>10 g gelatin</li>
                  </ul>

                  <p><strong>For decoration:</strong></p>
                  <ul>
                    <li>300 g fresh strawberries</li>
                  </ul>

                  <p><strong>Instructions:</strong></p>
                  <ol>
                    <li><strong>Make the crust:</strong> Crush biscuits, mix with melted butter, press into pan.</li>
                    <li><strong>Prepare the cream filling:</strong> Mix cream cheese, whipping cream, sugar, vanilla. Dissolve gelatin in hot milk, stir in. Slice strawberries along the pan, pour filling, refrigerate 4+ hours.</li>
                    <li><strong>Prepare the strawberry jelly:</strong> Soak gelatin in cold water. Cook strawberries + sugar, blend, stir in gelatin, pour over cheesecake, refrigerate 2 hours.</li>
                  </ol>`,
           image: "/images/cheesecake.jpg",
           isUserPresent: false
    }
];

app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));   //make everything inside the public folder directly accessible in the browser
app.use(express.urlencoded({extended: true}));  // middleware to read form data

app.get("/", (req,res) => {
    res.render("main.ejs", {posts: newPosts});      
});

app.get("/newPost", (req, res) => {
    res.render("newPost.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
})

app.get("/editPost/:id", (req, res) => {
    const editID = parseInt(req.params.id);
    const postToEdit = newPosts.find(p => p.id === editID);
    
    if(!postToEdit) 
      return res.status(404).send("Post not found!");
    
    
    const cleanedPost = {
      id: postToEdit.id,
      title: postToEdit.title,
      content: postToEdit.content.replace(/<[^>]+>/g, ""),   // remove all HTML tags from the content before sending to the form
      image: postToEdit.image,
      isUserPresent: postToEdit.isUserPresent
      
    };
    res.render("editPost.ejs", {postToEdit: cleanedPost});
});

/* The existing posts */
app.get("/post/:id", (req, res) => {
  const id = parseInt(req.params.id);   // get the id from URL by converting the string into an int
  const postId = newPosts.find(currentPost => currentPost.id === id);

  if(!postId){
    return res.status(404).send("Post was not found!");
  }
  res.render("post.ejs", {postId});
});

/* The new posts that will be created by user */
app.post("/newPost", (req, res) => {
  const id = Date.now();
    const newPostToCreate = {         // the new post created by user
        id,       
        title: req.body.titleNewPost,
        content: req.body.contentofPost.replace(/\r\n/g, '\n'),  // \r\n represents a Windows line break
        isUserPresent: true             /* For textarea from a new post created, to separate the existing posts by the created posts 
                                           from users so the white space is preserved. Lines are broken at newline characters */
    };
    newPosts.push(newPostToCreate);  

    res.redirect("/");  // redirect to home page
});

app.post("/contact", (req, res) => {
    const contactInfo = {
        name: req.body.name,
        email: req.body.email,
        commentSection: req.body.comment
    };
    contactComment.push(contactInfo);  //add the new contact to the array
    res.render("thankyou.ejs", {contactInfo });   // redirect to thank you page using the user's name
});

// Edit option for any post
app.put("/editPost/:id", (req, res) => {

  const editId = parseInt(req.params.id);  

  // find the post clicked to edit
  let postToEdit = newPosts.find(edit => edit.id === editId);

  //check if the post that needs to be edit was found
  if(!postToEdit) {
    return res.status(404).send("The post you want to edit was not found!");
  }
  
  const titleToEdit = req.body.titleNewPost;
  const contentToEdit = req.body.contentofPost;
  //update the post edited
  if(titleToEdit)
    postToEdit.title = titleToEdit;
  if(contentToEdit)
    postToEdit.content = contentToEdit;

  res.redirect(`/post/${editId}`);

});

// Delete option for every post
app.delete("/newPosts/:id", (req, res) => {
    const postidx = parseInt(req.params.id);

    // get the exact post id 
    const postIndex = newPosts.findIndex(p => p.id === postidx);

    // check if the post wasn't found
    if(postIndex === -1){
      return res.status(404).send("Post was not found");
    }

    // delete the post
    newPosts.splice(postIndex, 1);

    //send success message and with JSON the frontend will handle redirect
    res.status(200).json({ message: "Post deleted successfully" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});