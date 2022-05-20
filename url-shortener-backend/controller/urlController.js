const shortid = require('shortid');
const UrlModel = require('../model/shortUrl');

exports.postUrl=async(req,res,next) =>{
    try{
    let fullUrl = req.body.fullUrl;
        let postUrl = await UrlModel.create(fullUrl);
        if(postUrl) {
            return res.status(200).json({
                message:"URL Post Successfully....",
                hasError:false,
                url:postUrl
            });
            
        }else{
            return res.status(400).json({
                message:"URL Not Creating.....",
                hasError:true
            })
        }

    }catch(error) {
        console.log("==============Url Creating Error=================",error);
    }
};
exports.getShortUrl = async (req,res,next) => {
try{
    let url = req.params.shortUrl;
    const shortUrl = await UrlModel.fetchById(url);
    const sUrl = shortUrl;
    if (sUrl) {
        return res.status(200).json({
            message:'Short URL Fetched Successfully....',
            hasError:false,
            result:shortUrl
        })
    }else {
        return res.status(400).json({
            message:'Short URL Not Fetched.....!',
            hasError:true,
            result:{}
        })
    }
}catch(error) {
    console.log("============Short Url fetch by id error================",error);
    next();
}
}