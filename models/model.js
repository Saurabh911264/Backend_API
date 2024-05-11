import mongoose from "mongoose";

const AssistantSchema = new mongoose.Schema({
  id: Number,
  name: String,
  mobile: Number,
  email: String,
  salary: Number,
  city: String,
  country: String,
  department: String
});

const Assistant = mongoose.model("Assistant", AssistantSchema);

export default Assistant;
