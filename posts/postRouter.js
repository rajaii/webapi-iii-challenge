const express = require('express');

const router = express.Router();

const postsDb = require('../posts/postDb.js');

router.get('/', (req, res) => {
    postsDb.get()
    .then(p => {
        res.status(200).json(p)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;