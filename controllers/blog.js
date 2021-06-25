const Blog = require('./../models/Blog')
const errorHandler = require("../utils/errorHandler")
const fs = require('fs');

module.exports.getBlog = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.limit);
    try {
        let blog;
        if (req.query.category === 'all') {
            blog = await Blog.find({}, { title: 1, headerMedia: 1, category: 1, body: 1, date: 1 }).sort({ _id: -1 }).skip(perPage * page - perPage).limit(perPage);
        } else if (req.query.category === 'video') {
            blog = await Blog.find({ $or: [{ headerMedia: { $exists: true, $ne: null, $regex: '.mp4' } }, { video: { $exists: true, $ne: null } }] }).sort({ _id: -1 }).skip(perPage * page - perPage).limit(perPage)
        }

        else {
            blog = await Blog.find({ category: req.query.category }, { title: 1, headerMedia: 1, category: 1, body: 1, date: 1 }).sort({ _id: -1 }).skip(perPage * page - perPage).limit(perPage);
        }

        for (let i = 0; i < blog.length; i++) {
            if (blog[i].headerMedia) {
                blog[i].headerMedia = req.protocol + '://' + req.headers.host + '/' + blog[i].headerMedia;
            } else {
                blog[i].headerMedia = '';
            }
        }

        const count = await Blog.find().count();


        const fullBlog = {
            resultCode: 0,
            posts: blog,
            currentPage: page,
            totalPages: Math.ceil(count / perPage)
        }
        res.status(200).json(fullBlog);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.getPost = async (req, res) => {
    const postId = req.query.postId;

    try {
        const post = await Blog.findById({ _id: postId })

        if (post.photo) {
            for (let j = 0; j < post.photo.length; j++) {
                post.photo[j] = req.protocol + '://' + req.headers.host + '/' + post.photo[j];
            }
        } else {
            post.photo = [];
        }

        if (post.video) {
            for (let j = 0; j < post.video.length; j++) {
                post.video[j] = req.protocol + '://' + req.headers.host + '/' + post.video[j];
            }
        } else {
            post.video = []
        }

        if (post.headerMedia) {
            if (post.headerMedia) {
                post.headerMedia = req.protocol + '://' + req.headers.host + '/' + post.headerMedia;
            }
        } else {
            post.headerMedia = '';
        }

        res.status(200).json({
            resultCode: 0,
            post: post
        })
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.createPost = async (req, res) => {
    try {
        const post = new Blog({
            category: req.category,
            title: req.body.title,
            headerMedia: req.files.headerMedia ? req.files.headerMedia[0].path : null,
            body: req.body.body,
            date: new Date().toUTCString(),
            photo: req.files.image ? req.files.image.map(element => { return element.path }) : null,
            video: req.files.video ? req.files.video.map(element => { return element.path }) : null
        })
        await post.save();

        const createdPost = {
            _id: post._id,
            category: post.category,
            title: post.title,
            headerMedia: post.headerMedia ? req.protocol + '://' + req.headers.host + '/' + post.headerMedia : '',
            body: post.body,
            date: post.date,
            photo: post.photo ? post.photo.map(element => req.protocol + '://' + req.headers.host + '/' + element) : '',
            video: post.video ? post.video.map(element => req.protocol + '://' + req.headers.host + '/' + element) : ''
        }


        res.status(201).json({
            resultCode: 0,
            post: createdPost
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.deletePost = async (req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.query.postId });
        blog.video && blog.video.forEach(element => fs.unlink(element, err => { }))
        blog.photo && blog.photo.forEach(element => fs.unlink(element, err => { }))
        blog.headerMedia && fs.unlink(blog.headerMedia, err => { })
        blog.remove({ _id: req.query.postId })
        res.status(201).json({
            resultCode: 0,
            _id: req.query.postId
        })
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.updatePost = async (req, res) => {
    try {
        const post = await Blog.findOne({ _id: req.body._id });
        const removedPhotos = req.body.removedPhotos.split(',');
        const removedVideos = req.body.removedVideos.split(',');
        post.photo = post.photo ? post.photo.filter(function (item, index) {
            for (let i = 0; i < removedPhotos.length; i++) {
                if (req.protocol + '://' + req.headers.host + '/' + item === removedPhotos[i]) {
                    fs.unlink(post.photo[index], err => { });
                    return false;
                }
            }
            return true;
        }) : [];
        post.video = post.video ? post.video.filter(function (item, index) {
            for (let i = 0; i < removedVideos.length; i++) {
                if (req.protocol + '://' + req.headers.host + '/' + item === removedVideos[i]) {
                    fs.unlink(post.video[index], err => { });
                    return false;
                }
            }
            return true;
        }) : [];
        post.title = req.body.title;
        post.body = req.body.body;
        post.date = 'Updated ' + new Date();
        post.category = req.body.category;

        let addedVideo = req.files.video ? req.files.video.map(item => { return item.path }) : [];
        post.video = [...post.video, ...addedVideo];
        if (!post.video.length > 0) {
            post.video = null;
        }
        let addedPhoto = req.files.image ? req.files.image.map(item => { return item.path }) : [];
        post.photo = [...post.photo, ...addedPhoto];
        if (!post.photo.length > 0) {
            post.photo = null;
        }


        if (req.body.headerMedia) {
            if (req.body.headerMedia === 'deleteAll') {
                fs.unlink(post.headerMedia, err => { })
                post.headerMedia = null;
            }
        }

        if (req.files.headerMedia) {
            post.headerMedia && fs.unlink(post.headerMedia, err => { })
            post.headerMedia = req.files.headerMedia[0].path
        }

        await post.save();

        const updatedPost = {
            _id: post._id,
            category: post.category,
            title: post.title,
            headerMedia: post.headerMedia,
            body: post.body,
            date: post.date,
            photo: post.photo ? post.photo.map(element => req.protocol + '://' + req.headers.host + '/' + element) : [],
            video: post.video ? post.video.map(element => req.protocol + '://' + req.headers.host + '/' + element) : []
        }

        res.status(201).json({
            resultCode: 0,
            post: updatedPost
        })
    } catch (e) {
        console.log(e);
        errorHandler(res, e)
    }
}