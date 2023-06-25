import express from 'express';
const router = express.Router();
const {create, getAllblogs,singleBlog,deleteBlog,updateBlog} = require("../controller/blogController")
const {auth} = require("../controller/authController")

router.post('/create',auth,create)
router.get('/blogs',getAllblogs)
router.get('/blog/:slug',singleBlog)
router.delete('/blog/delete/:slug',auth,deleteBlog)
router.put('/blog/update/:slug',auth,updateBlog)

module.exports = router