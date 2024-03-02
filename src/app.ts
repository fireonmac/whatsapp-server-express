import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import mongoSanitize from 'express-mongo-sanitize';

const app = express();

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(cookieParser());
app.use(compression());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
    })
);

app.get('/', (req, res) => {
    res.send(req.body);
});

export default app;
