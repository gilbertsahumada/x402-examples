# MCP x402 - Micropayment Server Example

Este proyecto demuestra cómo implementar un servidor MCP (Model Context Protocol) que consume recursos protegidos con micropagos usando el protocolo x402.

## Estructura del proyecto

```
mcp-x420/
├── mcp-server/          # Servidor MCP que consume recursos pagados
│   ├── mcp.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
└── resource-server/     # Servidor de recursos protegido con x402
    ├── index.ts
    ├── package.json
    ├── tsconfig.json
    └── .env.example
```

## 1. Configurar el Resource Server

### 1.1 Instalar dependencias

```shell
cd resource-server
yarn install
```

### 1.2 Configurar variables de entorno

Crea un archivo `.env` en la carpeta `resource-server/` basado en `resource-server/.env.example`:

```env
FACILITATOR=https://facilitator.x402.org
PAY_TO=0x... # Tu dirección de wallet para recibir pagos
```

### 1.3 Levantar el servidor

```shell
yarn dev
```

El servidor quedará expuesto en `http://localhost:3000` con el endpoint `/weather` protegido por micropagos.

## 2. Configurar el MCP Server

### 2.1 Instalar dependencias

```shell
cd mcp-server
yarn install
```

### 2.2 Configurar variables de entorno (opcional para desarrollo)

Para desarrollo local, crea un archivo `.env` en la carpeta `mcp-server/` basado en `mcp-server/.env.example`:

```env
PRIVATE_KEY=0x... # Private key de wallet con USDC en Base Sepolia
PAYMENT_SERVER_URL=http://localhost:3000
ENDPOINT_PATH=/weather
```

**Nota**: Cuando uses Claude Desktop, las variables de entorno se pasan a través de la configuración, no necesitas el archivo `.env`.

### 2.3 Probar el servidor MCP localmente

```shell
yarn dev
```

## 3. Registrar el servidor MCP en Claude Desktop

Agrega la siguiente configuración en `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "demo": {
      "command": "yarn",
      "args": [
        "--silent",
        "--cwd",
        "/ruta/absoluta/a/mcp-x420/mcp-server",
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

Reemplaza `/ruta/absoluta/a/mcp-x420/mcp-server` con la ruta absoluta a tu carpeta `mcp-server`.

Una vez guardada la configuración, **reinicia Claude Desktop** para que reconozca el nuevo servidor MCP.

## 4. Usar el servidor MCP

En Claude Desktop, ahora tendrás acceso a la herramienta `get-data-from-resource-server` que:
1. Realiza un micropago automáticamente usando USDC en Base Sepolia
2. Obtiene los datos del weather endpoint
3. Retorna la información

## Notas importantes

- Asegúrate de tener USDC en Base Sepolia en la wallet cuya `PRIVATE_KEY` configures
- El `resource-server` debe estar corriendo en `localhost:3000` para que el MCP server pueda consumirlo
- Usa `yarn` como package manager (según tus preferencias globales)

