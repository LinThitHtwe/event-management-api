const Organizer = require("../models/organizer");

const get_all_organizer = async () => {
  try {
    const result = await Organizer.find().sort({ createdAt: -1 });
    return result;
  } catch (error) {
    return error;
  }
};

const get_organizer_by_id = async (organizerId) => {
  try {
    const result = await Organizer.findById(organizerId);
    return result;
  } catch (error) {
    return error;
  }
};

const add_organizer = async (organizerData) => {
  const organizer = new Organizer(organizerData);
  try {
    const result = await organizer.save();
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  get_all_organizer,
  get_organizer_by_id,
  add_organizer,
};
