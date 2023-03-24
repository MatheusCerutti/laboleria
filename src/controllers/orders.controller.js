import { db } from "../config/data.js";

export async function registerOrders(req,res){
    
    const { clientId,cakeId,quantity,totalPrice } = req.body


    try {

        const existingClient = await db.query(`select * from clients where id = $1`,[clientId])
        if (existingClient.rowCount < 1) return res.sendStatus(404)

        const existingCake = await db.query(`select * from cakes where id = $1`,[cakeId])
        if (existingCake.rowCount < 1) return res.sendStatus(404)

        await db.query(`insert into orders ("clientId","cakeId",quantity,"totalPrice") values ($1,$2,$3,$4)`,[clientId,cakeId,quantity,totalPrice])
        res.sendStatus(201)
        
    } catch (error) {
        console.log("Erro")
        res.status(500).send(error.message);
    }
}


export async function getOrders(req,res){

  let date = '';

  let dados = '';

  if(req.query.date){
    date = req.query.date;
  }

    try {
      console.log(date);
      if (!date){
        dados = await db.query(`select orders.*, cakes.*, clients.*,orders.id as id_order,cakes.id as id_cake, clients.id as id_clients, cakes.name as cake_name, clients.name as client_name from orders
         join cakes on orders."cakeId" = cakes.id
         join clients on orders."clientId" = clients.id`)
      } else {
        dados = await db.query(`select orders.*, cakes.*, clients.*,orders.id as id_order,cakes.id as id_cake, clients.id as id_clients, cakes.name as cake_name, clients.name as client_name from orders
         join cakes on orders."cakeId" = cakes.id
         join clients on orders."clientId" = clients.id where "createdAt"::date = $1`,[date])
      }
        

         const teste = dados.rows.map((row) => ({
            client: {
              id: row.clientId,
              name: row.client_name,
              address: row.address,
              phone: row.phone,
            },
            cake: {
              id: row.cakeId,
              name: row.cake_name,
              price: row.price,
              description: row.description,
              image: row.image,
            },
            orderId: row.id_order,
            createdAt: row.createdAt,
            quantity: row.quantity,
            totalPrice: row.totalPrice,
          }));

        
        res.status(201).send(teste);
    } catch (error) {
        console.log("Erro");
        res.status(500).send(error.message);
    }
}


export async function getOrdersId(req,res){
    try {

        const orderId = Number(req.params.id);

        const dados = await db.query(`select orders.*, cakes.*, clients.*,orders.id as id_order,cakes.id as id_cake, clients.id as id_clients, cakes.name as cake_name, clients.name as client_name from orders
        join cakes on orders."cakeId" = cakes.id
        join clients on orders."clientId" = clients.id
        where orders.id=$1`,[orderId])

        if (dados.rowCount < 1) return res.sendStatus(404) 

         const order = dados.rows.map((row) => ({
            client: {
              id: row.clientId,
              name: row.client_name,
              address: row.address,
              phone: row.phone,
            },
            cake: {
              id: row.cakeId,
              name: row.cake_name,
              price: row.price,
              description: row.description,
              image: row.image,
            },
            orderId: row.id_order,
            createdAt: row.created_at,
            quantity: row.quantity,
            totalPrice: row.totalPrice,
          }));

        
        res.status(200).send(order);
    } catch (error) {
        console.log("Erro");
        res.status(500).send(error.message);
    }
}
