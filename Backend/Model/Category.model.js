import mongoose from 'mongoose';
const categorySchema = new mongoose.Schema({
    name: {type:String,required:true},
  parent: {type:mongoose.Types.ObjectId, ref:'Category'},
  properties: [{type:Object}]
},);
export const categoryModel = mongoose.model('categoryModel', categorySchema);