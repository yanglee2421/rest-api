// Express Imports
import { Router } from "express";

// Stripe Imports
import Stripe from "stripe";

const apiKey =
  "sk_test_51Ndm80IkSBLJkZjEW27ZWDQ2FF9YmCY4N7cqiF5Be2gWWHXk7cQBuMVPP6uCamCMhnCsVlxXnjggafTYTsXzQEoI007ecpoLol";

const stripe = new Stripe(apiKey, {
  apiVersion: "2022-11-15",
});

export const routerStripe = Router();

routerStripe.get("", async (req, res) => {
  // Get Customers
  const cusList = await stripe.customers.search({
    query: "email:'yanglee2421@gmail.com'",
    limit: 1,
  });
  console.log(cusList);

  const cus = await stripe.customers.create({
    email: "yanglee2421@gmail.com",
    name: "Yang Lee",
    address: {
      country: "CN",
      city: "Beijing",
    },
  });
  const customer = cus.id;

  // Get Redirect URL
  const session = await stripe.checkout.sessions.create({
    // payment_intent_data: {
    //   setup_future_usage: "off_session",
    // },
    customer,
    line_items: [
      {
        price: "price_1NdmBbIkSBLJkZjEU09byLA2",
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: "https://warpdriven.ai/zh_CN/login/?from=stripe",
  });

  console.log(session);

  res.send({ link: session.url });
});
