var express = require('express');
var bodyParser = require('body-parser');
var _= require('underscore');
var app = express();
var PORT =process.env.PORT||3000;
var todos =[];
var todoNextId=1;
app.use(bodyParser.json());
app.get('/', function (req,res) {
	res.send('todo API ');
});		 
app.get('/todos',function(req,res) {
    var queryParams=req.query;
    var filterTodos = todos;
     if (queryParams.hasOwnProperty('completed')&& queryParams.completed === 'true') {
     	filterTodos = _.where(filterTodos,{completed:true});
     }
     else if (queryParams.hasOwnProperty='completed'&& queryParams.completed==='false') {
     	filterTodos=_.where(filterTodos,{completed:false})
     }
      res.json(filterTodos);
});			 
app.get('/todos/:id',function(req,res){

	var todoId = parseInt (req.params.id,10);
	var matchedTodo = _.findWhere(todos,{id:todoId});
//instead of below if used to match the id we can use the above underscore findwhere to search the object in an array
	// todos.forEach(function(todo){
		/*if(todoId===todo.id)
		{
			matchedTodo = todo; 
		}
	});*/
  	if(matchedTodo){
			res.json(matchedTodo);
		}else{
			res.status(404).send();
		}
	});
app.post('/todos',function(req,res){
    	var body = _.pick(req.body,'description','completed');		
if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send();		
}
				body.description= body.description.trim();
    	    	body.id = todoNextId ++;			
    	    	todos.push(body);
    	    	res.json(body);			
});
app.delete('/todos/:id',function(req,res){
	var todoId = parseInt(req.params.id,10);
	var matchedTodo=_.findWhere(todos,{id:todoId});
	if(!matchedTodo){ 
		res.status(404).send("error");
	}
	else{
			todos=_.without(todos,matchedTodo);
			res.json(matchedTodo);
	}
});
app.put('/todos/:id',function(req,res) {
	var todoId = parseInt(req.params.id,10);
	var matchedTodo=_.findWhere(todos,{id:todoId});c
	var body = _.pick(req.body,'description','completed');
	var validAtributes= {};

	if(!matchedTodo){
		return res.status(404).send();
	}
	if(body.hasOwnProperty('completed') && _.isBoolean(body.completed))
	{
		validAtributes=body.completed;
	}else if (body.hasOwnProperty('completed')) {
		return res.status(400).send();
	} 
	if (body.hasOwnProperty('description')&&_.isString(body.description)&& body.description.trim().length>0) 
	{validAtributes.description=body.description}
else if(body.hasOwnProperty('description')){
	return res.status(404).send();
}

matchedTodo=_.extend(matchedTodo,validAtributes);
res.json(matchedTodo);

});
app.listen(PORT,function() {
	console.log('express on port '+PORT);
});