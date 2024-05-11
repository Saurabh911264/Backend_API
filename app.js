import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import Assistant from "./models/model.js";

mongoose.connect("mongodb://0.0.0.0:27017/", {
    dbName: "Backend"
}).then(() => console.log("Database Connected"))
    .catch((e) => console.log(e));

const app = express();
app.use(express.json());
app.listen(4000,()=>{
    console.log("Server is working");
})

app.get("/",(req,res)=>{
    res.send("Nice working");
})

app.get("/users/get/all", async (req, res) => {
  try {
    const users = await Assistant.find();
    res.status(200).json({
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

app.get("/users/getid", async (req, res) => {
  const id = req.query.id;
  try {
    const users = await Assistant.find({id});
    res.status(200).cookie("abc","xyz").json({
      success: true,
      users: users
    }); 
  } catch (error) {
    console.error("Error fetching users:", error);
    res.json({
      success: false,
      error: error.message
    });
  }
});


app.post("/users/post", async (req, res) => {
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
    const user = await Assistant.create({
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
  console.log("id of the assistant inserted : "+id)
});

app.put("/users/update/:id", async (req, res) => {
  const assistantId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedAssistant = await Assistant.findOneAndUpdate(
      { id: assistantId },
      updatedData,
      { new: true }
    );
    res.json({
      success: true,
      message: "Assistant updated successfully",
      assistant: updatedAssistant
    });
  } catch (error) {
    console.error("Error updating assistant:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.delete("/users/delete/:id", async (req, res) => {
  const assistantId = req.params.id;
  try {
    await Assistant.findOneAndDelete({ id: assistantId });
    res.json({
      success: true,
      message: "Assistant deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting assistant:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

