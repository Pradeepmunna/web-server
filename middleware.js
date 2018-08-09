var middleware ={
	requireAuthentication: function(req,res,next){
		console.log('private route');
		next();
	},
	logger: function(req,res,next){
		
		console.log('request '+new Date().toString()+ ' ' +req.method+' '+req.originalUrl);
	     next();
	}

};
module.exports=middleware;	