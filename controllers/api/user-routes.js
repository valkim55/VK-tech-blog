const router = require('express').Router();
const {User} = require('../../models');

// ===== GET all users => /api/users =====
router.get('/', (req, res) => {
    // access the User model and run .findAll() method = SELECT * FROM users
    User.findAll({
        attributes: {exclude: ['password']}
    }).then(dbUserData => {
        return res.json(dbUserData)
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// ===== GET a single user => /api/users/id =====
router.get('/:id', (req, res) => {
    // SELECT * FROM users WHERE id=?
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id 
        }
    }).then(dbUserData => {
        if(!dbUserData) {
            res.status(400).json({ message: 'no user found with this id' });
            return;
        }
        res.json(dbUserData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// ===== POST a new user => api/users/ =====
router.post('/', (req, res) => {
    // INSERT INTO users (first_name, last_name, username, email, password) VALUES ('Potato', 'Cute', 'potato.chip', 'potato@gmail.com', 'potato123')
    User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// ===== LOGIN ROUTE =====
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username,
            email: req.body.email
        }
    }).then(dbUserData => {
        if(!dbUserData) {
            res.status(400).json({message: 'no user found with this email'});
            return;
        }
        
        const validPassword = dbUserData.checkPassword(req.body.password);
        if(!validPassword) {
            res.status(400).json({message: 'incorrect password!'});
            return;
        }
        res.json({user: dbUserData, message: 'you are now logged in!'});
        // req.session.save(() => {
        //     // declare session variables
        //     req.session.user_id = dbUserData.id;
        //     req.session.username = dbUserData.username;
        //     req.session.loggedIn = true;
        //     res.json({user: dbUserData, message: 'you are now logged in!'});
        // });
    });
});







// ===== UPDATE a user => /api/users/id =====
router.put('/:id', (req, res) => {
    // UPDATE users SET first_name = 'Potato', last_name='Pretty', username='cute.potato', email = 'potato@gmail.com', password = 'potato123' WHERE id=?;
    // if req.body has exact key/value pairs to match the model, you can just use 'req.body' 
    User.update(req.body, {
        individualHooks: true,
        where: { id: req.params.id }
    }).then(dbUserData => {
        if(!dbUserData[0]) {
            res.status(400).json({ message: 'no user found with this id' });
            return;
        }
        res.json(dbUserData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// ===== DELETE a user=> /api/users/id =====
router.delete('/:id', (req, res) => {
    // DELETE FROM users WHERE id=?;
    User.destroy({
        where: { id:req.params.id }
    }).then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'no user found with this id'});
            return;
        }
        res.json(dbUserData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;