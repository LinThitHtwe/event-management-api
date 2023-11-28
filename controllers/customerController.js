const customerService = require("../services/customerService");
const { add_ticket } = require("../services/ticketService");
const getAllCustomers = async (req, res) => {
  try {
    const customers = await customerService.get_all_customer();
    res.json(customers);
  } catch (error) {
    console.error(error);
  }
};
const getCustomerById = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await customerService.get_customer_by_id(customerId);
    res.json(customer);
  } catch (error) {
    console.error(error);
  }
};
const addCustomer = async (req, res) => {
  let customer;
  try {
    const { customer: addCustomer, tickets } = req.body;
    customer = await customerService.add_customer(addCustomer);

    const boughtTickets = tickets.map((ticket) => ({
      ...ticket,
      customer: customer._id,
    }));
    const response = [];

    for (const boughtTicket of boughtTickets) {
      try {
        const addedTicket = await add_ticket(boughtTicket);
        response.push(addedTicket);
      } catch (error) {
        await customerService.remove_customer(customer._id);
        return res
          .status(500)
          .json({ error: "Ticket addition failed. Rollback performed." });
      }
    }

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  addCustomer,
};
