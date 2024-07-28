const express = require("express")
const userController = require('../Controller/useController')
const employeeController= require("../Controller/employeeController")
// const multerConfig = require("../Middlewares/multerImage")
// const multerSingleConfig = require('../Middlewares/multerMiddleware');
const upload = require("../Middlewares/multerMiddleware");



const router=new express.Router()

router.post('/login',userController.login);
router.post('/register',userController.register);
router.get('/employee', employeeController.employeeShow);
router.get('/single_employee/:id', employeeController.singleEmployeeShow);
router.delete('/employee/:id', employeeController.employeeDelete);

// router.post('/create-Employee', employeeController.employeeCreate);
router.post('/create_Employee',upload.single('f_Image'), employeeController.createEmployee);
router.put('/edit_employee',upload.single('f_Image'), employeeController.editEmployee);



// multerConfig.single("f_Image")
module.exports = router