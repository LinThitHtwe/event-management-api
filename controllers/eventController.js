const { boolean } = require("joi");
const eventService = require("../services/eventService");
const paymentSevice = require("../services/paymentService");
const {
  add_organizer_payment_invoice,
} = require("../services/organizerPaymentInvoiceService");
const { add_upgrade_payment } = require("../services/upgradePaymentService");

const {
  add_ticket_info,
  get_all_ticket_info_by_event_id,
} = require("../services/ticketInfoService");
const { getTicketsByEventId } = require("../services/ticketService");
const { getOrganizerIdFromToken } = require("../helper");

const postCreateEvent = async (req, res, next) => {
  try {
    const { event, ticketInfos } = req.body;
    const id = await getOrganizerIdFromToken(req, res);
    const createdEvent = await eventService.add_event({
      ...event,
      organizer: id,
    });

    const createdTicketInfoPromises = ticketInfos.map(async (ticketInfo) => {
      const event = createdEvent._id;
      const ticket = { ...ticketInfo, event };
      try {
        const createdTicketInfo = await add_ticket_info(ticket);
        if (!createdTicketInfo) {
          eventService.delete_by_id(createdEvent._id);
          return res.status(500).json({ error: error });
        }
        return ticketInfo;
      } catch (error) {
        eventService.delete_by_id(createdEvent._id);
        throw error;
      }
    });

    const createdTicketInfo = await Promise.all(createdTicketInfoPromises);

    res.json(createdTicketInfo);
  } catch (error) {
    console.error("Error in postCreateEvent:", error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};

const paymentsByEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const evnet = await eventService.get_all_event_payments(eventId);
    res.json(evnet);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  eventService.delete_by_id(id);
  res.json("Successfully Delete");
};

const getEvent = async (req, res) => {
  const getAllEvent = await eventService.get_all_event();
  res.json(getAllEvent);
};

const getEvents = async (req, res) => {
  const {
    page,
    pageSize,
    name,
    eventStartDate,
    eventEndDate,
    isUpcoming,
    location,
    organizerId,
    sortBy,
  } = req.query;
  console.log("Page no", page);
  const events = await eventService.get_events(
    page,
    pageSize,
    name,
    eventStartDate,
    eventEndDate,
    isUpcoming === "true" ? true : false,
    location,
    organizerId,
    sortBy
  );
  res.json(events);
};

const getEventById = async (req, res) => {
  const eventId = req.params.eventId;
  const getEventById = await eventService.get_event_by_id(eventId);
  res.json(getEventById);
};

const getSortValue = async (req, res) => {
  const sort = req.query.sort;
  const asc = req.query.asc;
  const events = await eventService.get_all_event();

  if (eventService.sortFunctions[sort]) {
    console.log(sort, eventService.sortFunctions[sort]);
    const sortedData = eventService.sortFunctions[sort](events, asc, sort);
    res.json(sortedData);
  } else {
    res.status(400).json({ error: "Invalid sort type" });
  }
};

const boostsList = async (req, res) => {
  const isAsc = req.query.asc;
  const getAllEvent = await eventService.get_all_event();

  res.json(getAllEvent);
};

const makeBoosts = async (req, res) => {
  // const eventId = req.params.id;
  const { eventId, upgradePayment, amount, organizerId } = req.body;
  const result = Promise.all(async () => {
    const upg = await add_upgrade_payment(upgradePayment);
    const evn = await eventService.make_boots(eventId);
    if (evn && upg) {
      await add_organizer_payment_invoice(
        amount,
        upgradePayment,
        eventId,
        organizerId
      );
    }
  });
  res.json("Successfully boost");
};

const boostEvent = async (req, res) => {
  try {
    const organizerId = await getOrganizerIdFromToken(req, res);
    if (organizerId === null) {
      return res.status(403).send("Invalid token.");
    }

    const { payment } = req.body.body;
    const times = Number(payment.amount) / 20;
    const paymentResult = await add_organizer_payment_invoice({
      ...payment,
      organizer: organizerId,
    });
    const boostSuccess = await eventService.make_boots(payment.event, times);
    if (!payment.error) {
      return res.status(200).json({ paymentResult, boostSuccess });
    } else {
      return res.status(404).json({ message: messages.notFound });
    }
  } catch (error) {
    res.json({ error });
  }
};

const getTotalAvailableTicketByEvent = async (req, res) => {
  const eventId = req.params.eventId;
  const ticketInfos = await get_all_ticket_info_by_event_id(eventId);

  if (ticketInfos.error) {
    return res.status(404).json("404 not found");
  }
  const totalTicketCounts = {};

  ticketInfos.forEach((ticket) => {
    const { type, quantity } = ticket;
    if (totalTicketCounts[type]) {
      totalTicketCounts[type] += quantity;
    } else {
      totalTicketCounts[type] = quantity;
    }
  });

  const totalSoldTicketByEventId = await getTicketsByEventId(eventId);
  if (totalSoldTicketByEventId.error) {
    return res.status(404).json("404 not found");
  }

  const soldTicketCounts = {};
  ticketInfos.forEach((ticket) => {
    const { type, quantity } = ticket;
    if (soldTicketCounts[type]) {
      soldTicketCounts[type] += 0;
    } else {
      soldTicketCounts[type] = 0;
    }
  });

  totalSoldTicketByEventId.forEach((ticket) => {
    const { type, quantity } = ticket.ticketInfo;
    if (soldTicketCounts[type]) {
      soldTicketCounts[type] += 1;
    } else {
      soldTicketCounts[type] = 1;
    }
  });

  const remainingTickets = [];
  for (const type in totalTicketCounts) {
    const ticketInfo = ticketInfos.find((ticket) => ticket.type === type);

    if (ticketInfo) {
      let remainingTicketInfo;
      if (soldTicketCounts[type]) {
        const remainingCount = totalTicketCounts[type] - soldTicketCounts[type];
        remainingTicketInfo = {
          _id: ticketInfo._id,
          type,
          price: ticketInfo.price,
          totalAvailableTickets: remainingCount,
        };
      } else {
        remainingTicketInfo = {
          _id: ticketInfo._id,
          type,
          price: ticketInfo.price,
          totalAvailableTickets: totalTicketCounts[type],
        };
      }

      remainingTickets.push(remainingTicketInfo);
    }
  }
  return res.json(remainingTickets);
};
const getEventsByOrganizerId = async (req, res) => {
  const id = await getOrganizerIdFromToken(req, res);
  const events = await eventService.get_event_by_organizer_id(id);
  if (events.error) {
    return res.status(404).json("No Data Found");
  }
  return res.json(events);
};

const getEventsByOrganizer_Id = async (req, res) => {
  const { organizerId } = req.params;
  console.log(
    "🚀 ~ file: eventController.js:285 ~ constgetEventsByOrganizer_Id= ~ id:",
    organizerId
  );
  const events = await eventService.get_event_by_organizer_id(organizerId);
  if (events.error) {
    return res.status(404).json("No Data Found");
  }
  return res.json(events);
};

module.exports = {
  boostEvent,
  getEventsByOrganizer_Id,
  getEvents,
  getSortValue,
  postCreateEvent,
  getEvent,
  getEventById,
  boostsList,
  deleteById,
  makeBoosts,
  getTotalAvailableTicketByEvent,
  getEventsByOrganizerId,
  getEventsByOrganizer_Id,
  paymentsByEvent,
};
