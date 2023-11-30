const Ticket = require("../models/ticket");
const mongoose = require("mongoose");

const get_all_ticket = async () => {
  try {
    const result = await Ticket.find().sort({ createdAt: -1 })
      .populate("customer ticketInfo event payment");
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
  let { organizerId, page, pageSize, sort, order, startDate, endDate , customerName, eventName, paymentType, ticketType } = query;
  try {
    let criteria = {};
    let sortBy = sort && order ? { [sort] : parseInt(order) } : { createdAt: -1 };

    criteria = addConditionToCriteria(
      criteria,
      "createdAt",
      startDate && endDate
        ? {
            $lte: new Date(startDate),
            $gte: new Date(endDate),
          }
        : null
    );

    const isCriteriaEmpty = Object.values(criteria).every(
      (value) => value === ""
    );

    let query = {};

    if (!isCriteriaEmpty) {
      query = {
        $and: [criteria],
      };
    }

    let results = await Ticket.find(query)
      .populate("customer ticketInfo event payment")
      .sort(sortBy)
      .skip((page - 1) * pageSize)
      .limit(pageSize);
      
      let filterObj = {
        organizerId: organizerId || undefined,
        customerName: customerName || undefined,
        eventName: eventName || undefined,
        paymentType: paymentType || undefined,
        ticketType: ticketType || undefined,
      };
      let filteredResult = results.filter((result) => {
        return (
          (!filterObj.customerName || (result.customer && result.customer.name === filterObj.customerName)) &&
          (!filterObj.eventName || (result.event && result.event.name === filterObj.eventName)) &&
          (!filterObj.paymentType || (result.payment && result.payment.name === filterObj.paymentType)) &&
          (!filterObj.organizerId || (result.payment && result.payment.organizer.toString() === filterObj.organizerId)) &&
          (!filterObj.ticketType || (result.ticketInfo && result.ticketInfo.type === filterObj.ticketType))
        );
      });

      const response = {
        content: filteredResult,
        totalCount: await Ticket.countDocuments(query),
      }

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const addConditionToCriteria = (criteria, key, value) => {
  if (value) {
    return { ...criteria, [key]: value };
  }
  return criteria;
};

module.exports = {
  get_all_ticket,
  get_ticket_by_id,
  add_ticket,
  is_customer_can_buy_more,
  getTicketsByEventId,
  getTicketsByTicketInfoId,
  getTicketsByPaymentId,
  filter_tickets
};