const router = require('express').Router();
const customerController = require('../controllers/customerController')

router.get('/all-customer',customerController.getAllCustomers)
router.get('/customerById/:id',customerController.getCustomerById)
router.post('/add-customer',customerController.addCustomer)
module.exports=router