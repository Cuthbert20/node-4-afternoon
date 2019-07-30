module.exports = function(req,res,next) {
        //I destructred session off of req but, then commented it out cause I think I learn better using req.session
        // const { session } = req
        if(!req.session.user) {
            req.session.user = {  username: '', cart: [],total: 0 }
        }
        next()
    }
