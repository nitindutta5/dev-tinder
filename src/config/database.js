const mongoose = require('mongoose');


const connectDB = async () => {
    await mongoose.connect("mongodb+srv://nitindutta5:Test%40123@testcluster.fubuspq.mongodb.net/devtinder",{
        useNewUrlParser: true,
    });
};

module.exports = {
    connectDB
}