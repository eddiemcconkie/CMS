const router = require("express").Router();
const sequenceGenerator = require("./sequenceGenerator");
const Message = require("../models/message");
const Contact = require("../models/contact");

router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().populate("sender");
    return res.status(200).json(messages);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Could not retrieve messages", error });
  }
});

router.post("/", async (req, res) => {
  const maxMessageId = sequenceGenerator.nextId("messages");

  try {
    const sender = await Contact.findOne({ id: req.body.sender });
    console.log(sender);

    const message = new Message({
      id: maxMessageId,
      subject: req.body.subject,
      msgText: req.body.msgText,
      sender: sender._id,
    });

    await message.save();

    const populatedMessage = await Message.findOne({
      id: maxMessageId,
    }).populate("sender");

    return res.status(201).json({ message: populatedMessage });
  } catch (error) {
    return res.status(500).json({ message: "Could not create message", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const message = await Message.findOne({ id: req.params.id });
    message.subject = req.body.subject;
    message.msgText = req.body.msgText;
    // message.sender = req.body.sender;
    try {
      await Message.updateOne({ id: req.params.id });
      return res.status(204).json({ message: "Message updated successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Could not update message", error });
    }
  } catch (error) {
    return res.status(500).json({ message: "Message not found", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Message.findOne({ id: req.params.id });
    try {
      await Message.deleteOne({ id: req.params.id });
      return res.status(204).json({ message: "Message deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Could not delete message", error });
    }
  } catch (error) {
    return res.status(500).json({ message: "Message not found", error });
  }
});

module.exports = router;
