# MCP x402 - Micropayment Server Example

This project demonstrates how to implement an MCP (Model Context Protocol) server that consumes resources protected with micropayments using the x402 protocol.

## Project structure

```
mcp-x420/
├── mcp-server/          # MCP server that consumes paid resources
│   ├── mcp.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
└── resource-server/     # Resource server protected with x402
    ├── index.ts
    ├── package.json
    ├── tsconfig.json
    └── .env.example
```

## 1. Configure the Resource Server

### 1.1 Install dependencies

```shell
cd resource-server
yarn install
```

### 1.2 Configure environment variables

Create a `.env` file in the `resource-server/` folder based on `resource-server/.env.example`:

```env
FACILITATOR=https://facilitator.x402.org
PAY_TO=0x... # Your wallet address to receive payments
```

### 1.3 Start the server

```shell
yarn dev
```

The server will be exposed at `http://localhost:3000` with the `/weather` endpoint protected by micropayments.

## 2. Configure the MCP Server

### 2.1 Install dependencies

```shell
cd mcp-server
yarn install
```

### 2.2 Configure environment variables (optional for development)

For local development, create a `.env` file in the `mcp-server/` folder based on `mcp-server/.env.example`:

```env
PRIVATE_KEY=0x... # Private key of wallet with USDC on Base Sepolia
PAYMENT_SERVER_URL=http://localhost:3000
ENDPOINT_PATH=/weather
```

**Note**: When using Claude Desktop, environment variables are passed through the configuration, you don't need the `.env` file.

### 2.3 Test the MCP server locally

```shell
yarn dev
```

## 3. Register the MCP server in Claude Desktop

Add the following configuration to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "demo": {
      "command": "yarn",
      "args": [
        "--silent",
        "--cwd",
        "/absolute/path/to/mcp-x420/mcp-server",
        "start"
      ],
      "env": {
        "PRIVATE_KEY": "0x...",
        "PAYMENT_SERVER_URL": "http://localhost:3000",
        "ENDPOINT_PATH": "/weather"
      }
    }
  }
}
```

Replace `/absolute/path/to/mcp-x420/mcp-server` with the absolute path to your `mcp-server` folder.

Once the configuration is saved, **restart Claude Desktop** for it to recognize the new MCP server.

## 4. Use the MCP server

In Claude Desktop, you will now have access to the `get-data-from-resource-server` tool that:
1. Automatically performs a micropayment using USDC on Base Sepolia
2. Fetches data from the weather endpoint
3. Returns the information

## Important notes

- Make sure you have USDC on Base Sepolia in the wallet whose `PRIVATE_KEY` you configure
- The `resource-server` must be running on `localhost:3000` for the MCP server to consume it
- Use `yarn` as package manager (according to your global preferences)