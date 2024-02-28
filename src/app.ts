import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('HELLO WORLD FROM THE SERVER');
});

export default app;
