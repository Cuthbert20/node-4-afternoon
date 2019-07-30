const swag = require('../models/swag')

module.exports = {
    add: (req,res,next) => {
        console.log(req.session)
        //destructuring id off of req.params
       const { id } = req.params
       //destructuring user off of req.session
       const { user } = req.session

       //this will return -1 if it isn't in the cart
       const index = user.cart.findIndex(swag => swag.id == id)

       if(index === -1){
           const selectedSwag = swag.find(swag => swag.id == id)

           user.cart.push(selectedSwag)
           user.total += selectedSwag.price
       }
       res.status(200).send(user)
    },
    delete: (req,res,next) => {
        console.log(req.session)
        //destructuring id off of req.params
       const { id } = req.params
       //destructuring user off of req.session
       const { user } = req.session

       const index = user.cart.findIndex(swag => swag.id == id)
       const selectedSwag = swag.find(swag => swag.id == id)

       if(index !== -1){
           user.cart.splice(index,1)
           user.total -= selectedSwag.price
       }
       res.status(200).send(user)

    },
    checkout: (req,res,next) => {
        const { user } = req.session
        user.cart = []
        user.total = 0

        res.status(200).send(user)
    }
}