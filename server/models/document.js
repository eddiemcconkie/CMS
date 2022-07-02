const { Schema, model } = require("mongoose");

const documentSchema = Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String },
  description: { type: String },
  children: [{ type: Schema.Types.ObjectId, ref: "Document" }],
});

module.exports = model("Document", documentSchema);
