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
try {
  const user=req.body;
  await db.query("INSERT INTO users(name,mobile_no,password,country) VALUES($1,$2,$3,$4)",[user.name,user.mobile_no,user.country,user.password]);
  res.redirect("/chats");
}catch(err){
  console.log(err);
  res.send("Failed");
}
});
app.get("/chats",async(req,res)=>{
  try{
    const id=req.body.id;
    const result=await db.query("SELECT rooms.id, rooms.name, rooms.is_group FROM room_members JOIN rooms ON room_members.room_id = rooms.id WHERE id=$1",[id]);
    res.json(result.rows);
  }catch(err){
    console.log(err);
    res.send("Failed");
  }
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});