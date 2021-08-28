var express=require('express');
var cors=require('cors');
var path=require('path');
var fs=require('fs');

var app=express();
app.use(cors());

const jsonParser=express.json();


app.get('/users',function(request,response)
{
    var FileUsers=path.resolve(__dirname,'./data/users.json')
    response.sendFile(FileUsers) 
})



app.post("/todos/:userId", jsonParser, function (request, response) 
{   
    var FileTodos = path.resolve(__dirname, './data/todos.json');
    
    let data = fs.readFileSync(FileTodos, 'utf8');
    let todos = JSON.parse(data);

    let newTodo = request.body
    todos.push(newTodo) 

    fs.writeFileSync(FileTodos, JSON.stringify(todos));

    response.send(todos);
});



app.get('/todos/:userId', function(request, response) 
{  
    let userId=request.params["userId"];
    let userid=userId;
    let FileTodos=path.resolve(__dirname,'./data/todos.json')  

    let data=fs.readFileSync(FileTodos,'utf8');
    let todo= JSON.parse(data);

    let todo2=todo.filter(function(tod){
        return tod.userId==userid;
    })
    response.send(todo2);
});




app.get('/todos',function(request,response)
    {
        var FileTodos=path.resolve(__dirname,'./data/todos.json')
        response.sendFile(FileTodos) 
    }
)




const port=3001;
app.listen(port);