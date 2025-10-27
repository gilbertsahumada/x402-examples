import express from "express";
import { config } from "dotenv";
import { Hex } from "viem";
import { paymentMiddleware, Resource } from "x402-express";

config();

const app = express();
const PORT = 3000;

const facilitator = process.env.FACILITATOR as Resource;
const payTo = process.env.PAY_TO as Hex;

if (!facilitator || !payTo) {
  throw new Error("Missing environment variables");
}

app.use(
  paymentMiddleware(
    payTo,
    {
      "GET /weather": {
        price: 0.001,
        network: "base-sepolia",
      },
    },
    {
      url: facilitator,
    }
  )
);

app.get("/weather", (_req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
