const { Schema, model } = require("mongoose");

const sequenceSchema = Schema({
  maxDocumentId: { type: String, required: true },
  maxMessageId: { type: String, required: true },
  maxContactId: { type: String, required: true },
});

module.exports = model("Sequence", sequenceSchema);
