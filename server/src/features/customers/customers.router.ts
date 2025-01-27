import express from "express";
import { getCustomerDetail, getCustomers, searchCustomers } from "./customers.service";
import { getOrdersForCustomer } from "../orders/orders.service";

export const customersRouter = express.Router();

customersRouter.get("/", async (req, res) => {
  const customers = await getCustomers();
  res.json(customers);
});

customersRouter.get("/:id", async (req, res) => {  
  const customer = await getCustomerDetail(req.params.id);
  if (customer != null) {    
    res.json(customer);
  } else {
    res.status(404).json({message:"Customer Not Found"});
  }
})

customersRouter.get("/:id/orders", async (req, res) => {  
  const orders = await getOrdersForCustomer(req.params.id);
  res.json(orders);
})

customersRouter.get("/search/:query", async (req, res) => {  
  const customer = await searchCustomers(req.params.query);
  if (customer != null) {    
    res.json(customer);
  } else {
    res.status(404).json({message:"Customer Not Found"});
  }
})