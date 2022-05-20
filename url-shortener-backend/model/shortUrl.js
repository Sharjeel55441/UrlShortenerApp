const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const ShortUrl =new Schema({
    fullUrl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,

        default:shortid.generate
    },
    shortClick:Number
});

const ShortUrlModel = mongoose.model("UrlShortener",ShortUrl);
module.exports = {
    ShortUrlModel,
    create: async(body) =>{
        try{
            let url = await ShortUrlModel.create({
                fullUrl:body ? body : ''
            });
            return url;

        }catch(error) {
            console.log("=============Url model error================",error);
        }
    },
    fetchById: async (body) =>{
        try{
            let url = await ShortUrlModel.findOne({shortUrl:body})
            return url;

        }catch(error) {
            console.log("============Url Fetchin model error============",error);
        }
    }
};