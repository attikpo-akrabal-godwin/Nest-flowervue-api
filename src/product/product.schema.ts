import * as mongoose from 'mongoose'

export const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    reduction:{status:Boolean,prcent:Number},
    createdAt: {
        type: Date,
        default: Date.now 
    },
    tag:String,
    adminId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'admin'
    }
})