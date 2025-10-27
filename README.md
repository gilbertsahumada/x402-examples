## 1. Instalar dependencias

```shell
npm i @modelcontextprotocol/sdk axios dotenv viem x402-axios zod express tsx x402-express
```

## 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con los valores adecuados para tu entorno:

```env
FACILITATOR=<url del servidor facilitador>
PAY_TO=<dirección del receptor en formato 0x>
PRIVATE_KEY=<private key del wallet con USDC en Base Sepolia>
PAYMENT_SERVER_URL=http://localhost:3000
ENDPOINT_PATH=/weather
```

- `FACILITATOR` y `PAY_TO` son usados por el servidor Express protegido con pagos.
- `PRIVATE_KEY`, `PAYMENT_SERVER_URL` y `ENDPOINT_PATH` son consumidos por el servidor MCP.

## 3. Levantar el servidor de recursos

```shell
npm run server
```

El recurso queda expuesto en `http://localhost:3000` y protegido por el middleware de pagos.

## 4. Levantar el servidor MCP

En una nueva terminal, reutilizando las mismas variables de entorno:

```shell
npx tsx mcp.ts
```

El servidor MCP usará `PAYMENT_SERVER_URL` y `ENDPOINT_PATH` para consultar el recurso protegido.

## 5. Registrar el servidor MCP en Claude Code Desktop

Agrega la siguiente entrada en el archivo de configuración de Claude Code Desktop (`claude_desktop_config.json` o equivalente), ajustando las rutas absolutas y valores de entorno según corresponda:

```json
  {
    "mcpServers": {
      "demo": {
        "command": "npx",
        "args": ["-y", "tsx", "mcp.ts"],
        "cwd": "/Users/gilbertsahumada/projects/mcp-x420",
        "env": {
          "PRIVATE_KEY": "<private-key-de-la-wallet>",
          "PAYMENT_SERVER_URL": "http://localhost:3000",
          "ENDPOINT_PATH": "/weather"
        }
      }
    }
  }
```

Una vez guardada la configuración, reinicia Claude Code Desktop para que reconozca el nuevo servidor MCP.

