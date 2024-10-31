//Basic Website Setup
const express = require('express');
const router = express.Router();
const Post = require('../models/post')

//Get Route
router.get('', async (req, res) => {
    const locals = {
        title: "BJJ Blog",
        description: "This is a blog where you can post your favorite techniques."
    }

    try {
        const data = await Post.find();
        res.render('index', {locals, data});
    } catch (error) {
        console.log(error);
    }
})

// Get Post Id
router.get('/post/:id', async (req, res) => {
    try {
        const locals = {
            title: "BJJ Blog",
            description: "This is a blog where you can post your favorite techniques."
        }

        let slug = req.params.id;

        const data = await Post.findById({_id: slug});
        res.render('post', {locals, data});
    } catch (error) {
        console.log(error);
    }
})

//Search Bar
router.post('/search', async (req, res) => {
    try {
        const locals = {
            title: "BJJ Blog",
            description: "This is a blog where you can post your favorite techniques."
        }

        let searchTerm = req.body.searchTerm;
        const searchNoSpecialCharacters = searchTerm.replace(/[^a-zA-Z0-9]/g,"")

        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialCharacters, 'i')}},
                { body: { $regex: new RegExp(searchNoSpecialCharacters, 'i')}}
            ]
        });

        res.render("search", {
            data,
            locals
        });

    } catch (error) {
        console.log(error);
    }
})

//About Webpage
router.get('/about', (req, res) => {
    res.render('about');
});

//Contact Webpage
router.get('/contact', (req, res) => {
    res.render('contact');
});

//Post Webpage:
router.get('/postHere', async (req, res) => {
    const locals = {
        title: "BJJ Blog",
        description: "This is a blog whre you can share your favorite jiu jitsu techniques!"
    }
    try {
        const data = await Post.find()
        res.render('post', { locals, data });
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;

/*function insertPostDate () {
    Post.insertMany([
        {
            title: "Example",
            body: "exampleling"
        },
        {
            title: "Example",
            body: "exampleling"
        },
        {
            title: "Example",
            body: "exampleling"
        }
    ])
}

insertPostDate(); */