import mongoose, { Schema } from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/paytm")
  .then(() => {
    console.log("DB connected");
  })
  .catch(() => {
    console.log("DB not connected");
  });

const userSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

const accountSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
})

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

export {User, Account};
