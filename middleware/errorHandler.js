
const errorHandler = (err, req, res, next) =>{
    console.log("999999999999")
    const statusCode = res.statusCode ? res.statusCode : 500;
    console.log("233333333333333", statusCode)
    switch (statusCode) {
        case 400:
            res.json({title:'Validation failed', message:err.message})
        case 401:
            res.json({title:'Unauthorized', message:err.message});
        case 404:
            res.json({title:'Not found', message:err.message})
        case 500:
            res.json({title:'Internal server error', message:err.message})
        default:
            res.json({title:"No error, all good"});
    }
}

module.exports = errorHandler;