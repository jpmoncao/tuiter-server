// Express
import express, { Express } from 'express';

// Dependências
import cors from 'cors';
import dotenv from 'dotenv';

// Rotas
import UsersRouter from './routes/UsersRouter.js';
import TuitesRouter from './routes/TuitesRouter.js';

// Controller
import UsersController from './controllers/UsersController.js';
import TuitesController from './controllers/TuitesController.js';

class App {
    private PORT: Number;
    private ADDRESS: String;
    private app: Express;

    constructor() {
        // Variáveis de ambiente
        dotenv.config();
        this.PORT = Number(process.env.API_PORT) || 3000;
        this.ADDRESS = process.env.API_ADDRESS || '0.0.0.0';
        this.app = express();

        // Middlewares
        this.app.use(express.json());
        this.app.use(cors());

        // Rotas
        const usersController = new UsersController();
        const usersRouter = new UsersRouter(usersController);
        this.app.use('/users', usersRouter.getRouter());

        const tuitesController = new TuitesController();
        const tuitesRouter = new TuitesRouter(tuitesController);
        this.app.use('/tuites', tuitesRouter.getRouter());
    }

    init() {
        // Exporta o app na porta selecionada
        this.app.listen(this.PORT, () => console.log(`Running: ${this.ADDRESS}:${this.PORT}`));
    }
}
const Application = new App();

export default Application;