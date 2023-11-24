const TicketInfo = require("../models/ticketInfo");

const get_all_ticketInfo = async () => {
  try {
    const result = await TicketInfo.find().sort({ createdAt: -1 });
    return result;
  } catch (error) {
    return error;
  }
};

const get_ticketInfo_by_id = async (ticketInfoId) => {
  try {
    const result = await TicketInfo.findById(ticketInfoId);
    return result;
  } catch (error) {
    return error;
  }
};

const get_all_ticket_info_by_event_id = async (eventId) => {
  try {
    const result = await TicketInfo.find({ event: eventId }).populate("event");
    return result;
  } catch (error) {
    return { error: error };
  }
};

const add_ticket_info = async (ticketInfoData) => {
  const ticketInfo = new TicketInfo(ticketInfoData);
  try {
    const result = await ticketInfo.save();
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  get_all_ticketInfo,
  get_ticketInfo_by_id,
  add_ticket_info,
  get_all_ticket_info_by_event_id,
};
