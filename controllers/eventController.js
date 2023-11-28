const { boolean } = require("joi");
const eventService = require("../services/eventService");
const paymentSevice = require("../services/paymentService");
const {
  add_ticket_info,
  get_all_ticket_info_by_event_id,
} = require("../services/ticketInfoService");
const { getTicketsByEventId } = require("../services/ticketService");

const postCreateEvent = async (req, res) => {
  try {
    const eventData = req.body.event;
    const paymentData = req.body.payment;
    const {tickets} = req.body.event;
    const createdEvent = await eventService.add_event(eventData);

    console.log(eventData);
    const createdTicketInfoPromises = tickets.map(async (tic) => {
      const event = createdEvent._id;
      const ticket = { ...tic, event };
      try {
        const ticketInfo = await add_ticket_info(ticket);
        if (!ticketInfo) {
          console.log("Ticket info not created successfully");
          eventService.delete_by_id(createdEvent._id);
        }
        return ticketInfo;
      } catch (error) {
        console.error("Error creating ticket info:", error);
        eventService.delete_by_id(createdEvent._id);
        throw error;
      }
    });

    const createdTicketInfo = await Promise.all(createdTicketInfoPromises);

    res.json("Success");
  } catch (error) {
    console.error("Error in postCreateEvent:", error);
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

const searchValue = async (req, res) => {
  const title = req.query.title;
  const searchValue = req.query.searchValue;

  const events = await eventService.get_all_event();

  let filterDate = "";

  title != ""
    ? (filterDate = events.filter((event) => {
        return (
          (title === "name" &&
            event.name &&
            event.name.toLowerCase().includes(searchValue.toLowerCase())) ||
          (title === "eventStartDate" &&
            event.eventStartDate &&
            event.eventStartDate.includes(searchValue)) ||
          (title === "eventEndDate" &&
            event.eventEndDate &&
            event.eventEndDate.includes(searchValue)) ||
          (title === "ticketOpenDate" &&
            event.ticketOpenDate &&
            event.ticketOpenDate.includes(searchValue)) ||
          (title === "ticketCloseDate" &&
            event.ticketCloseDate &&
            event.ticketCloseDate.includes(searchValue)) ||
          (title === "contact" &&
            event.contact &&
            event.contact.toLowerCase().includes(searchValue.toLowerCase())) ||
          (title === "location" &&
            event.location &&
            event.location.toLowerCase().includes(searchValue.toLowerCase())) ||
          (title === "thumbnail" &&
            event.thumbnail &&
            event.thumbnail
              .toLowerCase()
              .includes(searchValue.toLowerCase())) ||
          (title === "description" &&
            event.description &&
            event.description
              .toLowerCase()
              .includes(searchValue.toLowerCase())) ||
          (title === "createdBy" &&
            event.createdBy &&
            event.createdBy
              .toLowerCase()
              .includes(searchValue.toLowerCase())) ||
          (title === "trendingLevel" &&
            event.trendingLevel &&
            event.trendingLevel.includes(searchValue))
        );
      }))
    : (filterDate = events.filter((event) => {
        return (
          (event.name &&
            event.name.toLowerCase().includes(searchValue.toLowerCase())) ||
          (event.eventStartDate &&
            event.eventStartDate.includes(searchValue)) ||
          (event.eventEndDate && event.eventEndDate.includes(searchValue)) ||
          (event.ticketOpenDate &&
            event.ticketOpenDate.includes(searchValue)) ||
          (event.ticketCloseDate &&
            event.ticketCloseDate.includes(searchValue)) ||
          (event.contact &&
            event.contact.toLowerCase().includes(searchValue.toLowerCase())) ||
          (event.location &&
            event.location.toLowerCase().includes(searchValue.toLowerCase())) ||
          (event.thumbnail &&
            event.thumbnail
              .toLowerCase()
              .includes(searchValue.toLowerCase())) ||
          (event.description &&
            event.description
              .toLowerCase()
              .includes(searchValue.toLowerCase())) ||
          (event.createdBy &&
            event.createdBy
              .toLowerCase()
              .includes(searchValue.toLowerCase())) ||
          (event.trendingLevel && event.trendingLevel.includes(searchValue))
        );
      }));

  res.json(filterDate);
};

const boostsList = async (req, res) => {
  const isAsc = req.query.asc;
  const getAllEvent = await eventService.get_all_event();

  res.json(getAllEvent);
};

const makeBoosts = async (req, res) => {
  const eventId = req.params.id;

  const result = await eventService.make_boots(eventId);
  res.json("Successfully boost");
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

  const remainingTickets = {};

  for (const type in totalTicketCounts) {
    if (soldTicketCounts[type]) {
      const remainingCount = totalTicketCounts[type] - soldTicketCounts[type];
      remainingTickets[type] = remainingCount;
    } else {
      remainingTickets[type] = totalTicketCounts[type];
    }
  }

  return res.json(remainingTickets);
};

const getEventsByOrganizerId = async (req, res) => {
  const { organizerId } = req.params;
  const events = await eventService.get_event_by_organizer_id(organizerId);
  if (events.error) {
    return res.status(404).json("No Data Found");
  }
  return res.json(events);
};

module.exports = {
  getEvents,
  getSortValue,
  postCreateEvent,
  getEvent,
  getEventById,
  searchValue,
  boostsList,
  deleteById,
  makeBoosts,
  getTotalAvailableTicketByEvent,
  getEventsByOrganizerId,
};
