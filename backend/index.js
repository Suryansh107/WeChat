import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
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
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",async(req,res)=>{
  res.send("Hello World");
})

app.post("/Create",async(req,res)=>{
try {
  const user=req.body;
  await db.query("INSERT INTO users(name,mobile_no,password,country) VALUES($1,$2,$3,$4)",[user.name,user.mobile_no,user.password,user.country]);
  res.json({ message: "User created successfully" });
}catch(err){
  console.log(err);
  res.status(500).json({ message: "Registration failed" });
}
});

app.get("/People",async(req,res)=>{
  try{
    const id=req.query.id;
    const result=await db.query("SELECT rooms.id, rooms.name, rooms.is_group FROM room_members JOIN rooms ON room_members.room_id = rooms.id WHERE room_members.user_id=$1",[id]);
    res.json(result.rows);
  }catch(err){
    console.log(err);
    res.status(500).json({ message: "Failed" });
  }
});
app.get("/People/search",async(req,res)=>{
  try{
    const tel=req.query.query;
    const ress=await db.query("SELECT id,name FROM users WHERE mobile_no=$1",[tel]);
    res.json(ress.rows);
  }catch(err){
    console.log(err);
    res.status(500).json({ message: "Failed" });
  }
})
app.post("/People/AddPeople", async (req, res) => {
  try {
    const { otherUserId, currentUserId } = req.body;
    const userResult = await db.query(
      "SELECT name FROM users WHERE id = $1",
      [otherUserId]
    );
    const otherUserName = userResult.rows[0].name;
    const roomResult = await db.query(
      "INSERT INTO rooms(name, is_group) VALUES($1, false) RETURNING *",
      [otherUserName]
    );
    const room = roomResult.rows[0];

    await db.query(
      "INSERT INTO room_members(room_id, user_id) VALUES($1, $2), ($1, $3)",
      [room.id, currentUserId, otherUserId]
    );

    res.json({ message: "DM created successfully" });
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: "Failed" });
  }
});

app.post("/People/CreateRoom",async(req,res)=>{
  try{
    const {roomName,currUserId} = req.body;
    const roomRes=await db.query(
     "INSERT INTO rooms(name,is_group,created_by) VALUES($1,true,$2) RETURNING *",
     [roomName,currUserId] 
    );
    const room=roomRes.rows[0];
    await db.query(
      "INSERT INTO room_members(room_id,user_id) VALUES($1,$2)",
      [room.id,currUserId]
    );
    res.json({message : "Group Crested Successfully"})


  }catch(err){
    console.log(err);
  }

});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});