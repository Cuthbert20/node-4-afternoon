const swag = require('../models/swag')

module.exports = {
    search: (req,res) => {
        //req.query is what we query
        console.log(req.query)
        //req.body is what we put in the body ie like in postman
        const { category } = req.query
        if(!category) {
            res.status(200).send(swag)
        }else {
            const filteredSwag = swag.filter(swag => swag.category === category)
            res.status(200).send(filteredSwag)
        }
    }
}

//req.params are declared
//req.query are listened for