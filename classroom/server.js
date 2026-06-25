const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");

app.use(cookieParser("secretcode"));

app.get("/getsignedcookie", (req, res) =>{
    res.cookie("made-in", "India", {signed: true});
    res.send("Done! Signed cookie sent");
});

app.get("/verify", (req, res) =>{
    console.log(req.signedcookies0);
    res.send("Verified")
})

app.get("/getcookies", (req, res) =>{
    res.cookie("greet", "hello");
    res.cookie("madeIn", "India");
    res.send("sent you some cookies");
});


app.get("/", (req, res) =>{
    let {name = "anonymous"} = req.cookies;
    res.send(`Hi, ${name}`);
});

app.use("/users", users);
app.use("/posts", posts);


app.listen(3000, () =>{
    console.log("Server is listening to 3000");
});