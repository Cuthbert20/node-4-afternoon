const users = require('../models/users.js')
const id = 1

module.exports = {
    register: (req,res) => {
        const { username, password } = req.body
        users.push({id, username, password})//req.body.username req.body.password
        id++
        session.user.username = username//req.body.username
        res.status(200).send(user)
    },
    login: (req,res) => {
        //LOOKUP .find method
        const user = users.find(e => e.username === req.body.username && e.password === req.body.password)

        if (user){
            session.user.username = ueser.username
            res.status(200).send(session.user)
        }else{
            res.status(500).send('Unauthorized my woman')
        }

    },
    signout: (req,res) => {
        console.log(req.session)
        req.session.destroy()
        res.status(200).send(req.session)
    },
    getUser: (req,res) => {
        //if we want to destructure session.user
        //const { session } = req
        res.status(200).send(req.session.user)
    }
}