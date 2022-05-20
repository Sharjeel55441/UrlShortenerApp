const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ShortUrl =new Schema({
    fullUrl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true
    },
    // createDate: {
    //     type:Date
    // }
    
},{
    timestamps:true
}
);

const ShortUrlModel = mongoose.model("UrlShortener",ShortUrl);
module.exports = {
    ShortUrlModel,
    create: async(body) =>{
        try{
            let url = await ShortUrlModel.create({
                fullUrl:body.full ? body.full : '',
                shortUrl:body.short ? body.short : '',
                // createDate:new Date
            });
            return url;

        }catch(error) {
            console.log("=============Url model error================",error);
        }
    },
    fetchByUrl: async (data) =>{
        try{
            let url = await ShortUrlModel.findById({_id:data});
            return url;

        }catch(error) {
            console.log("============Url Fetchin model error============",error);
        }
    }
};