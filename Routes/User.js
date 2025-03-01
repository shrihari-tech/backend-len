const express = require('express');
const router = express.Router();
const User = require('../Schema/User');

router.post('/register', async (req, res) => {
    const {name,email,age} = req.body;
    const user = new User({
        name,
        email,
        age
    });
    await user.save();
    res.json(user);
})

router.get('/get', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if(!user){
            res.json({message:"User not found"});
        }
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
});

router.put('/update/:id',async(req,res)=>{
    const id = req.params.id;
    const {name,email} = req.body;
    try{
        const user = await User.findById(id);
        if(!user){
            res.json({message:"User not found"});
        }
        if(name){
            user.name = name;
        }
        if(email){
            user.email = email;
        }
        await user.save();
        res.json({message:"User updated successfully"});
    }
    catch(err){
        res.json({message:err});
    }
}
)

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;