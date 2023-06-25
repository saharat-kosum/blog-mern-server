import { Request, Response } from 'express';
import BlogModel, { IBlog } from "../models/blogSchema";
import { uuid } from 'uuidv4';

const slugify = require("slugify")

exports.create = async (req: Request,res: Response)=>{
    const {title, content, author} = req.body
    let slug = slugify(title)
    if(!slug){
      slug = uuid()
    }

    //Validate data
    switch(true){
        case !title:
            return res.status(400).json({error: "Please input title"})
            break
        case !content:
            return res.status(400).json({error: "Please input content"})
            break
    }

    const newBlog: IBlog = new BlogModel({
        title,
        content,
        author,
        slug,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    
      try {
        const createdBlog = await newBlog.save();
        return res.json(createdBlog);
      } catch (err) {
        return res.status(400).json({ error: "Same topic name" });
      }
}

exports.getAllblogs =async (req: Request,res: Response) => {
  try{
    const allBlogs = await BlogModel.find({});
    return res.json(allBlogs)
  }catch (error){
    return res.status(400).json({ error: "Server error" });
  }
}

exports.singleBlog =async (req: Request,res: Response) => {
  const {slug} = req.params
  try{
    const blog = await BlogModel.findOne({slug});
    return res.json(blog)
  }catch (error){
    return res.status(400).json({ error: "Server error" });
  }
}

exports.deleteBlog =async (req: Request,res: Response) => {
  const {slug} = req.params
  try{
    const blog = await BlogModel.findOneAndDelete({slug});
    return res.json(blog)
  }catch (error){
    return res.status(400).json({ error: "Server error" });
  }
}

exports.updateBlog =async (req: Request,res: Response) => {
  const {slug} = req.params
  const {title,content,author} = req.body 
  try{
    const blog = await BlogModel.findOneAndUpdate({slug},{title,content,author},{new:true});
    return res.json(blog)
  }catch (error){
    return res.status(400).json({ error: "Server error" });
  }
}
