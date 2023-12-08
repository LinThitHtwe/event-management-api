const Event = require("../models/event");
const Organizer = require("../models/organizer");
const OrganizerOfEvent = require("../models/OrganizersOfEvent");
const Invoice = require("../models/organizerPaymentInvoice");
const mongoose = require("mongoose");

const get_events = async (
  startDate,
  endDate,
  eventId,
  sortBy = "createdAt",
  order = -1
) => {
  try {
    let criteria = {};

    criteria = addConditionToCriteria(
      criteria,
      "eventStartDate",
      startDate && endDate
        ? {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          }
        : startDate
        ? { $gte: new Date(startDate) }
        : null
    );

    criteria = addConditionToCriteria(
      criteria,
      "eventStartDate",
      startDate && endDate
        ? {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          }
        : endDate
        ? { $lte: new Date(endDate) }
        : null
    );
    criteria = addConditionToCriteria(
      criteria,
      "_id",
      eventId ? new mongoose.Types.ObjectId(eventId) : null
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

    const result = {
      content: await Event.find(query).sort({ [sortBy]: order }),
      total: await Event.countDocuments(query),
    };
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const get_organizers = async (
  id,
  startDate,
  endDate,
  accountLevel,
  sortBy = "createdAt",
  order = -1
) => {
  let criteria = {};
  criteria = addConditionToCriteria(
    criteria,
    "_id",
    id ? new mongoose.Types.ObjectId(id) : null
  );
  criteria = addConditionToCriteria(
    criteria,
    "createdAt",
    startDate && endDate
      ? {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        }
      : startDate
      ? { $gte: new Date(startDate) }
      : null
  );

  criteria = addConditionToCriteria(
    criteria,
    "createdAt",
    startDate && endDate
      ? {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        }
      : endDate
      ? { $lte: new Date(endDate) }
      : null
  );
  criteria = addConditionToCriteria(
    criteria,
    "accountLevel",
    accountLevel ? accountLevel : null
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

  let organizers = await Organizer.find(query).sort({ [sortBy]: order });
  organizers = await Promise.all(
    organizers.map(async (organizer) => {
      const events = await OrganizerOfEvent.find({
        organizer: new mongoose.Types.ObjectId(organizer._id),
      });
      return {
        organizer: organizer,
        events: events && events,
        eventCount: events && events.length,
      };
    })
  );

  return (
    organizers && {
      content: organizers,
      total: await Organizer.countDocuments(query),
      normalCount: await Organizer.countDocuments({ accountLevel: 0 }),
      premiumCount: await Organizer.countDocuments({ accountLevel: 1 }),
      blueMarkCount: await Organizer.countDocuments({ accountLevel: 2 }),
    }
  );
};

const get_invoice = async (startDate, endDate, type, sortBy, order) => {
  let criteria = {};

  criteria = addConditionToCriteria(
    criteria,
    "createdAt",
    startDate && endDate
      ? {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        }
      : startDate
      ? { $gte: new Date(startDate) }
      : null
  );

  criteria = addConditionToCriteria(
    criteria,
    "createdAt",
    startDate && endDate
      ? {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        }
      : endDate
      ? { $lte: new Date(endDate) }
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

  let invoice = await Invoice.find(query)
    .sort({ [sortBy]: order })
    .populate("organizer upgradePayment");
  let accUpgradeInvoice = [];
  let eventBoostInvoice = [];
  invoice.forEach((iv) => {
    if (iv.event) {
      eventBoostInvoice.push(iv);
    } else {
      accUpgradeInvoice.push(iv);
    }
  });

  return {
    accountInvoice: accUpgradeInvoice,
    eventInvoice: eventBoostInvoice,
  };
};

const addConditionToCriteria = (criteria, key, value) => {
  if (value) {
    return { ...criteria, [key]: value };
  }
  return criteria;
};

module.exports = {
  get_events,
  get_organizers,
  get_invoice,
};
