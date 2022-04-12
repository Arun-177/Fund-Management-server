const express = require('express');

const routing = express.Router();
const headerapi = require('../Controller/HeaderApi');
const accessDataapi = require('../Controller/AccessData');

// routing.get('/notes', headerapi.getNotes);

routing.get('/lastlogintime', headerapi.lastlogintime);

routing.get('/getDropDownItem', headerapi.getDropDownItem);

routing.post('/insertData', accessDataapi.insertData);

routing.post('/getData', accessDataapi.getData);

routing.post('/getHighLevelViewData', accessDataapi.getHighLevelViewData);

routing.post('/countItem', headerapi.countItem);

routing.post('/getDocsData', accessDataapi.getDocsData)

routing.post('/updateDocsData', accessDataapi.updateDocsData)

// routing.post('/notes', headerapi.newNotes);

routing.all('*', headerapi.invalid);

module.exports = routing;
