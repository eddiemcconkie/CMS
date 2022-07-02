const { Schema, model } = require("mongoose");

const contactSchema = Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  imageUrl: { type: String },
  group: [{ type: Schema.Types.ObjectId, ref: "Contact" }],
});

module.exports = model("Contact", contactSchema);
