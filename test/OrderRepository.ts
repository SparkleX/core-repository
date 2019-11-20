import {Query} from "../src/index";
import {Order} from "./Order"

export class OrderRepository{
    @Query('select * from "order" where "id" = ?')
    public async findById(id:Number):Promise<Order[]> {return null};
}