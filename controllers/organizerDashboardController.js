const {
  getTicketsByEventId,
  getTicketsByTicketInfoId,
} = require("../services/ticketService");

const { get_event_by_organizer_id } = require("../services/eventService");
const { get_ticketInfo_by_id } = require("../services/ticketInfoService");
const totalTicketSale = async (req, res) => {
  const allEventsByOrganizer = await get_event_by_organizer_id(
    "655db72a40abeabdf4678ec9"
  );

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

module.exports = {
  totalTicketSale,
};
