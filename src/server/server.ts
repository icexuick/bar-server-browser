import webpackConfig from "../../webpack.config";
import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import ws from "express-ws";
import http from "http";

export interface ServerConfig {
    port: number;
    isDev: boolean;
}

export class Server {
    public app: ws.Application;
    public server: http.Server;
    public wss: ws.Instance;
    
    protected config: ServerConfig;

    constructor(config: ServerConfig = { port: 4086, isDev: false }) {
        this.config = config;

        const expressApp = express();
        this.server = http.createServer(expressApp);
        this.wss = ws(expressApp, this.server);
        this.app = this.wss.app;

        this.app.set("view engine", "ejs");
        this.app.set("views", "dist/client");

        this.app.use(express.static("dist/client"));

        if (this.config.isDev){
            const clientConfig = webpackConfig("dev")[0];
            clientConfig.stats = "minimal";
            const compiler = webpack(clientConfig);
            this.app.use(webpackDevMiddleware(compiler, {
                publicPath: clientConfig.output?.publicPath
            }));
            this.app.use(webpackHotMiddleware(compiler, { log: false }));
        }

        this.app.get("/", async (req, res) => {
            res.render("index");
        });
    }

    public async start() {
        return new Promise<void>(resolve => {
            this.server.listen(this.config.port, () => {
                console.log(`Server running at http://localhost:${this.config.port}`);
                resolve();
            });
        });
    }
}