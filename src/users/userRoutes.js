const {Router} = require("express");
//import crud here
const {createUser, readUsers, updateUser, deleteUser, loginUser} = require("./userControllers");

const {hashPass, comparePass, tokenCheck} = require("../middleware");

const userRouter = Router();

userRouter.post("/createUser", hashPass, createUser );
userRouter.post("/login", comparePass, loginUser);
userRouter.get("/readUsers", tokenCheck, readUsers);
userRouter.put("/updateUser", updateUser);
userRouter.delete("/deleteUser", deleteUser);
module.exports = userRouter;