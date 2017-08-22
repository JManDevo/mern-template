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

const validStudentBelts = {
    White: true,
    Yellow: true,
};

const studentFieldType = {
    belt:'required',
    name:'required',
    appearances:'optional',
};

function validateStudent(student) {
    for (const field in studentFieldType) {
        const type = studentFieldType[field];
        if (!type) {
            delete student[field];
        } else if (type === 'required' && !student[field]) {
            return `${field} is required.`;
        }
    }

    if (!validStudentBelts[student.belt]) {
        return `${student.belt} is not a valid belt!`;
            return null;
    }
}

app.post('/api/students',(req,res) => {
    const newStudent = req.body;
    //newStudent.id = students.length + 1;

    const err = validateStudent(newStudent);
    if (err) {
        res.status(422).json({message: `invalud request: ${err}`});
        return;
    }

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