const {
  getTicketsByEventId,
  getTicketsByPaymentId,
} = require("../services/ticketService");

const {
  get_event_by_organizer_id,
  get_event_by_id,
} = require("../services/eventService");
const {
  get_all_ticket_info_by_event_id,
} = require("../services/ticketInfoService");
const { get_payment_by_organizer_id } = require("../services/paymentService");
const { getOrganizerIdFromToken } = require("../helper/index");

const totalTicketSale = async (req, res) => {
  const id = await getOrganizerIdFromToken(req, res);
  const { event: eventId } = req.query;

  const allEventsByOrganizer = [];
  if (eventId) {
    const event = await get_event_by_id(eventId);
    allEventsByOrganizer.push(event);
  } else {
    const eventsByOrganizer = await get_event_by_organizer_id(id);
    eventsByOrganizer.forEach((event) => allEventsByOrganizer.push(event));
  }

  const eventIds = allEventsByOrganizer.map((event) => event._id.toString());
  const allTickets = await Promise.all(eventIds.map(getTicketsByEventId));
  const payment = await get_payment_by_organizer_id(id);

  const ticketPromises = payment.map(async (p) => {
    const tickets = await getTicketsByPaymentId(p._id);
    const ticketCount = tickets.length;

    return { paymentName: p.name, ticketCount: ticketCount };
  });

  const ticketCountByPayment = await Promise.all(ticketPromises);

  const toalTicketByPayment = [
    ["Tickets", "Amount"],
    ...ticketCountByPayment.map(({ paymentName, ticketCount }) => [
      paymentName,
      ticketCount,
    ]),
  ];
  const eventTicketPromises = allEventsByOrganizer.map(async (event) => {
    const tickets = await getTicketsByEventId(event._id.toString());
    return { eventName: event.name, ticketCount: tickets.length };
  });
  const eventTicketCounts = await Promise.all(eventTicketPromises);

  const totalTicketSaleByEvent = [
    ["Total ticket Sale By Event", "Total"],
    ...eventTicketCounts.map(({ eventName, ticketCount }) => [
      eventName,
      ticketCount,
    ]),
  ];

  const ticketTypeCounts = new Map();
  allTickets
    .flatMap((tickets) => tickets.map((ticket) => ticket))
    .forEach((ticket) => {
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

  const returnValues = {
    totalTicketSaleByEvent: totalTicketSaleByEvent,
    totalTicketSaleByType: resultArray,
    toalTicketByPayment: toalTicketByPayment,
  };
  return res.json(returnValues);
};

const getAllOverviewData = async (req, res) => {
  const id = await getOrganizerIdFromToken(req, res);
  const { event: eventId } = req.query;
  const allEventsByOrganizer = [];
  if (eventId) {
    const event = await get_event_by_id(eventId);
    allEventsByOrganizer.push(event);
  } else {
    const eventsByOrganizer = await get_event_by_organizer_id(id);
    eventsByOrganizer.forEach((event) => allEventsByOrganizer.push(event));
  }

  const eventIds = allEventsByOrganizer.map((event) => event._id.toString());
  const allTickets = await Promise.all(eventIds.map(getTicketsByEventId));

  const ticketInfos = await Promise.all(
    eventIds.map(get_all_ticket_info_by_event_id)
  );

  const totalTicketsToSell = ticketInfos.reduce((total, tickets) => {
    return (
      total +
      tickets.reduce((ticketTotal, ticket) => {
        return ticketTotal + ticket.quantity;
      }, 0)
    );
  }, 0);
  const totalPrice = allTickets.reduce((total, tickets) => {
    return (
      total +
      tickets.reduce((ticketTotal, ticket) => {
        return ticketTotal + ticket.ticketInfo.price;
      }, 0)
    );
  }, 0);
  const overviewData = {
    totalTicketsSold: allTickets[0].length,
    totalPrice: totalPrice,
    allTotalAvaliableTickets: totalTicketsToSell,
    ticketsLeftToSell: totalTicketsToSell - allTickets[0].length,
  };
  return res.json(overviewData);
};
module.exports = {
  totalTicketSale,

  getAllOverviewData,
};
