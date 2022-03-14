const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get('/', (req, res) => {
    res.json({ message: "Home Page" });
});

app.get("/api", (req, res)=>{
    res.json({ message: "Hi! This is the API!" });
});

app.get("/products", (req, res) => {
    res.json({ message: "Products List" });
});

//à revoir
app.post("/register", (req, res) =>{
    res.json({ message: "Register" });
});

app.post("login", (req, res) => {
    res.json({ message: "Login" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});