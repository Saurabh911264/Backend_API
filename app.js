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

app.get("/users/get/all", async (req, res) => {
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

app.get("/users/getid", async (req, res) => {
  const id = req.query.id;
  try {
    const users = await Customer.find({id});
    res.json({
      success: true,
      users: users
    }); 
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).cookie("abc","xyz").json({
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

// PUT update customer by ID
app.put("/users/update/:id", async (req, res) => {
  const customerId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedCustomer = await Customer.findOneAndUpdate(
      { id: customerId },
      updatedData,
      { new: true }
    );
    res.json({
      success: true,
      message: "Customer updated successfully",
      customer: updatedCustomer
    });
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// DELETE customer by ID
app.delete("/users/delete/:id", async (req, res) => {
  const customerId = req.params.id;
  try {
    await Customer.findOneAndDelete({ id: customerId });
    res.json({
      success: true,
      message: "Customer deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});



// saurabhdeshmukh267

// edRK2O3wzdljBB2K

// mongodb://localhost:27017/

// mongodb+srv://saurabhdeshmukh267:edRK2O3wzdljBB2K@cluster0.lp6c8dn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0