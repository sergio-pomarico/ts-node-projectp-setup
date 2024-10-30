import express, { Application } from 'express';
import { AppRoutes } from './routes/main';
import { IncomingMessage, ServerResponse, Server as HTTPServer } from 'http';
import errorMiddleware from './middlewares/error';
import helmet from 'helmet';

export class Server {
  public readonly app: Application = express();
  private readonly port: number;
  private listener: HTTPServer<
    typeof IncomingMessage,
    typeof ServerResponse
  > | null = null;

  constructor(port: number) {
    this.port = port;
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/', AppRoutes.routes);
    this.app.use(errorMiddleware);
  }

  async start() {
    this.listener = this.app.listen(this.port, () => {
      console.info(`🚀 server run on port ${this.port}`);
    });
  }

  async stop() {
    this.listener?.close();
  }
}
