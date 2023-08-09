// Express Imports
import { Router } from "express";

// Stripe Imports
import Stripe from "stripe";

const apiKey =
  "sk_test_51NNHk8GBFL7MX3TtKYhxd7afGWjl0xgIdPCaJ993mnTBgXM7yFppsYnEzZzdvdnFE9Jiocu2MIIEba3Y741ZJCI900Y8sVYtSw";

const stripe = new Stripe(apiKey, {
  apiVersion: "2022-11-15",
});

export const routerStripe = Router();

routerStripe.get("", async (req, res) => {
  // Get Customers
  const cus = await stripe.customers.list();
  const customer = cus.data[0].id;

  // Get Redirect URL
  const session = await stripe.checkout.sessions.create({
    customer,
    mode: "setup",
    payment_method_types: ["card"],
    success_url: "https://example.com/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "https://example.com/cancel",
  });

  // Redirect Response
  console.log(session.url);
  res.redirect(session.url || "");
});

routerStripe.post("", async (req, res) => {
  // Get Customers
  const cus = await stripe.customers.list();
  const customer = cus.data[0].id;

  // Get Redirect URL
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "setup",
    customer,
    success_url: "https://example.com/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "https://example.com/cancel",
  });

  // Redirect Response
  console.log(session.url);
  res.send(session.url || "");
});
