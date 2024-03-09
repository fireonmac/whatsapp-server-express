import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import mongoSanitize from 'express-mongo-sanitize';
import createHttpError, { HttpError } from 'http-errors';

import morganMiddleware from './middlewares/morgan.middleware';
import logger from './configs/logger.config';

import routes from './routes';

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

// api v1 routes
app.use('/api/v1', routes);

app.use((req, res, next) => {
    next(createHttpError.NotFound('This route does not exist.'));
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const errorStatus = err.status || 500;
    res.status(errorStatus);
    res.send({
        error: {
            status: errorStatus,
            message: err.message,
        },
    });
});

export default app;
