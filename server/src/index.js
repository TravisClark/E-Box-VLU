const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

const route = require('./routes');

const URI_DATABASE = process.env.URI_DATABASE || 'mongodb+srv://Team11-SEP:Team11@e-box-vlu.urbecif.mongodb.net/E-Box-VLU?retryWrites=true&w=majority';

mongoose.connect(URI_DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to DB');
    })
    .catch(err => {
        console.log('err',err); 
    })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

//Connecting router
route(app);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});