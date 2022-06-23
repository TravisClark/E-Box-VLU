import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

import userRoute from './routers/user.js';

app.use('/user', userRoute);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});