const Ticket = require("../models/ticket");

const get_all_ticket = async () => {
  try {
    const result = await Ticket.find().sort({ createdAt: -1 });
    console.log(result);
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

const is_customer_can_buy_more = async (ticketType, customerId) => {
  try {
    const count = await Ticket.countDocuments(
      { customerId: customerId } && { ticketType: ticketType }
    );
    const result = count >= 5 ? false : true;
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

const getTicketsByEventId = async (eventId) => {
  try {
    const result = await Ticket.find({ event: eventId }).populate(
      "event ticketInfo payment"
    );
    return result;
  } catch (error) {
    return { error: error };
  }
};

const getTicketsByPaymentId = async (paymentId) => {
  try {
    const result = await Ticket.find({ payment: paymentId }).populate(
      "event ticketInfo payment"
    );
    return result;
  } catch (error) {
    return error;
  }
};

const getTicketsByTicketInfoId = async (ticketInfoId) => {
  try {
    const result = await Ticket.find({ ticketInfo: ticketInfoId }).populate(
      "ticketInfo"
    );
    return result;
  } catch (error) {
    return error;
  }
};

const filter_tickets = async (query) => {
  try {
    let { filter, sort } = {};

    filter = (query.search)?
      {
        $or: [
          { 'customer.name': { $regex: query.search, $options: 'i' } },
          { 'event.name': { $regex: query.search, $options: 'i' } },
        ],
      } : '';

    sort[query.sortBy] = (query.sortBy == 'asc')? '1' : '-1';

    filter.createdAt = (query.createdAt)? { $gte: new Date(query.date) } : '';

    filter.event = (query.event)? mongoose.Types.ObjectId(query.event) : '';

    const result = await Ticket.find(filter)
      .populate('customer', 'name')
      .populate('ticketInfo')
      .populate('payment')
      .populate('event')
      .sort(sort)
      .exec();

    return result;
  } catch (error) {
    console.error('Error filtering tickets:', error);
    throw error;
  }
};

module.exports = {
  get_all_ticket,
  get_ticket_by_id,
  add_ticket,
  is_customer_can_buy_more,
  getTicketsByEventId,
  getTicketsByTicketInfoId,
  getTicketsByPaymentId,
  filter_tickets,
};
