import { DataFetcher } from "data-fetcher";
import { Server } from "server";
import config from "../../config.json";

declare const __IS_DEV__: boolean;

(async () => {
    const dataFetcher = new DataFetcher(config);
    const server = new Server({ isDev: __IS_DEV__, port: config.port, sslKeyLocation: config.ssl_key, sslCertLocation: config.ssl_cert });

    await dataFetcher.listen();

    server.wss.on("connection", async (ws, req) => {
        console.log("client connected");
        ws.send(JSON.stringify(dataFetcher.getActiveBattles()));
    });

    await server.start();

    const clients = server.wss.clients;
    setInterval(() => {
        const battlesStr = JSON.stringify(dataFetcher.getActiveBattles());
        clients.forEach(client => {
            client.send(battlesStr);
        });
    }, 5000);
})();