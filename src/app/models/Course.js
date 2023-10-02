const mongoose = require("mongoose");
var softDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const Course = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    dsc: {
      type: String,
    },
    idVideo: {
      type: String,
      required: true,
    },
    active:{
      type: Boolean, default: true 
    }
  },
  { timestamps: true }
);
// add plugin
Course.plugin(softDelete,{
  overrideMethods: 'all',
  deleteAt:true
});

module.exports = mongoose.model("Course", Course);
