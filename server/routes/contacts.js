const router = require("express").Router();
const sequenceGenerator = require("./sequenceGenerator");
const Contact = require("../models/contact");

router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().populate("group");
    return res.status(200).json(contacts);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Could not retrieve contacts", error });
  }
});

router.post("/", async (req, res) => {
  const maxContactId = sequenceGenerator.nextId("documents");

  try {
    const contact = new Contact({
      id: maxContactId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      imageUrl: req.body.imageUrl,
    });

    await contact.save();
    return res
      .status(201)
      .json({ message: "Contact added successfully", contact });
  } catch (error) {
    return res.status(500).json({ message: "Could not create contact", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const contact = await Contact.findOne({ id: req.params.id });
    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.imageUrl = req.body.imageUrl;
    try {
      await Contact.updateOne({ id: req.params.id });
      return res.status(204).json({ message: "Contact updated successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Could not update contact", error });
    }
  } catch (error) {
    return res.status(500).json({ message: "Contact not found", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Contact.findOne({ id: req.params.id });
    try {
      await Contact.deleteOne({ id: req.params.id });
      return res.status(204).json({ message: "Contact deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Could not delete contact", error });
    }
  } catch (error) {
    return res.status(500).json({ message: "Contact not found", error });
  }
});

module.exports = router;
