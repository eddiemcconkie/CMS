const router = require("express").Router();
const sequenceGenerator = require("./sequenceGenerator");
const Document = require("../models/document");

router.get("/", async (req, res) => {
  try {
    const documents = await Document.find();
    return res.status(200).json(documents);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Could not retrieve documents", error });
  }
});

router.post("/", async (req, res) => {
  const maxDocumentId = sequenceGenerator.nextId("documents");

  try {
    const document = new Document({
      id: maxDocumentId,
      name: req.body.name,
      description: req.body.description,
      url: req.body.url,
    });

    await document.save();
    return res
      .status(201)
      .json({ message: "Document added successfully", document });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Could not create document", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const document = await Document.findOne({ id: req.params.id });
    console.log("put request", req.body, document);
    document.name = req.body.name;
    document.description = req.body.description;
    document.url = req.body.url;
    try {
      await Document.updateOne({ id: req.params.id }, document);
      return res.status(204).json({ message: "Document updated successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Could not update document", error });
    }
  } catch (error) {
    return res.status(500).json({ message: "Document not found", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Document.findOne({ id: req.params.id });
    try {
      await Document.deleteOne({ id: req.params.id });
      return res.status(204).json({ message: "Document deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Could not delete document", error });
    }
  } catch (error) {
    return res.status(500).json({ message: "Document not found", error });
  }
});

module.exports = router;
