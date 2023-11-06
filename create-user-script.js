/*
use admin
db.createUser(
    {
        user: "root",
        pwd: "123456",
        roles: [
            { role: "readWriteAnyDatabase", db: "admin" },
            { role: "userAdminAnyDatabase", db: "admin" }
        ]
    }
)


use biz_cards
db.createUser(
    {
        user: "root",
        pwd: "123456",
        roles: [
            { role: "readWrite", db: "biz_cards" },
            { role: "dbAdmin", db: "biz_cards" }
        ]
    }
)
 

*/