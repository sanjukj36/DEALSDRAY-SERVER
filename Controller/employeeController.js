const t_Employee = require("../Models/employeeModel");
const { v4: uuidv4 } = require('uuid');


exports.createEmployee = async (req, res) => {
    const {
        f_Name,
        f_Email,
        f_Mobile,
        f_Designation,
        f_Gender,
        f_Course,
        f_Createdate
    } = req.body;

    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    const existingEmployee = await t_Employee.findOne({ f_Email });
    if (existingEmployee) {
        console.log('Existing Employee!!!');
        return res.status(400).json({
            message: `An employee with the Email ${f_Email} is already exists.`
        });
    }

    const f_Id = uuidv4();
    const f_Image = req.file ? req.file.filename : null;

    const newEmployee = new t_Employee({
        f_Id,
        f_Name,
        f_Email,
        f_Mobile,
        f_Designation,
        f_Gender,
        f_Course,
        f_Createdate,
        f_Image
    });

    try {
        const savedEmployee = await newEmployee.save();
        res.status(200).json({
            status: 'success',
            data: savedEmployee
        });
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while creating the employee',
            error: error.message
        });
    }
};

exports.employeeShow = async (req, res) => {
    try {

        const employees = await t_Employee.find();
        console.log(employees);

        if (!employees) {
            return res.status(404).json("Jobs not found");
        } else {
            res.status(200).json({ message: "success ", employees: employees });
        }
    } catch (error) {
        console.error("Error updating profile status:", error);
        res.status(500).json({ error: "An error occurred while updating profile status" });
    }
};

exports.employeeDelete = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const result = await t_Employee.deleteOne({ _id: id });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Employee deleted successfully' });
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete employee' });
    }
};

exports.singleEmployeeShow = async (req, res) => {
    const { id } = req.params;
    console.log("Received ID:", id); // Log the received ID

    try {
        if (!id) {
            throw new Error("Employee ID is not provided");
        }

        const employees = await t_Employee.findOne({ _id: id });
        console.log(employees);

        if (!employees) {
            return res.status(404).json("Employee not found");
        } else {
            res.status(200).json({ message: "success", employees: employees });
        }
    } catch (error) {
        console.error("Error updating profile status:", error);
        res.status(500).json({ error: "An error occurred while updating profile status" });
    }
};

// exports.editEmployee = async (req, res) => {
//     const {
//         _id,
//         f_Name,
//         f_Email,
//         f_Mobile,
//         f_Designation,
//         f_Gender,
//         f_Course,
//         f_Createdate
//     } = req.body;

//     console.log('Request Body:', req.body);
//     console.log('Uploaded File:', req.file);
//     try {

//         const existingEmployee = await t_Employee.findOne({ _id });
//         if (existingEmployee.f_Email !== f_Email) {
//             const alreadyExistEmployee = await t_Employee.findOne({ f_Email });

//             if (alreadyExistEmployee) {
//                 return res.status(400).json({
//                     message: `Cant use this email ${f_Email}`
//                 });

//             }
//         }
//         if (existingEmployee) {
//             existingEmployee.f_Name = f_Name;
//             existingEmployee.f_Email = f_Email;
//             existingEmployee.f_Mobile = f_Mobile;
//             existingEmployee.f_Designation = f_Designation;
//             existingEmployee.f_Gender = f_Gender;
//             existingEmployee.f_Course = f_Course;
//             existingEmployee.f_Createdate = f_Createdate

//             existingEmployee.f_Image = req.file ? req.file.filename : null;
//             await existingEmployee.save();
//             console.log(existingEmployee);
//             res.status(200).json({ existingEmployee, message: `An employee ${f_Name} is updated!!!.` });
//         } else {
//             console.log('Employee is not Existing!!!');
//             return res.status(400).json({
//                 message: `An employee with the Email ${f_Email} is not Existing!!!.`
//             });
//         }
//     } catch (err) {
//         res.status(500).json(err);
//     }



// };

// exports.editEmployee = async (req, res) => {
//     const {
//       _id,
//       f_Name,
//       f_Email,
//       f_Mobile,
//       f_Designation,
//       f_Gender,
//       f_Course,
//       f_Createdate
//     } = req.body;
  
//     console.log('Request Body:', req.body);
//     console.log('Uploaded File:', req.file);
  
//     try {
//       const existingEmployee = await t_Employee.findOne({ _id });
//       if (!existingEmployee) {
//         return res.status(400).json({
//           message: `An employee with the Email ${f_Email} is not Existing!!!.`
//         });
//       }
  
//       if (existingEmployee.f_Email !== f_Email) {
//         const alreadyExistEmployee = await t_Employee.findOne({ f_Email });
//         if (alreadyExistEmployee) {
//           return res.status(400).json({
//             message: `Can't use this email ${f_Email}`
//           });
//         }
//       }
  
//       existingEmployee.f_Name = f_Name;
//       existingEmployee.f_Email = f_Email;
//       existingEmployee.f_Mobile = f_Mobile;
//       existingEmployee.f_Designation = f_Designation;
//       existingEmployee.f_Gender = f_Gender;
//       existingEmployee.f_Course = JSON.parse(f_Course);
//       existingEmployee.f_Createdate = f_Createdate;
  
//       if (req.file) {
//         existingEmployee.f_Image = req.file.filename;
//       }
  
//       await existingEmployee.save();
//       console.log(existingEmployee);
//       res.status(200).json({ existingEmployee, message: `An employee ${f_Name} is updated!!!.` });
  
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   };
  
exports.editEmployee = async (req, res) => {
    const {
        _id,
        f_Name,
        f_Email,
        f_Mobile,
        f_Designation,
        f_Gender,
        f_Course,
        f_Createdate
    } = req.body;

    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);
    try {

        const existingEmployee = await t_Employee.findOne({ _id });
        if (existingEmployee.f_Email !== f_Email) {
            const alreadyExistEmployee = await t_Employee.findOne({ f_Email });

            if (alreadyExistEmployee) {
                return res.status(400).json({
                    message: `Cant use this email ${f_Email}`
                });

            }
        }
        if (existingEmployee) {
            existingEmployee.f_Name = f_Name;
            existingEmployee.f_Email = f_Email;
            existingEmployee.f_Mobile = f_Mobile;
            existingEmployee.f_Designation = f_Designation;
            existingEmployee.f_Gender = f_Gender;
            existingEmployee.f_Course = f_Course;
            existingEmployee.f_Createdate = f_Createdate

            existingEmployee.f_Image = req.file ? req.file.filename : null;
            await existingEmployee.save();
            console.log(existingEmployee);
            res.status(200).json({ existingEmployee, message: `An employee ${f_Name} is updated!!!.` });
        } else {
            console.log('Employee is not Existing!!!');
            return res.status(400).json({
                message: `An employee with the Email ${f_Email} is not Existing!!!.`
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }



};



