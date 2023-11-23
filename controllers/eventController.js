const eventService = require("../services/eventService");
const paymentSevice = require("../services/paymentService");
const { add_ticket_info } = require("../services/ticketInfoService");

const test = (req, res) => {
  // const ticketInfo = {
  //   quantity: 10,
  //   type: "VVIP",
  //   price: 35000,
  //   event: "655dea0d4b7cb74d641075c2",
  // };

  // add_ticket_info(ticketInfo);
  // name: { type: String },
  // phone: { type: String },
  // organizer: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Organizer",
  // },
  // const payment = {
  //   name: "AYA Pay",
  //   phone: "09456788595",
  //   organizer: "655db72a40abeabdf4678ec9",
  // };
  // paymentSevice.add_payment(payment);
  return res.json("Success");
};

const postCreateEvent = async (req, res, next) => {
  try {
    const eventData = req.body.event;
    const paymentData = req.body.payment;
    const { tickets } = req.body;
    console.log(req.body);
    eventData.trendingLevel = eventData.trendingLevel || "0";
    eventData.createdBy = eventData.createdBy || "DefaultCreator";
    paymentData.organizer = paymentData.organizer || "1";

    eventData.eventStartDate = eventService.format_ui_date_to_db_date(
      eventData.eventStartDate
    );
    eventData.eventEndDate = eventService.format_ui_date_to_db_date(
      eventData.eventEndDate
    );
    eventData.ticketOpenDate = eventService.format_ui_date_to_db_date(
      eventData.ticketOpenDate
    );
    eventData.ticketCloseDate = eventService.format_ui_date_to_db_date(
      eventData.ticketCloseDate
    );

    const createdEvent = await eventService.add_event(eventData);
    const createdPayment = await paymentSevice.add_payment(paymentData);

    const createdTicketInfoPromises = tickets.map(async (tic) => {
      const eventId = createdEvent._id;
      const ticket = { ...tic, eventId };
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

    const resData = { createdEvent, createdPayment, createdTicketInfo };
    res.json(resData);
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

const getEvent = async (req, res, next) => {
  const getAllEvent = await eventService.get_all_event();
  res.json(getAllEvent);
};

const getEventById = async (req, res, next) => {
  const eventId = req.params.eventId;
  const getEventById = await eventService.get_event_by_id(eventId);
  res.json(getEventById);
};

const getSortValue = async (req, res, next) => {
  const sort = req.query.sort;
  const asc = req.query.asc;
  const events = await eventService.get_all_event();

  if (eventService.sortFunctions[sort]) {
    const sortedData = eventService.sortFunctions[sort](events, asc);
    res.json(sortedData);
    console.log(sortedData);
  } else {
    res.status(400).json({ error: "Invalid sort type" });
  }
};

const searchValue = async (req, res, next) => {
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

const bootsList = async (req, res, next) => {
  const getAllEvent = await eventService.get_all_event();
  res.json(getAllEvent);
};

const makeBoots = async (req, res, next) => {
  const eventId = req.params.id;

  const result = await eventService.make_boots(eventId);
  res.json("Successfully boost");
};

module.exports = {
  getSortValue,
  postCreateEvent,
  getEvent,
  getEventById,
  searchValue,
  bootsList,
  deleteById,
  makeBoots,
  test,
};
