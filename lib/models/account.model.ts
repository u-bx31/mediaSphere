import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
	userName: { type: String, required: true, min: 2, unique: true },
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	displayName: { type: String, min: 1 },
	image: { type: String },
	background: {
		type: { type: String, required: true },
		value: { type: String, required: true },
	},
	links: {
		social: { type: Object, default: {} },
		custom: {
			title: { type: String },
			icon: { type: String },
			url: { type: String },
		},
	},
	state: { type: String, required: true, default: "info" },
	location: { type: String, min: 1 },
	bio: { type: String, min: 1 },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

const Account =
	mongoose.models.Account || mongoose.model("Account", accountSchema);

export default Account;
