import { db } from "../config/data.js";

export async function registerCake(req,res){
    
    const { name,price,description,image } = req.body


    try {

        const existingName = await db.query(`select * from cakes where name = $1`,[name])
        if (existingName.rowCount > 0) return res.sendStatus(409)

        await db.query(`insert into cakes (name,price,description,image) values ($1,$2,$3,$4)`,[name,price,description,image])
        res.sendStatus(201)
        
    } catch (error) {
        console.log("Erro")
        res.status(500).send(error.message);
    }
}