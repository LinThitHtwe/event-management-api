const { get_events, get_organizers } = require("../services/dashboardService");

const getEvents = async (req, res) => {
  const { startDate, endDate, eventId, sortBy, order } = req.query;
  const events = await get_events(startDate, endDate, eventId, sortBy, order);
  res.json(events);
};

const getOrganizers = async (req, res) => {
  const { id, startDate, endDate, accountLevel, sortBy, order } = req.query;
  const organizers = await get_organizers(
    id,
    startDate,
    endDate,
    accountLevel,
    sortBy,
    order
  );
  res.json(organizers);
};

module.exports = {
  getEvents,
  getOrganizers,
};
