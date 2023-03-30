export class CreateProductDto {
    name: string 
    price: number
    reduction: {status:boolean,prcent:number}
    createdAt: Date
    tag:string
    adminId: string 
}
