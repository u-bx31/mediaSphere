import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
	{
		type: { type: String },
		userAccount: { type: String },
		target: { type: String },
	},
	{ timestamps: true }
);

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
