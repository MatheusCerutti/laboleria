import { db } from "../config/data.js";

export async function registerClient(req,res){
    
    const { name,address,phone} = req.body


    try {

        await db.query(`insert into clients (name,address,phone) values ($1,$2,$3)`,[name,address,phone])
        res.sendStatus(201)
        
    } catch (error) {
        console.log("Erro")
        res.status(500).send(error.message);
    }
}


export async function getClientOrders(req,res){
    const clientId = Number(req.params.id);

    try {

        const dados = await db.query(`select orders.*, cakes.*, orders.id as id_order,cakes.id as id_cake,cakes.name as cake_name from orders
        join cakes on orders."cakeId" = cakes.id
        where orders."clientId" = $1`,[clientId])
    
        if (dados.rowCount < 1) return res.sendStatus(404)

        const order = dados.rows.map((row) => ({
            orderId: row.id_order,
            quantity: row.quantity,
            createdAt: row.createdAt,
            totalPrice: row.totalPrice,
            cakeName: row.cake_name
          }));

        
        res.status(200).send(order);
        
    } catch (error) {
        
        console.log("Erro");
        res.status(500).send(error.message);
    }

    
    
}