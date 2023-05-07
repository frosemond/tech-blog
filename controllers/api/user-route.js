const router = require('express').Router();
const{User} = require('../../models');


router.post('/', async (req,res) => {
    try{
        const userData = await User.create(req.body)

        req.session.save(() =>{
            req.session.user_id = userData.id;
            req.session.user_name = userData.user_name
            req.session.logged_in = true
        })
        res.status(200).json(userData);
    }catch(err){
        res.status(400).json(err)
    }
})

router.post('/login', async (req,res) => {
    try{
        const userData = await User.findOne({where: {user_name: req.body.user_name}});

        if(!userData){
            res.status(400).json({message: 'Incorrect username or password'})
            return
        }
    }catch(err){
        res.status(500).json(err)
    }
})
router.delete('/:id', async (req,res) => {
    try{
        const userData = await User.destroy({
            where: {
                id: req.params.id
            }
        })
        if(!userData){
            res.status(400).json({message: 'No user found'})
            return;
        }
        res.status(200).json(userData)
    } catch(err){
        res.status(500).json(err)
    }
})

module.exports = router