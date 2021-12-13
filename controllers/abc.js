module.exports= (req, res, next) => {
    try{
        console.log(a);
    }catch(err){
        console.log(err);
        res.send(JSON.stringify(err));
    }
    
    
} ;
