const express = require('express');

const routing = express.Router();
const lastloginapi = require('../Controller/lastlogin');

// routing.get('/notes', lastloginapi.getNotes);

routing.get('/lastlogintime', lastloginapi.lastlogintime);

routing.get('/getDropDownItem', lastloginapi.getDropDownItem);

// routing.post('/notes', lastloginapi.newNotes);

routing.all('*', lastloginapi.invalid);

module.exports = routing;
