import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";


const app = express();
const port = 4000;

let contactComment = [];

// for existing posts on blog application
let newPosts = [
    {
        id: 1,
        title: "The Best Chocolate Cake Recipe", 
        content: `Ingredients:
                    2 cups/240g of All purpose flour
                    2 cups/300g of sugar (granulated)
                    1/2 cup/50g of cocoa powder
                    1 tbsp baking powder
                    1 tbsp baking soda
                    a pinch of salt
                  
                  Then in another bowl:
                    1/2 cup/125 ml of veg oil
                    1 cup/240ml of whole milk
                    1 tbsp of vanilla extract
                    2 large eggs
                  At the end add 1 cup/236ml of boiling water. 
                  The cake will be in the oven at 180°C for 35 minutes.`,
         image: "/images/chocolate_cake.jpg",
    },
    {
        id: 2,
        title: "No Bake Strawberry Cheesecake",
        content: `For the crust:
                    400 g digestive biscuits
                    150 g melted butter

                  For the cream:
                    600 g cream cheese
                    500 ml whipping cream (liquid)
                    150 g powdered sugar
                    100 ml cold water
                    100 ml hot milk
                    20 g gelatin
                    1 vanilla pod (seeds)
                  
                  For the jelly:
                    300 g strawberries (frozen or fresh)
                    100 ml water
                    3 tablespoons sugar
                    10 g gelatin
                  
                  For decoration:
                    300 g fresh strawberries
                  
                  Instructions:
                    Make the crust: Crush biscuits, mix with melted butter, press into pan.
                    Prepare the cream filling: Mix cream cheese, whipping cream, sugar, vanilla. Dissolve gelatin in hot milk, stir in. Slice strawberries along the pan, pour filling, refrigerate 4+ hours.
                    Prepare the strawberry jelly: Soak gelatin in cold water. Cook strawberries + sugar, blend, stir in gelatin, pour over cheesecake, refrigerate 2 hours.
                  `,
           image: "/images/cheesecake.jpg",
    }
];

let lastID = 2;

// Middleware
//app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Get all posts 
app.get("/posts", (req, res) => {
  console.log("This is the page where you see all posts!");
  res.json(newPosts);      
});

// Get a specific post by id
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const findID = newPosts.find((post) => post.id === id);
  console.log("This is the edit page!");

  if(!findID)
    return res.status(404).json({error: `Post with id: ${id} was not found`});

  res.json(findID);
   
});

// POST a new post
app.post("/posts", (req, res) => {
  const newID = lastID += 1;
  const post = {
    id: newID,
    title: req.body.title,
    content: req.body.content,
  };

  newPosts.push(post);
  console.log("API BODY:", req.body);
  res.status(201).json(post);
});


// Update a post
app.put("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = newPosts.find((p) => p.id === id);
  
  if(!post){
    return res.status(404).json({ error: "Post not found"});
  }

  if(req.body.title)
    post.title = req.body.title;
  if(req.body.content)
    post.content = req.body.content;

  res.json(post);
});

// Delete a specific post by providing the past id.
app.delete("/posts/:id", (req, res) => {
  const postID = newPosts.findIndex((p) => p.id === parseInt(req.params.id));
  if(postID === -1)
      return res.status(404).json({ message: "Post not found"});

  newPosts.splice(postID, 1);
  res.json({ message: "Post deleted!"});
});

app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
});