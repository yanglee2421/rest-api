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

routerStripe.get("/", async (req, res) => {
  void req;

  // Get Customer
  // const cusList = await stripe.customers.search({
  //   query: "email:'yanglee2421@gmail.com'",
  //   limit: 1,
  // });
  // console.log(cusList);

  const cus = await stripe.customers.create({
    email: "yanglee2421@gmail.com",
    name: "Yang Lee",
    address: {
      country: "CN",
      city: "Beijing",
    },
  });
  const customer = cus.id;

  // Get Payment Link
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

    // 支付完成后stripe跳转的URL（网页的地址）
    success_url: "http://localhost:3002/stripe/webhook",
  });

  res.send({ link: session.url });
});

// Stripe Webhook Endpoint
routerStripe.post("/webhook", (req, res) => {
  const endpointSecret =
    "whsec_41c5b5482f655b5cababb15caa8540509cf45d42d71e4bd41677c99772a3f7a7";

  try {
    const sig = req.headers["stripe-signature"];
    if (typeof sig !== "string") throw new Error("Invalid stripe-signature");

    const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log(event);
    // Do Something

    res.send();
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
});

routerStripe.get("/test", (req, res) => {
  void req;
  // JSON
  // res.json({});

  //
  res.redirect("http://xxxxx.com");
});
