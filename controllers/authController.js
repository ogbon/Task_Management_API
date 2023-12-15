const {createUser,getUser} = require('../models/user')
const bcrypt = require('bcryptjs')
const {generateJWTToken, decodeJWTToken} = require('../authTools')



const signUp = async (req, res) => {
   let hash
   const {username, password, email} = req.body
   try {
    const salt = await bcrypt.genSalt(10);
    hash = await bcrypt.hash(password, salt);
    const userId = await createUser({username,password: hash,email})
    if(userId[0].insertId){
       const [rows,fields] = await getUser(email)
       res.status(201).send({data: {username: rows[0].username, email: rows[0].email}})
    }else{
       res.status(422).send({data: null, message: 'Unable to process your request', success: false}) 
    }
   }catch(err){
    res.status(422).send({data: null, message: 'Unable to process your request', success: false}) 
   }

}


const logIn = async (req,res) => {
    const { email, password } = req.body;
    try{
        const user = await getUser(email)
        const [rows, fields] = user
        
        if (!rows[0])
            throw new Error("Your email or password is wrong.");

        const passValidated = await bcrypt.compare(password, rows[0].password);
        if (passValidated === false) {
            throw new Error("Your email or password is wrong.");
        }
        const token = generateJWTToken({email: rows[0].email, username: rows[0].username, id: rows[0].id})

        res.status(200).send({data: {token, user:{email: rows[0].email, username: rows[0].username}}})   
  }catch(e){
    res.status(401).send({data: null, message: 'Unauthorized', success: false})
  }
}


module.exports = {
  signUp,
  logIn  
}
