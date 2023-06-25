import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    content: string;
    author: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}

const blogSchema: Schema<IBlog> = new mongoose.Schema<IBlog>({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: "Admin"
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true
    }
}, { timestamps: true });

const BlogModel: Model<IBlog> = mongoose.model<IBlog>("Blogs", blogSchema);

export default BlogModel;
