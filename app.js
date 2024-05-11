import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";


mongoose.connect("mongodb://0.0.0.0:27017/", {
    dbName: "Backend"
}).then(() => console.log("Database Connected"))
    .catch((e) => console.log(e));

const CustomerSchema = new mongoose.Schema({
  id : Number,
  name : String,
  mobile : Number,
  email : String,
  salary : Number,
  city : String,
  country : String,
  department : String
});

const Customer = mongoose.model("Customer", CustomerSchema);
    

const app = express();
app.use(express.json());
app.listen(4000,()=>{
    console.log("Server is working");
})

app.get("/",(req,res)=>{
    res.send("Nice working");
})

app.get("/users/all", async (req, res) => {
  try {
    const users = await Customer.find();
    res.json({
      success: true,
      users: users
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


app.post("/users/new", async (req, res) => {
  console.log(req.body); // Log the request body to inspect JSON data
  const { id,
      name,
      mobile,
      email,
      salary,
      city,
      country,
      department} = req.body;
  try {
    const user = await Customer.create({
      id,
      name,
      mobile,
      email,
      salary,
      city,
      country,
      department
    });
    res.status(201).cookie("tempi","abc").json({
      message: "Signed up successfully",
      success: true,
      user
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Failed to sign up",
      success: false,
      error: error.message
    });
  }
});



// saurabhdeshmukh267

// edRK2O3wzdljBB2K

// mongodb://localhost:27017/

// mongodb+srv://saurabhdeshmukh267:edRK2O3wzdljBB2K@cluster0.lp6c8dn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0