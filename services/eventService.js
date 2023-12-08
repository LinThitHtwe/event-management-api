const { ref } = require("joi");
const Event = require("../models/event");
const mongoose = require("mongoose");

const get_events = async (
  page = 1,
  pageSize = 6,
  name,
  eventStartDate,
  eventEndDate,
  isUpcoming,
  location,
  organizerId,
  sortBy
) => {
  try {
    console.log(isUpcoming);

    let criteria = {};

    criteria = addConditionToCriteria(
      criteria,
      "name",
      name ? { $regex: new RegExp(`.*${name}.*`, "i") } : null
    );
    criteria = addConditionToCriteria(
      criteria,
      "eventStartDate",
      eventStartDate && eventEndDate && !isUpcoming
        ? {
            $lte: new Date(eventEndDate),
          }
        : eventStartDate && !isUpcoming
        ? {
            $lte: new Date(eventStartDate),
          }
        : null
    );
    criteria = addConditionToCriteria(
      criteria,
      "eventEndDate",
      eventStartDate && eventEndDate && !isUpcoming
        ? {
            $gte: new Date(eventStartDate),
          }
        : null
    );
    criteria = addConditionToCriteria(
      criteria,
      "eventStartDate",
      isUpcoming ? { $gt: new Date() } : null
    );
    criteria = addConditionToCriteria(
      criteria,
      "location",
      location ? { $regex: new RegExp(`.*${location}.*`, "i") } : null
    );
    criteria = addConditionToCriteria(
      criteria,
      "organizer",
      organizerId ? new mongoose.Types.ObjectId(organizerId) : null
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

    let result = {
      content: await Event.find(query)
        .sort(
          sortBy === "trending" ? { trendingLevel: -1 } : { eventStartDate: -1 }
        )
        .skip((parseInt(page) - 1) * parseInt(pageSize))
        .limit(pageSize)
        .populate("organizer"),
      total: await Event.countDocuments(query),
    };
    console.log(result);
    return result;
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

const get_all_event = async () => {
  try {
    const result = await Event.find().sort({
      createdAt: -1,
      trendingLevel: -1,
    });
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
const get_all_event_payments = async (eventId) => {
  try {
    const result = await Event.findById(eventId).populate("payments");
    return result;
  } catch (error) {
    return { error: error };
  }
};

const make_boots = async (eventId, times) => {
  try {
    const result = await Event.findById(eventId);
    result.trendingLevel = Number(result.trendingLevel) + times;
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
    return { error: error };
  }
};

const add_event = async (eventData) => {
  const event = new Event(eventData);

  try {
    const result = await event.save();

    return result;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
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
    const nameA = a[sort] || "";
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
  get_events,
  get_all_event,
  get_event_by_id,
  get_all_event_payments,
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
