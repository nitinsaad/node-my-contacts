const express = require("express");
const { getContacts, getContact, createContact, updateContact, deleteContact } = require("../controllers/contactController");
const tokenValidate = require("../middleware/tokenValidate");

const router = express.Router();

router.get("/", tokenValidate, getContacts);

router.post("/", tokenValidate, createContact);

router.get("/:id", tokenValidate, getContact);

router.put("/:id", tokenValidate, updateContact);

router.delete("/:id", tokenValidate, deleteContact);

module.exports = router;