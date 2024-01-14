import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
const port = 5000;
const API_URL = "http://localhost:4000";
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get("/", async(req,res) =>{
    try{
       const result = await axios.get(API_URL + "/posts");
       res.render("index.ejs",{
        posts: result.data,
       })
    }catch(error){
        res.send("there is probelm loading these page");
    }
});

app.get("/new", (req,res) =>{
    res.render("modify.ejs",{
          heading:"New post",
          submit: "Create new post",
    });
}); 

app.get("/form",async (req,res)=>{
    try{
    const id = req.query.id;
    const result = await axios.get(API_URL + "/posts/" + id);
    // console.log(result.data);
    res.render("index.ejs",{
        posts: result.data,
    })
    }catch( error ){
        res.send("there is probelm loading these page");
    }
})

app.post("/api/posts",async (req,res)=>{
      
      try{
      
        // console.log(req.body);
   
        const result = await axios.post(API_URL + "/posts",req.body);
    //   console.log(result.data);
        res.render("index.ejs",{
         posts: result.data,
        })
     }catch(error){
        console.log(error)
         res.send("there is probelm loading these page");
     }
});

// app.get("/edit/:id", async (req,res) =>{
//    const id = req.params.id
//     const post = await axios.get(API_URL+"/posts/"+ id);
//     console.log("get vala->",post.data[0]);
//     res.render("modify.ejs",{
//           heading:"Edit post",
//           submit: "confirm",
//           post: post.data[0],
//     });

// });   


// app.post("/edit/:id",async (req,res) =>{
//     const id = req.params.id;
//     const udpatedPost = {...req.body, id:id};
//     const result = await axios.patch(API_URL + "/patch", udpatedPost);
//     console.log(result.data);
//     res.render("index.ejs",{
//         posts: result.data,
//     });
// });
 app.get("/edit/:id",async (req,res)=>{
    try{
     const id = req.params.id;
     const result = await axios.get(API_URL + "/posts/" + id,);
     res.render("modify.ejs",{
         heading: "Edit post",
         post: result.data,
         submit: "confirm",
     });
    }catch(error){
        res.send("There is a problem loading these page");
    }
 })

app.post("/api/posts/:id",async (req,res) =>{
      try{
            const id = req.params.id;
            
            console.log("pehle vala ->>" + JSON.stringify(req.body));
            const result = await axios.patch(API_URL+ "/posts/" + id,req.body);
             console.log("bad vala ->>"+ JSON.stringify(result.data));
            res.render("index.ejs",{
                posts: result.data,
            });
            // res.redirect("/");
      }catch( error ){
        res.send("There is problem sending the sata at server");
      }
});

app.get( "/api/posts/delete/:id",async (req,res)=>{
    try{   
        console.log("called");
    const id = +req.params.id;
    console.log(id);
    const result = await axios.delete(API_URL + "/posts/delete/" + id);
    res.render("index.ejs",{
        posts: result.data,
    })   
    }catch( error ){
        
        res.send("There is problem sending theata at server");
    }
}); 

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
  });

