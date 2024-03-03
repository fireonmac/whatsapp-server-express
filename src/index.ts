import app from './app';
import dotenv from 'dotenv';
import logger from './configs/logger.config';

dotenv.config();

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
    logger.info(`Server is listening at PORT ${PORT}`);
    logger.info('process.id', process.pid);
});

const onExit = () => {
    if (server) {
        logger.info('Server closed.');
    }

    process.exit(1);
};

const onUnexpectedError = (error: Error) => {
    logger.error(error);
    onExit();
};

process.on('uncaughtException', onUnexpectedError);
process.on('unhandledRejection', onUnexpectedError);
process.on('SIGTERM', onExit);
