const body_parser = require('body-parser');
const express = require('express');
var mysql=require("mysql");
const app = express();
const port = 3001;

var dbConnection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'QuotesDB'
})

dbConnection.connect();

app.use(body_parser.urlencoded({ extended: true }));

/*app.post('/quotes',function(request,response)
{
    var quote={
        id:request.body.id,
        quote:request.body.quote,
        author:request.body.author,
        year:request.body.year
    };

    var query='insert into tbl_quotes(id,quote,author,date) values('+quote.id+',"'+quote.quote+'","'+quote.author+'",'+quote.year+')';
    dbConnection.query(query,{quote:quote},function(error,result,field)
    {
        if(error)
        {
            throw error;
        }
        return response.send({error:false,data:result,message:'Quote has been added successfully.'});
    })
})*/

app.get('/all_tasks/',function(request,response)
{
    dbConnection.query("Select * from tasks where completed=0",function(error,result,field)
    {
        if(error)
        {
            throw error;
        }
        return response.send({error:false,data:result,message:'Error'});
    })
})

app.post('/add_task',function(request,response)
{
    var task={
        task:request.body.task,
        completed:request.body.completed
        //task:'Clean the house',
        //completed:0
    };

    dbConnection.query('insert into tasks(task,completed) values("'+task.task+'","'+task.completed+'")',function(error,result,field)
    {
        if(error)
        {
            throw error;
        }
        return response.send({error:false,data:result,message:''});
    })
})

app.put('/update_task',function(request,response)
{
    dbConnection.query('update tasks set completed=1 where id='+request.body.id,function(error,result,field)
    {
        if(error)
        {
            throw error;
        }
        return response.send({error:false,data:result,message:''});
    })
})

app.listen(port, () => {
    console.log("Listening through express on port: " + port);

});