import React from 'react';
import 'whatwg-fetch';
import {Link} from 'react-router';
import StudentAdd from './StudentAdd.jsx';
import StudentFilter from './StudentFilter.jsx';

export  default class StudentList extends React.Component {

    constructor() {
        super();
        this.state = { students: []};

        this.createStudent = this.createStudent.bind(this);
        this.setFilter = this.setFilter.bind(this);
    }

    setFilter(query) {
        this.props.router.push({apthname:this.props.location.pathname, query})
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        const oldQuery = prevProps.location.query;
        const newQuery = this.props.location.query;
        if (oldQuery.belt === newQuery.belt) {
            return;
        }
        this.loadData();
    }

    loadData() {
        fetch(`api/students${this.props.location.search}`)
            .then(response => response.json())
            .then(data => {
                console.log ("Toal number of students: ", data._metadata.total_count);
                data.records.forEach(student => {
                    student.name = student.name;
                });
                this.setState({students:data.records});
            }).catch(err => {
            console.log(err);
        })
    }

    createStudent(newStudent) {
        fetch('/api/students',{
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(newStudent),
        }).then(response => {

            if (response.ok) {
                response.json().then(updatedStudent => {
                    updatedStudent.name = updatedStudent.name;
                    if (updatedStudent.name)
                        updatedStudent.name = updatedStudent.name;

                    const newStudents = this.state.students.concat(updatedStudent);
                    this.setState({students: newStudents});
                });
            } else {
                response.json().then(error => {
                    alert("failed to add student " + error.message)
                });
            }
        }).catch(err => {
            alert("error in sending data to server: " + err.message);
        });

    }

    render () {
        return (
            <div>

                <h1>Student Tracker</h1>
                <hr />
                <StudentFilter setFilter={this.setFilter} initFilter={this.props.location.query} />
                <hr />
                <StudentTable students={this.state.students} />
                <hr />
                <StudentAdd createStudent={this.createStudent} />

            </div>
        );
    }
}

const StudentRow = (props) => {

    const student = props.student;
    return (
        <tr>
            <td><Link to={`/students/${props.student._id}`}>{props.student._id.substr(-4)}</Link></td>
            <td>{student.belt}</td>
            <td>{student.name}</td>
            <td>{student.appearances}</td>
        </tr>
    );

};

function StudentTable (props) {

    const studentRows = props.students.map(student => <StudentRow key={student._id} student={student} />)
    return (
        <table className="bordered-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Belt</th>
                <th>Name</th>
                <th>Appearances</th>
            </tr>
            </thead>
            <tbody>
            {studentRows}
            </tbody>
        </table>
    );

}

StudentList.propTypes = {
    location:React.PropTypes.object.isRequired,
    router:React.PropTypes.object,
};