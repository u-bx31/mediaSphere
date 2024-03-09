import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	id: { type: String },
	email: { type: String },
	firstName: { type: String },
	lastName: { type: String },
	userName: { type: String },
	onBoarded: { type: Boolean, default: false },
	image: { type: String },
	phoneNumber: { type: String },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
