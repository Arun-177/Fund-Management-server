const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fm');


const fm2 = new mongoose.Schema(
    {
        date: {
            type: Number
        },
        platform: {
            type: String
        },
        comment: {
            type: String
        },
        amount: {
            type: Number
        },
        creditdebit: {
            type: String
        },
    },

);

const fm2model = mongoose.model("fmdata", fm2, 'fmdata');



exports.getData = async (req, res) => {
    try {
        const noteObj = [
            {
                date: new Date(),
                platform: 'GROWW',
                name: 'Undefined',
                amount: 500,
                creditdebit: 'debit'
            },
            {
                date: new Date(),
                platform: 'GROWW',
                name: 'Undefined',
                amount: 500,
                creditdebit: 'debit'
            }, {
                date: new Date(),
                platform: 'GROWW',
                name: 'Undefined',
                amount: 500,
                creditdebit: 'debit'
            }, {
                date: new Date(),
                platform: 'GROWW',
                name: 'Undefined',
                amount: 500,
                creditdebit: 'debit'
            },

        ];
        // const newNotes = await fm2model.create(noteObj);
        const resdata = await fm2model.find({ platform: req.body.value }, { _id: 0, __v: 0 });
        console.log(req.body)
        res.status(200).json({
            status: 'success',
            message: resdata
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};