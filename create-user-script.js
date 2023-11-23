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


use biz_cards_dev
db.createUser(
    {
        user: "root",
        pwd: "123456",
        roles: [
            { role: "readWrite", db: "biz_cards_dev" },
            { role: "dbAdmin", db: "biz_cards_dev" }
        ]
    }
)
 

*/