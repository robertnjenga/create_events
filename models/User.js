import mongoose, { Schema, models } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', userSchema);

// import { Schema, model, models } from 'mongoose';
// import bcrypt from "bcryptjs";

// const UserSchema = new Schema({
//   name: {
//     type: String,
//     required: [true, "Please enter your name"],
//   },
//   email: {
//     type: String,
//     unique: [true, 'Email already exists'],
//     required: [true, 'Email is required'],
//   },
//   username: {
//     type: String,
//     required: [true, 'Username is required'],
//     match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
//   },
//   password: {
//     type: String,
//     required: [true, "Please enter your password"],
//     minLength: [6, "Your password must be longer than 6 characters"],
//     select: false,
//   },
//   image: {
//     type: String
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }

//   this.password = await bcrypt.hash(this.password, 10);
// });

// const User = models.User || model("User", UserSchema);

// export default User;
