const router = require("express").Router();
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
// const stripe = require("stripe")("sk_test_51KAjLrA2gJVoPV745fg7wNXZFpjv4j1X3h1Nim2FiYP9sks7pHeAogiGWnX4PTCr1vBPgYR9KNRIjkkCRZtBll3z00hoBg4kAh");

router.post("/payment", async (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
