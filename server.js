const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
let db;

const students = [];

MongoClient.connect('mongodb://localhost/zendo')
    .then(connection => {
        db = connection;
        app.listen(3000,() => {
            console.log('App started on port 3000');
        });
    }).catch(err => {
    console.log(err);
});

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());


app.get('/api/students',(req,res) => {
    db.collection('students').find().toArray()
        .then(students => {
            const metadata = {total_count: students.length};
            res.json({_metadata:metadata,records:students});
        })
});

app.post('/api/students',(req,res) => {
    const newStudent = req.body;
    //newStudent.id = students.length + 1;

    if (!newStudent.belt)
        newStudent.belt = "white";

    db.collection('students').insertOne(newStudent).then(result =>
        db.collection('students').find({_id: result.insertId}).limit(1).next()
    ).then(newStudent => {
                res.json(newStudent);
            }).catch(error => {
                console.log(error);
            });


    students.push(newStudent);
    res.json(newStudent);
});