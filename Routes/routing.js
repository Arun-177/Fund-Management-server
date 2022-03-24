const express = require('express');

const routing = express.Router();
const headerapi = require('../Controller/HeaderApi');

// routing.get('/notes', headerapi.getNotes);

routing.get('/lastlogintime', headerapi.lastlogintime);

routing.get('/getDropDownItem', headerapi.getDropDownItem);

// routing.post('/notes', headerapi.newNotes);

routing.all('*', headerapi.invalid);

module.exports = routing;
