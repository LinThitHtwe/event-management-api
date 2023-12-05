const organizerService = require("../services/organizerService");
const { getOrganizerIdFromToken } = require("../helper/index");

const create_organizer = async (req, res) => {
  try {
    const organizer = await organizerService.create_organizer(req.body);
    res.status(201).send(organizer);
  } catch (error) {
    res.status(400).send(error);
  }
};

const get_organizers = async (req, res) => {
  try {
    const { page, pageSize, name, accountStatus, sortBy } = req.query;
    const organizers = await organizerService.get_organizers(
      page,
      pageSize,
      name,
      accountStatus,
      sortBy
    );
    res.send(organizers);
  } catch (error) {
    res.status(500).send(error);
  }
};

const get_organizer_by_id = async (req, res) => {
  const id = await getOrganizerIdFromToken(req, res);
  try {
    const organizer = await organizerService.get_organizer_by_id(id);
    res.send(organizer);
  } catch (error) {
    res.status(404).send(error);
  }
};

const get_organizer_byId = async (req, res) => {
  const { organizerId } = req.params;
  //const id = await getOrganizerIdFromToken(req, res);
  try {
    const organizer = await organizerService.get_organizer_by_id(organizerId);
    res.send(organizer);
  } catch (error) {
    res.status(404).send(error);
  }
};

const get_organizer_by_id_from_public_side = async (req, res) => {
  try {
    const { name, phone, email, bio, companyName, contact } =
      await organizerService.get_organizer_by_id(req.params.id);

    const publicSideOrganizer = {
      name,
      phone,
      email,
      bio,
      companyName,
      contact,
    };
    res.send(publicSideOrganizer);
  } catch (error) {
    res.status(404).send(error);
  }
};

const update_organizer = async (req, res) => {
  const id = await getOrganizerIdFromToken(req, res);
  try {
    const organizer = await organizerService.update_organizer(id, req.body);
    res.send(organizer);
  } catch (error) {
    res.status(400).send(error);
  }
};

const manage_organizer_level = async (req, res) => {
  const id = await getOrganizerIdFromToken(req, res);
  try {
    const organizer = await organizerService.manage_organizer_level(id, req.params.level);
    res.send(organizer);
  } catch (error) {
    res.status(400).send(error);
  }
};

const manage_organizer_status = async (req, res) => {
  const id = await getOrganizerIdFromToken(req, res);
  s;
  try {
    const organizer = await organizerService.manage_organizer_status(id, req.params.status);
    res.send(organizer);
  } catch (error) {
    res.status(400).send(error);
  }
};

const change_phone = async (req, res) => {
  const id = await getOrganizerIdFromToken(req, res);
  try {
    const organizer = await organizerService.change_phone(id, req.params.phone);
    res.send(organizer);
  } catch (error) {
    res.status(400).send(error);
  }
};

const change_email = async (req, res) => {
  const id = await getOrganizerIdFromToken(req, res);
  try {
    const organizer = await organizerService.change_email(id, req.params.email);
    res.send(organizer);
  } catch (error) {
    res.status(400).send(error);
  }
};

const filter_organizers = async (req, res) => {
  try {
    const organizers = await organizerService.filterOrganizer(req.query);
    res.send(organizers);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  create_organizer,
  get_organizers,
  get_organizer_by_id,
  get_organizer_byId,
  get_organizer_by_id_from_public_side,
  update_organizer,
  manage_organizer_level,
  manage_organizer_status,
  change_email,
  change_phone,
  filter_organizers,
};
