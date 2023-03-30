import * as mongoose from 'mongoose'
export interface product {
    name: string 
    price: number
    reduction: {status:boolean,prcent:number}
    createdAt: Date
    tag:string
    adminId: string | mongoose.Schema.Types.ObjectId
}