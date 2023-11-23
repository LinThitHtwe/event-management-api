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

const get_event_by_organizer_id = async (organizerId) => {
  try {
    const result = await Event.find({ organizer: organizerId }).populate(
      "organizer"
    );
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

const delete_by_id = async (id) => {
  try {
    const result = await Event.findByIdAndDelete(id);
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
  eventEndDate: (events, asc, sort) =>
    sortEvents_date(
      events.map((event) => event),
      asc,
      sort
    ),
  ticketOpenDate: (events, asc, sort) =>
    sortEvents_date(
      events.map((event) => event),
      asc,
      sort
    ),
  ticketCloseDate: (events, asc, sort) =>
    sortEvents_date(
      events.map((event) => event),
      asc,
      sort
    ),
  eventStartDate: (events, asc, sort) =>
    sortEvents_date(
      events.map((event) => event),
      asc,
      sort
    ),

  eventName: (events, asc, sort) => 
    sortEvents_text(
      events.map((event) => event),
      asc,
      sort
    ),
  contact: (events, asc, sort) =>
    sortEvents_text(
      events.map((event) => event),
      asc,
      sort
    ),
  location: (events, asc, sort) =>
    sortEvents_text(
      events.map((event) => event),
      asc,
      sort
    ),
  thumbnail: (events, asc, sort) =>
    sortEvents_text(
      events.map((event) => event),
      asc,
      sort
    ),
  description: (events, asc, sort) =>
    sortEvents_text(
      events.map((event) => event),
      asc,
      sort
    ),
  createdBy: (events, asc, sort) =>
    sortEvents_text(
      events.map((event) => event),
      asc,
      sort
    ),

  trendingLevel: (events, asc) =>
    sortEvents_trendingLevel(
      events.map((event) => event),
      asc
    ),
};

const sortEvents_text = (data, asc, sort) => {
  const sortedData = data.sort((a, b) => {
    const nameA = a[sort]|| "";
    const nameB = b[sort] || "";
    return asc === "true"
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });
  return sortedData;
};

const sortEvents_trendingLevel = (data, asc) => {
  const sortedData = data.sort((a, b) =>
    asc === "true"
      ? a.trendingLevel - b.trendingLevel
      : b.trendingLevel - a.trendingLevel
  );
  return sortedData;
};

const sortEvents_date = (data, asc, sort) => {
  const sortedData = data.sort((a, b) => {
    const dateA = new Date(a[sort].split("/").reverse().join("/"));
    const dateB = new Date(b[sort].split("/").reverse().join("/"));
    return asc === "true" ? dateA - dateB : dateB - dateA;
  });
  return sortedData;
};

module.exports = {
  get_all_event,
  get_event_by_id,
  add_event,
  delete_by_id,
  format_ui_date_to_db_date,
  sortFunctions,
  get_event_by_organizer_id,
  sortEvents_text,
  sortEvents_trendingLevel,
  sortEvents_date,
  make_boots,
};
