import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import axios from "axios";
import {config } from "dotenv"
import { Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { withPaymentInterceptor } from "x402-axios";

// Only load .env if environment variables are not already set
// (Claude Desktop passes them via config, so we skip dotenv to avoid polluting stdio)
if (!process.env.PRIVATE_KEY) {
  config();
}

const privateKey = process.env.PRIVATE_KEY as Hex;
const baseUrl = process.env.PAYMENT_SERVER_URL as string; // e.g., "https://payment-server.example.com"
const endpointPath = process.env.ENDPOINT_PATH as string; // e.g., "/saludo"

if(!privateKey || !baseUrl || !endpointPath) {
    throw new Error("Missing environment variables");
}

const account = privateKeyToAccount(privateKey);
const client = withPaymentInterceptor(axios.create({ baseURL: baseUrl }), account);

// Create mcp server
const server = new McpServer({
    name: "MCP Stdio Server",
    version: "1.0.0",
});

server.tool(
    "get-data-from-resource-server",
    "Fetch data from the resource server with payment",
    {},
    async (_args, _context) => {
        const response = await client.get(endpointPath);
        return {
            content: [{type: "text", text: JSON.stringify(response.data)}]
        }
    }
);

const transport = new StdioServerTransport();
await server.connect(transport);
