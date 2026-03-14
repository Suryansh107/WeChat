import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import env from "dotenv";
import bcrypt from "bcrypt";
const app=express();
const port=3000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

env.config();
const db=new pg.Client({
  user:"postgres",
  host:"localhost",
  database:"WeChat",
  password:process.env.PG_PASSWORD,
  port:5433
});

db.connect();

app.use(
  session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  { usernameField: "mobile_no", passwordField: "password" },
  async (mobile_no, password, done) => {
  console.log("Received mobile_no:", mobile_no);
  console.log("Received password:", password);
  try {
      const result = await db.query(
        "SELECT * FROM users WHERE mobile_no = $1",
        [mobile_no]
      );

      if(result.rows.length === 0) {
        return done(null, false, { message: "User not found" });
      }

      const user = result.rows[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) {
        return done(null, false, { message: "Wrong password" });
      }

      return done(null, user);
    } catch(err) {
      return done(err);
    }
  }
));


app.get("/",async(req,res)=>{
  res.send("Hello World");
})

app.post("/Create",async(req,res)=>{
try {
  const user=req.body;
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const result=await db.query("INSERT INTO users(name,mobile_no,password,country) VALUES($1,$2,$3,$4) RETURNING *",[user.name,user.mobile_no,hashedPassword,user.country]);
  const newUser = result.rows[0];

    // log them in automatically after registering
    req.logIn(newUser, (err) => {
      if(err) return res.status(500).json({ message: "Login after register failed" });
      res.json({ message: "User created successfully", user: newUser });
    });
}catch(err){
  console.log(err);
  res.status(500).json({ message: "Registration failed" });
}
});

app.post("/Login", (req, res, next) => {
  console.log("Login route hit");
  console.log("req.body:", req.body);
  passport.authenticate("local", (err, user, info) => {
    if(err) return res.status(500).json({ message: "Something went wrong" });
    if(!user) return res.status(401).json({ message: info.message });

    req.logIn(user, (err) => {
      if(err) return res.status(500).json({ message: "Login failed" });
      res.json({ message: "Login successful", user });
    });
  })(req, res, next);
});

app.post("/Logout", (req, res) => {
  req.logout((err) => {
    if(err) return res.status(500).json({ message: "Logout failed" });
    res.json({ message: "Logged out successfully" });
  });
});

app.get("/me", (req, res) => {
  if(req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) return next();
  res.status(401).json({ message: "Please login first" });
}

app.get("/People",isLoggedIn,async(req,res)=>{
  try{
    const id=req.user.id;
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
    const  otherUserId  = req.body;
    const  currentUserId=req.user.id;
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
    const roomName = req.body;
    const currUserId=req.user.id;
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

passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
  try {
    const result = await db.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    done(null, result.rows[0]);
  } catch(err) {
    done(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});