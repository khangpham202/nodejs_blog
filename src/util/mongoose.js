module.exports = {
  multipleMongooseToObject: function (mongoosesArray) {
    return mongoosesArray.map((mongoosesArray) => mongoosesArray.toObject());
  },
  mongoosesArrayToObject: function (mongoosesArray) {
    return mongoosesArray ? mongoosesArray.toObject() : mongoosesArray;
  },
};
