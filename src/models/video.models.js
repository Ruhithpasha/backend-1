import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema(
    {

        videoFile:{
            type:String, //will be obtained from cloudinary
            required:true,
        },
        thumbnail:{
            type:String,
            required:true,
        },
        title:{
            type:String,
            required:true,
            trim:true,
        },
        description:{
            type:String,
            required:true,
            trim:true,
        },
        duration:{
            type:Number, // get is from cloudinary
            required:true,
        },
        views:{
            type:Number,
            default:0,

        },
        isPublished:{
            type:Boolean,
            default:false,
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }

    }, {
    timestamps: true
}
)
// below line is for pagination and this plugin is used to write the aggregation queries for pagination
videoSchema.plugin(mongooseAggregatePaginate); //pagination
export const Video = mongoose.model("Video", videoSchema);