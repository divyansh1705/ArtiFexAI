import mongoose from "mongoose";
import { type } from "os";

const Post = new mongoose.Schema({
    name:{ type:String ,required:true},
    prompt:{type:String,required:true},
    photo:{type:String,required:true}
})

const PostSchema = mongoose.model('Post',Post);

export default PostSchema