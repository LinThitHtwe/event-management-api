console.log("placeholder");
const {
  is_customer_can_buy_more,
  add_ticket,
  get_all_ticket,
  filter_tickets,
} = require("../services/ticketService");
const {
  get_all_ticket_info_by_event_id,
} = require("../services/ticketInfoService");

const create_ticket = (req, res) => {
  const ticket = req.body;
  if (!ticket) {
    return res.json("Invalid ticket");
  }

  const ticketInfo = get_all_ticket_info_by_event_id(ticket.event);

  if (!ticketInfo) {
    return res.json("Ticket not exists");
  }
  if (ticketInfo.quantity <= 0) {
    return res.json("Ticket is sold out");
  }

  if (is_customer_can_buy_more(ticket.customer.email, ticketInfo.ticketType)) {
    add_ticket(ticket)
      .then((result) => {
        return res.json(result);
      })
      .catch((err) => {
        return err;
      });
  } else {
    return res.json("You have reached the limit");
  }
};

const get_tickets = async (req, res) => {
  const result = await get_all_ticket();
  res.json(result);
};

const get_filtered_tickets = async (req, res) => {
  const result = await filter_tickets(req.query);
  result == [] ? res.json({ error: 'Not found', message: 'resource with following criteria not found' }) : res.json(result);
}

module.exports = {
  create_ticket,
  get_tickets,
  get_filtered_tickets,
};
