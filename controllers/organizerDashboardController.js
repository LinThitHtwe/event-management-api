const {
  getTicketsByEventId,
  getTicketsByTicketInfoId,
} = require("../services/ticketService");

const { get_event_by_organizer_id } = require("../services/eventService");
const { get_ticketInfo_by_id } = require("../services/ticketInfoService");
const totalTicketSale = async (req, res) => {
  const organizerId = req.params.organizerId;
  const allEventsByOrganizer = await get_event_by_organizer_id(organizerId);

  const eventIds = allEventsByOrganizer.map((event) => event._id.toString());
  const allTickets = await Promise.all(eventIds.map(getTicketsByEventId));
  const ticketInfoIds = allTickets.flatMap((tickets) =>
    tickets.map((ticket) => ticket)
  );
  const ticketTypeCounts = new Map();

  ticketInfoIds.forEach((ticket) => {
    const type = ticket.ticketInfo.type;
    const count = ticketTypeCounts.get(type) || 0;
    ticketTypeCounts.set(type, count + 1);
  });

  const resultArray = [
    ["Total Ticket Scale", "Amount"],
    ...Array.from(ticketTypeCounts.entries()).map(([type, count]) => [
      type,
      count,
    ]),
  ];
  return res.json(resultArray);
};

const getAllSoldTicketsCount = async (req, res) => {
  const organizerId = req.params.organizerId;
  const allEventsByOrganizer = await get_event_by_organizer_id(organizerId);
  const eventIds = allEventsByOrganizer.map((event) => event._id.toString());
  const allTickets = await Promise.all(eventIds.map(getTicketsByEventId));
  return res.json(allTickets[0].length);
};

module.exports = {
  totalTicketSale,
  getAllSoldTicketsCount,
};
