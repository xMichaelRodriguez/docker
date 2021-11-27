const {
    Router
} = require('express');
const router = Router();
const User = require('../models/user')
router.get('/', (req, res) => {
    User.find((err, users) => {
        if (err) {
            return res.statusCode(400).json({err})
        }
        res.render('index.ejs', { path: "Users", users })
    })
});

module.exports = router;
