Instalar las dependencias 

```shell
npm i @modelcontextprotocol/sdk axios dotenv viem x402-axios zod express tsx x402-express
```

Levantar Servidor

```shell
npm run server
```

Configurar Servidor claude Desktop

```json
{
  "mcpServers": {
    "demo": {
      "command": "pnpm",
      "args": [
        "--silent",
        "-C",
        "<absolute path to this repo>/examples/typescript/mcp",
        "dev"
      ],
      "env": {
        "PRIVATE_KEY": "<private key of a wallet with USDC on Base Sepolia>",
        "RESOURCE_SERVER_URL": "http://localhost:4021",
        "ENDPOINT_PATH": "/weather"
      }
    }
  }
}
```

