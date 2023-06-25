const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel")

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts)
});

const getContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const contact = await Contact.findById(id);
    if (!contact) {
        res.status(404)
        throw new Error("Record not found.")
    }
    res.status(200).json(contact)
});

const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!")
    }
    const contact = await Contact.create({ name, email, phone, user_id:req.user.id })
    res.status(201).json(contact)
});

const updateContact = asyncHandler( async (req, res) => {
    const id = req.params.id;
    const contact = await Contact.findById(id);
    if(!contact){
        res.status(404);
        throw new Error("Not found")
    }
    const {name, email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory!")
    }
    const update = await Contact.findByIdAndUpdate(id, req.body, {new:true})
    res.status(200).json(update)
});

const deleteContact = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const contact = await Contact.findById(id);
    if(!contact){
        res.status(404);
        throw new Error("Record not fount")
    }
   await Contact.findByIdAndRemove(id);
    res.status(200).json(contact)
});

module.exports = { getContacts, getContact, createContact, updateContact, deleteContact }