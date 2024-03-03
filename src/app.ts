import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import mongoSanitize from 'express-mongo-sanitize';
import morganMiddleware from './middlewares/morgan.middleware';
import logger from './configs/logger.config';

const app = express();

if (process.env.NODE_ENV !== 'production') {
    app.use(morganMiddleware);
}

app.use(helmet());
app.use(mongoSanitize());

app.use(compression());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
    })
);

app.get('/', (req, res) => {
    logger.info(req.body);
});

export default app;
