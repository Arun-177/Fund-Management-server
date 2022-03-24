const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fm');

const fm2 = new mongoose.Schema(
    {
        // notesID: {
        //     type: Number,
        //     // unique: true,
        //     // required: [true, 'Required field'],
        // },
        // name: {
        //     type: String,
        //     // required: [true, 'Required field'],
        // },
        // data: {
        //     type: String,
        // },
        lastlogin: {
            type: Number
        }
    },

);

const fm2model = mongoose.model("fm", fm2);


// exports.getNotes = async (req, res) => {
//     try {
//         res.status(200).json({
//             message: 'You can now get the requested notes for your request ',
//         });
//     } catch (err) {
//         res.status(404).json({
//             status: 'fail',
//             message: err,
//         });
//     }
// };

exports.lastlogintime = async (req, res) => {
    try {
        newDate = new Date();
        // console.log(newDate.getTime());

        const noteObj = [
            {
                lastlogin: newDate
            }
        ];
        // const newNotes = await fm2model.create(noteObj);
        const getdate = await fm2model.find({}, { _id: 0, __v: 0 });
        // console.log(notes[0].lastlogin)
        const date = new Date(getdate[0].lastlogin)

        const updatedate = await fm2model.findOneAndUpdate({ lastlogin: date },
            { lastlogin: new Date() },
            {
                new: true, //to return new doc back
                runValidators: true, //to run the validators which specified in the model
            }
        )

        const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        res.status(200).json({
            status: 'success',
            message: date.getDate() + ' ' + month[date.getMonth()] + ', ' + date.getFullYear() + ' at ' +
                ((date.getHours() < 10) ? '0' : '') + date.getHours() + ':' + ((date.getMinutes() < 10) ? '0' : '') + date.getMinutes() + ':' + ((date.getSeconds() < 10) ? '0' : '') + date.getSeconds()
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.getDropDownItem = async (req, res) => {
    try {
        res.status(200).json({
            status: 'success',
            message: ['MMT', 'HPCL', 'PLATINUM'],
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

// exports.newNotes = async (req, res) => {
//     try {
//         res.status(201).json({
//             data: 'New notes added for the POST request',
//         });
//     } catch (err) {
//         res.status(404).json({
//             status: 'fail',
//             message: err.errmsg,
//         });
//     }
// };

exports.invalid = async (req, res) => {
    console.log('function called')
    res.status(200).json({
        status: 'fail',
        message: 'Invalid path',
    });
};
