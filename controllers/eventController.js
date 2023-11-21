const eventService = require("../services/eventService");
const paymentSevice = require("../services/paymentService");

const postCreateEvent = async (req, res, next) => {
  const eventData = req.body.event;
  const paymentData = req.body.payment;

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

  const resData = { createdEvent, createdPayment };
  res.json(resData);
};

const getEvent = async (req, res, next) =>{
  const getAllEvent = await eventService.get_all_event();
  res.json(getAllEvent);
}

const getEventById = async(req, res, next) => {
  const eventId = req.params.eventId;
  const getEventById = await eventService.get_event_by_id(eventId);
  res.json(getEventById);
}

const getSortvalue = async (req, res, next) => {
  const sort = req.query.sort;
  const asc = req.query.asc;
  const events = await eventService.get_all_event();

  if(sort === "eventStartDate" && asc === "true"){
    const events = [
      { date: "23/10/2023" },
      { date: "15/05/2022" },
      { date: "07/12/2023" }
    ];
    
    // Sort events by date in ascending order
    const sortedEventsAsc = events.sort((a, b) => {
      const dateA = new Date(a.date.split('/').reverse().join('/'));
      const dateB = new Date(b.date.split('/').reverse().join('/'));
      return dateA - dateB;
    });
    
    console.log(sortedEventsAsc);
  }

  if (sort === "eventName" && asc === "true") {
    const eventNames = events.map((event) => event.name);
    const ascEventNames = eventNames.sort();
    res.json(ascEventNames);
  }

  if (sort === "eventName" && asc === "false") {
    const eventNames = events.map((event) => event.name);
    const descEventNames = eventNames.sort(() => 1);
    res.json(descEventNames);
  }

  if (sort === "contact" && asc === "true") {
    const eventContacts = events.map((event) => event.contact);
    const ascEventNames = eventContacts.sort();
    res.json(ascEventNames);
  }

  if (sort === "contact" && asc === "false") {
    const eventContacts = events.map((event) => event.contact);
    const descEventNames = eventContacts.sort(() => 1);
    res.json(descEventNames);
  }

  if (sort === "location" && asc === "true") {
    const eventLocations = events.map((event) => event.location);
    const ascEventNames = eventLocations.sort();
    res.json(ascEventNames);
  }

  if (sort === "location" && asc === "false") {
    const eventLocations = events.map((event) => event.location);
    const descEventNames = eventLocations.sort(() => 1);
    res.json(descEventNames);
  }

  if (sort === "thumbnail" && asc === "true") {
    const eventThumbnails = events.map((event) => event.thumbnail);
    const ascEventNames = eventThumbnails.sort();
    res.json(ascEventNames);
  }

  if (sort === "thumbnail" && asc === "false") {
    const eventThumbnails = events.map((event) => event.thumbnail);
    const descEventNames = eventThumbnails.sort(() => 1);
    res.json(descEventNames);
  }

  if (sort === "description" && asc === "true") {
    const eventDescriptions = events.map((event) => event.description);
    const ascEventNames = eventDescriptions.sort();
    res.json(ascEventNames);
  }

  if (sort === "description" && asc === "false") {
    const eventDescriptions = events.map((event) => event.description);
    const descEventNames = eventDescriptions.sort(() => 1);
    res.json(descEventNames);
  }

  if (sort === "description" && asc === "true") {
    const eventDescriptions = events.map((event) => event.description);
    const ascEventNames = eventDescriptions.sort();
    res.json(ascEventNames);
  }

  if (sort === "description" && asc === "false") {
    const eventDescriptions = events.map((event) => event.description);
    const descEventNames = eventDescriptions.sort(() => 1);
    res.json(descEventNames);
  }

  if (sort === "createdBy" && asc === "true") {
    const eventDescriptions = events.map((event) => event.createdBy);
    const ascEventNames = eventDescriptions.sort();
    res.json(ascEventNames);
  }

  if (sort === "createdBy" && asc === "false") {
    const eventDescriptions = events.map((event) => event.createdBy);
    const descEventNames = eventDescriptions.sort(() => 1);
    res.json(descEventNames);
  }

  if (sort === "trendingLevel" && asc === "true") {
    const eventTrends = events.map((event) => Number(event.trendingLevel));
    const descEventTrends = eventTrends.sort((a, b) => a - b);
    res.json(descEventTrends);
  }

  if (sort === "trendingLevel" && asc === "false") {
    const eventTrends = events.map((event) => Number(event.trendingLevel));
    const descEventTrends = eventTrends.sort((a, b) => b - a);
    res.json(descEventTrends);
  }
};

module.exports = {
  getSortvalue,
  postCreateEvent,
  getEvent,
  getEventById,
};
