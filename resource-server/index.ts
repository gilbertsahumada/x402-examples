import { config } from "dotenv";
import express from "express";
import { paymentMiddleware, Resource, type SolanaAddress } from "x402-express";

config();

const facilitatorUrl = process.env.FACILITATOR_URL as Resource;
const payTo = process.env.ADDRESS as `0x${string}` | SolanaAddress;

if (!facilitatorUrl || !payTo) {
  console.error("Missing required environment variables");
  process.exit(1);
}

const app = express();
const PORT = 4021;

app.use(
  paymentMiddleware(
    payTo,
    {
      "GET /weather": {
        price: "$0.001",
        network: "base-sepolia",
      },
    },
    {
      url: facilitatorUrl,
    }
  )
);

app.get("/weather", (_req, res) => {
  res.send({
    report: {
      weather: "sunny",
      temperature: 70,
    },
  });
});

app.get("/", (_req, res) => {
  res.send("Express Payment Server is running");
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
