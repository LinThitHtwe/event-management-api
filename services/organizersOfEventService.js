const OrganizersOfEvent = require("../models/OrganizersOfEvent");

const get_all_organizersOfEvent = async () => {
  try {
    const result = await OrganizersOfEvent.find().sort({ createdAt: -1 });
    return result;
  } catch (error) {
    return error;
  }
};

const get_organizersOfEvent_by_id = async (organizersOfEventId) => {
  try {
    const result = await OrganizersOfEvent.findById(organizersOfEventId);
    return result;
  } catch (error) {
    return error;
  }
};

const add_organizersOfEvent = async (organizersOfEventData) => {
  const organizersOfEvent = new OrganizersOfEvent(organizersOfEventData);
  try {
    const result = await organizersOfEvent.save();
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  get_all_organizersOfEvent,
  get_organizersOfEvent_by_id,
  add_organizersOfEvent,
};
