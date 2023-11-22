const customerService = require('../services/customerService')
const getAllCustomers= async(req,res) => {
    try{
        const customers = await customerService.get_all_customer;
        res.json(customer)
    } catch(error) {
        console.error(error);
    }
}
const getCustomerById=async(req,res)=>{
    try{
        const customerId=req.params.id;
        const customer=await customerService.get_customer_by_id(customerId);
        res.json(customer);
    }catch(error) {
        console.error(error);
    }
}
const addCustomer=async(req,res)=>{
    try{
        const addCustomer=req.body;
        const customer=await customerService.add_customer(addCustomer);
        res.json(customer);

    }catch(error){
        console.log(error);
    }
}

module.exports={
    getAllCustomers,
    getCustomerById,
    addCustomer
}