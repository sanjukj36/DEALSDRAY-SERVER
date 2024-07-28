const t_login = require("../Models/userModel");

exports.register=async(req,res)=>{
    console.log("Inside Register");
    const {f_sno,f_userName,f_Pwd}=req.body
    try{
        const existingUser=await users.findOne({f_userName})
        if(existingUser){
            res.status(400).json("UserName Already Exists!")
        }else{
            const newUser=new users(
                {f_sno,f_userName,f_Pwd
            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    }catch(err){
        res.status.json(err)
    }
    // res.status(200).json("Request Resived!!!")
}


//login
exports.login = async (req, res) => {
    console.log("Inside login Request!!!");
    const { f_userName, f_Pwd } = req.body
    console.log(f_userName, f_Pwd );
  
    try {
      const existingUser = await t_login.findOne({f_userName, f_Pwd  })
      if (existingUser) { 
        res.status(200).json({f_userName})
      } else {
        res.status(404).json("incorrect email/password")
      }
    } catch (err) {
      res.status(401).json(err)
    }
  }