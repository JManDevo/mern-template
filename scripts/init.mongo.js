db = new Mongo().getDB('zendo');

db.students.remove({});

db.students.insert([
    {
        id:1,belt:'White',name:'Joe',appearances:5
    },
    {
        id:2,belt:'Black',name:'Tanmoy',appearances:15
    }
]);

db.students.createIndex({belt:1});
db.students.createIndex({name:1});
db.students.createIndex({appearances:1});