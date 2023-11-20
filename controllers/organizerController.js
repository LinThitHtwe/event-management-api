const organizerService = require("../services/organizerService");

const createOrganizer = async (req, res) => {
  try {
    const organizer = await organizerService.createOrganizer(req.body);
    res.status(201).send(organizer);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getOrganizers = async (req, res) => {
  try {
    const organizers = await organizerService.getOrganizers();
    res.send(organizers);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOrganizerById = async (req, res) => {
  try {
    const organizer = await organizerService.getOrganizerById(req.params.id);
    res.send(organizer);
  } catch (error) {
    res.status(404).send(error);
  }
};

const updateOrganizer = async (req, res) => {
  try {
    const organizer = await organizerService.updateOrganizer(
      req.params.id,
      req.body
    );
    res.send(organizer);
  } catch (error) {
    res.status(400).send(error);
  }
};

const manageOrganizerLevel = async (req, res) => {
  try {
    const organizer = await organizerService.manageOrganizerLevel(req.params.id, req.params.level);
    res.send(organizer);
  } catch (error) {
    res.status(400).send(error);
  }
};

const manageOrganizerStatus = async (req, res) => {
  try {
    const organizer = await organizerService.manageOrganizerStatus(req.params.id, req.params.status);
    res.send(organizer);
  } catch (error) {
    res.status(400).send(error);
  }
};

const changePhoneNumber = async (req, res) => {
  try {
    const organizer = await organizerService.changePhoneNumber(req.params.id, req.params.phone);
    res.send(organizer);
  } catch (error) {
    res.status(400).send(error);
  }
};

const changeEmail = async (req, res) => {
  try {
    const organizer = await organizerService.changeEmail(req.params.id, req.params.email);
    res.send(organizer);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createOrganizer,
  getOrganizers,
  getOrganizerById,
  updateOrganizer,
  manageOrganizerLevel,
  manageOrganizerStatus,
  changePhoneNumber,
  changeEmail,
};
