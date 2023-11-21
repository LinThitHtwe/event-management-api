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

const make_boots = async (eventId) => {
  try {
    const result = await Event.findById(eventId);
    result.trendingLevel = Number(result.trendingLevel) + 1;
    await result.save();
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

const format_ui_date_to_db_date = (UIDate) => {
  const originalDateStr = UIDate;
  const originalDate = new Date(originalDateStr);
  const formattedDate = originalDate.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  UIDate = formattedDate;
  return UIDate;
};

const sortFunctions = {
  eventEndDate: (events, asc) =>
    sortEvents_date(
      events.map((event) => event.eventEndDate),
      asc
    ),
  ticketOpenDate: (events, asc) =>
    sortEvents_date(
      events.map((event) => event.ticketOpenDate),
      asc
    ),
  ticketCloseDate: (events, asc) =>
    sortEvents_date(
      events.map((event) => event.ticketCloseDate),
      asc
    ),
  eventStartDate: (events, asc) =>
    sortEvents_date(
      events.map((event) => event.eventStartDate),
      asc
    ),

  eventName: (events, asc) =>
    sortEvents_text(
      events.map((event) => event.name),
      asc
    ),
  contact: (events, asc) =>
    sortEvents_text(
      events.map((event) => event.contact),
      asc
    ),
  location: (events, asc) =>
    sortEvents_text(
      events.map((event) => event.location),
      asc
    ),
  thumbnail: (events, asc) =>
    sortEvents_text(
      events.map((event) => event.thumbnail),
      asc
    ),
  description: (events, asc) =>
    sortEvents_text(
      events.map((event) => event.description),
      asc
    ),
  createdBy: (events, asc) =>
    sortEvents_text(
      events.map((event) => event.createdBy),
      asc
    ),

  trendingLevel: (events, asc) =>
    sortEvents_trendingLevel(
      events.map((event) => Number(event.trendingLevel)),
      asc
    ),
};

const sortEvents_text = (data, asc) => {
  const sortedData = data.sort((a, b) =>
    asc === "true" ? a.localeCompare(b) : b.localeCompare(a)
  );
  return sortedData;
};

const sortEvents_trendingLevel = (data, asc) => {
  const sortedData = data.sort((a, b) => (asc === "true" ? a - b : b - a));
  return sortedData;
};

const sortEvents_date = (data, asc) => {
  const sortedData = data.sort((a, b) => {
    const dateA = new Date(a.split("/").reverse().join("/"));
    const dateB = new Date(b.split("/").reverse().join("/"));
    return asc === "true" ? dateA - dateB : dateB - dateA;
  });
  return sortedData;
};



module.exports = {
  get_all_event,
  get_event_by_id,
  add_event,
  format_ui_date_to_db_date,
  sortFunctions,
  sortEvents_text,
  sortEvents_trendingLevel,
  sortEvents_date,
  make_boots,
};
