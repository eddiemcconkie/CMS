const { Schema, model } = require("mongoose");

const messageSchema = Schema({
  id: { type: String, required: true },
  subject: { type: String },
  msgText: { type: String, required: true },
  sender: { type: Schema.Types.ObjectId, ref: "Contact" },
});

module.exports = model("Message", messageSchema);
