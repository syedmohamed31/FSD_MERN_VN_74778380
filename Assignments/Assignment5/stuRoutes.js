
const userRouter = require('express').Router();

const usercontrol= require('./stuController')

userRouter.get("/getdata",usercontrol.getusers)
userRouter.put("/updatedata/:name",usercontrol.updateuser)
userRouter.delete("/deletedata/:name",usercontrol.deleteuser)
userRouter.post("/logindata",usercontrol.loginUser)
userRouter.post("/Register",usercontrol.register)
module.exports = userRouter;