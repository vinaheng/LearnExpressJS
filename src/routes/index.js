
const homeRouter = require("./home")
const adminRouter = require("./admin")

function route(app) {
    app.use('/',homeRouter)
    app.use('/admin',adminRouter)
   
}
module.exports = route;
