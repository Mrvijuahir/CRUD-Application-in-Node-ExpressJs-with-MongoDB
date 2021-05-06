var Userdb = require('../model/model');

// Create and save new user

exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({mesaage:"Content can not be empty"});
        return;
    }
    // new user
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        mobile:req.body.mobile,
        status:req.body.status
    })

    // Save user in db

    user
    .save(user)
    .then(data=>{
        // res.send(data)
        res.redirect('/add-user')
    })
    .catch(err=>{
        res.status(500).send({message:err.mesaage || "Some Error occured while creating new user"});
    })
}

// read user
exports.find = (req,res)=>{
    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Not found user"})
            }else{
                res.send(data)
            }
        }).catch(err=>{
            res.status(500).send({message:"Error while finding user"})
        })
    }
    else{
    Userdb.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({message:err.message || "Error occured while fetching data"})
    })
}
}


// Update user
exports.update = (req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"Data to update can not be empty"})
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot Update user with id ${id}.`})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error Update Information"})
    })
}

// Delete User

exports.delete = (req,res)=>{
const id = req.params.id;

Userdb.findByIdAndDelete(id)
.then(data=>{
    if(!data){
        res.status(404).send({message:`Cannot Delete with id ${id}`})
    }else{
        res.send({
            message:"Data Deleted Succesfully"
        })
    }
})
.catch(err=>{
    res.status(500).send({
        message:"Could not delete user"
    })
})
}