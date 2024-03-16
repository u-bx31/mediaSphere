import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
	userName: { type: String, required: true, min: 2, unique: true },
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	displayName: { type: String, min: 1 },
	location: { type: String, min: 1 },
	bio: { type: String, min: 1 },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

const Account =
	mongoose.models.Account || mongoose.model("Account", accountSchema);

export default Account;
