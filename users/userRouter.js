const express = require('express');

const router = express.Router();

const userDb = require('./userDb.js');
const postDb = require('../posts/postDb.js');



router.get('/', (req, res) => {
    userDb.get()
    .then(u => {
        res.status(200).json(u)
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

router.get('/:id', validateUserId, (req, res) => {
    res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
    userDb.getUserPosts(req.user.id)
    .then(p => {
        res.status(200).json(p)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

router.post('/', validateUser, (req, res) => {
    userDb.insert(req.body)
        .then(u => {
            res.status(201).json(u);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

router.post('/:id/posts', validatePost, (req, res) => {
    postDb.insert(req.body)
    .then(p => {
        res.status(201).json(p);
    })
    .catch(err => {
        res.status(500).json(err.message);
    })
});

router.delete('/:id', validateUserId, (req, res) => {
    
    const { id } = req.params;
    userDb.remove(id)
    .then(u => {
        res.status(200).json(u);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
    
    const { id } = req.params;
    userDb.update(id, req.body)
    .then(u => {
        res.status(200).json(u);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

//custom middleware

async function validateUserId(req, res, next) {
    try {
    const { id } = req.params;

    let user = await userDb.getById(id);
    if(user) {
        console.log(user)
        req.user = user;
        next();
    } else {
        res.status(404).json({message: 'invalid user id'});
    }
} catch(error) {
    res.status(500).json(error);
}
};

function validateUser(req, res, next) {
    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    const { name } = req.body
    if(name && req.body) {
        next();
    } else if (isEmpty(req.body) || !req.body) {
        res.status(400).json({message: 'missing user data'})
    } else {
        res.status(400).json({message: 'missing user data name field'})
    }
    
};



function validatePost(req, res, next) {
    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    
    if (isEmpty(req.body) || !req.body) {
        res.status(404).json({message: 'missing post data'});
    } else if (!req.body.text) {
        res.status(400).json({message: 'missing post text field'});
        console.log(req.body)
    } else {
        console.log(req.body)
        next();
    }
};


module.exports = router;
