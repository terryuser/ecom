const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create member Schema & model
const MemberSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    password: {
        type: String,
        required: [true, 'Password field is required']
    },
    email: {
        type: String,
        default: "null"
    },
    watchlist: {
        type: Array
    }
});

const Member = mongoose.model('member', MemberSchema);

module.exports = Member;