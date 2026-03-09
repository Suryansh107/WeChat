import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app=express();
const port=3000;

const db=new pg.Client({
  user:"postgres",
  host:"localhost",
  database:"WeChat",
  password:"notacoolpassword",
  port:5433
});

db.connect();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",async(req,res)=>{
  res.send("Hello World");
})

app.post("/Create",async(req,res)=>{
  const user=req.body;
  db.query("INSERT INTO users(name,mobile_no,password,country) VALUES($1,$2,$3,$4)",)

})



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});