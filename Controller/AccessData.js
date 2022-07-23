const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fm');
const Schema = require('mongoose').Schema;

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

const fmSchema = new mongoose.Schema(
    {
        lastlogin: {
            type: Number
        },
        category: {
            type: String
        },
        name: {
            type: String
        },
        // comment: {
        //     dataInsertPattern: { type: Schema.Types.Mixed, default: 'undefined' },
        //     title: { type: String, default: 'undefined', trim: true },
        //     video: { type: String, default: 'undefined', trim: true }
        // }
        comment: { type: Schema.Types.Mixed, default: { 'tmpkey': 'tmpval' } },
    }
);

const fmDataModal = mongoose.model("fm", fmSchema, "fm");
const fm2model = mongoose.model("fmdata", fm2, 'fmdata');





exports.insertData = async (req, res) => {
    console.log('insertData - ', req.body.value)
    try {
        const resdata = await fm2model.insertMany(req.body.value);
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
        console.log('-----------------', new Date(req.body.startDate), new Date(req.body.endDate))
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
        resdata.reverse();
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


exports.getHighLevelViewData = async (req, res) => {
    try {
        // console.log('-----------------', new Date(req.body.startDate), new Date(req.body.endDate))
        const resdata = await fm2model.find(
            {
                $and: [
                    { date: { $gte: req.body.startDate } },
                    { date: { $lte: req.body.endDate } },
                ]
            },
            { _id: 0, __v: 0 });
        // const resdata = await fm2model.find()
        // console.log(req.body)
        // console.log('resdata is ', resdata)
        resdata.reverse();
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



exports.getDocsData = async (req, res) => {
    try {
        // const resdata = await fmDataModal.find(
        //     {
        //         $and: [
        //             { date: { $gte: req.body.startDate } },
        //             { date: { $lte: req.body.endDate } },
        //         ]
        //     },
        //     { _id: 0, __v: 0 });

        // resdata.reverse();

        // const newNotes = await fmDataModal.findOneAndUpdate(
        //     {
        //         category: req.body.category,
        //         name: req.body.item
        //     },
        //     {
        //         $set: {
        //             comment: { 'dataInsertPattern': JSON.parse(req.body.key) }
        //         }
        //     }
        // );

        // res.status(200).json({
        //     status: 'success',
        //     // keyReceived: req.body.key,
        //     message: await fmDataModal.find(
        //         {
        //             category: req.body.category,
        //             name: req.body.item
        //         }
        //     )
        // });
        const dt = new Date();
        if (req.body.key == String(dt.getDate()) + String(dt.getMonth()) + String(dt.getHours()) + String(dt.getMinutes())) {
            res.status(200).json({
                status: 'success',
                // keyReceived: req.body.key,
                message: await fmDataModal.find(
                    {
                        category: req.body.category,
                        name: req.body.item
                    },
                    {
                        "_id": 0, "comment": 1
                    }
                )
            });
        }
        else {
            res.status(200).json({
                status: 'failed',
                // keyReceived: req.body.key,
                message: 'not verified' + req.body.key + String(dt.getDate()) + String(dt.getMonth()) + String(dt.getHours()) + String(dt.getMinutes())
            });
        }

    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.updateDocsData = async (req, res) => {
    console.log(req.body.docsData)
    try {
        const newNotes = await fmDataModal.findOneAndUpdate(
            {
                category: req.body.category,
                name: req.body.item
            },
            {
                $set: {
                    comment: req.body.docsData
                }
            }
        );
        console.log('udpateDocsData insertion response - ' + newNotes)
        const resdata = await fm2model.find(
            {
                $and: [
                    { date: { $gte: req.body.startDate } },
                    { date: { $lte: req.body.endDate } },
                ]
            },
            { _id: 0, __v: 0 });
        // const resdata = await fm2model.find()
        // console.log(req.body)
        // console.log('resdata is ', resdata)
        resdata.reverse();
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
