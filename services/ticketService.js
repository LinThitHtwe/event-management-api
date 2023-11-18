const Ticket = require("../models/ticket");

const get_all_ticket = async () => {
  try {
    const result = await Ticket.find().sort({ createdAt: -1 });
    return result;
  } catch (error) {
    return error;
  }
};

const get_ticket_by_id = async (ticketId) => {
  try {
    const result = await Ticket.findById(ticketId);
    return result;
  } catch (error) {
    return error;
  }
};

const add_ticket = async (ticketData) => {
  const ticket = new Ticket(ticketData);
  try {
    const result = await ticket.save();
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  get_all_ticket,
  get_ticket_by_id,
  add_ticket,
};
