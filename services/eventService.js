const Event = require("../models/event");

const get_all_event = async () => {
  try {
    const result = await Event.find().sort({ createdAt: -1 });
    return result;
  } catch (error) {
    return error;
  }
};

const get_event_by_id = async (eventId) => {
  try {
    const result = await Event.findById(eventId);
    return result;
  } catch (error) {
    return error;
  }
};

const add_event = async (eventData) => {
  const event = new Event(eventData);
  try {
    const result = await event.save();
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  get_all_event,
  get_event_by_id,
  add_event,
};
