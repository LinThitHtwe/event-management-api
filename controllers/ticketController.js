console.log("placeholder");
const { is_customer_can_buy_more } = require("../services/ticketService");
const { get_ticket_info_by_id } = require("../services/ticketInfoService");

const add_ticket = (req, res) => { 

    const ticket = req.body.ticket;
    if (!ticket) {
        return res.json("Invalid ticket");
    }

    const ticketInfo = get_ticket_info_by_id(ticket.ticket_info_Id);

    if (!ticketInfo) {
        return res.json("Ticket not exists");
    }
    if (ticketInfo.quantity <= 0) {
        return res.json("Ticket is sold out");
    }
    if (is_customer_can_buy_more(ticket.customer.email, ticketInfo.ticketType)) {

        ticketService
          .add_ticket(ticket.ticketId, ticket.quantity)
          .then((result) => {
            return res.json(result);
          })
          .catch((err) => {
            return res.json(err);
          });
    }

    return res.json("You have reached the limit");

}

const get_tickets = (req, res) => {
}

module.exports = {
    add_ticket
}