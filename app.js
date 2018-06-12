const express = require('express');
const apiRouter = require('./routes/api');
const app = express();

app.use(express.json());

app.use('/api', apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

