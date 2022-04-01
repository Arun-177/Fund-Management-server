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
        name: {
            type: String
        },
        quantity: {
            type: Number
        },
        price: {
            type: String
        },
        amount: {
            type: Number
        },
        creditdebit: {
            type: String
        },
        comment: {
            type: String
        }
    },

);

const fm2model = mongoose.model("fmdata", fm2, 'fmdata');



exports.getData = async (req, res) => {
    try {
        const noteObj = [
            {
                date: new Date(),
                platform: 'MMT',
                name: 'Coal India',
                quantity: 10,
                price: 200,
                amount: 2000,
                creditdebit: 'credit',
                comment: 'bought for experiment'
            },
            {
                date: new Date(),
                platform: 'HPCL',
                name: 'Coal India',
                quantity: 10,
                price: 200,
                amount: 2000,
                creditdebit: 'credit',
                comment: 'bought for experiment'
            },
            {
                date: new Date(),
                platform: 'PLATINUM',
                name: 'Coal India',
                quantity: 10,
                price: 200,
                amount: 2000,
                creditdebit: 'credit',
                comment: 'bought for experiment'
            },
            {
                date: new Date(),
                platform: 'Kite',
                name: 'Coal India',
                quantity: 10,
                price: 200,
                amount: 2000,
                creditdebit: 'credit',
                comment: 'bought for experiment'
            },
            {
                date: new Date(),
                platform: '12% Club',
                name: 'Coal India',
                quantity: 10,
                price: 200,
                amount: 2000,
                creditdebit: 'credit',
                comment: 'bought for experiment'
            },

        ];
        // const newNotes = await fm2model.create(noteObj);
        const resdata = await fm2model.find(
            {
                platform: req.body.value,
                $and: [
                    { date: { $gte: req.body.startDate } },
                    { date: { $lte: req.body.endDate } },
                ]
            },
            { _id: 0, __v: 0 });
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