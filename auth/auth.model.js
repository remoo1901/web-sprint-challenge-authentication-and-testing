const db = require("../database/dbConfig")
const { decodeBase64 } = require("bcryptjs")


async function add(user){
    const [id] = await db("auth").insert(user)
    return findById(id)
}

function find(){
    return db("auth").select("id", "username")
}

function findBy(filter){
    return db("auth")
           .select("id", "username", "password")
           .where(filter)
}

function findById(){
    return db("auth")
            .select("id", "username")
            .where({id})
            .first()
}


module.exports = {
    add,
    find,
    findBy,
    findById
}