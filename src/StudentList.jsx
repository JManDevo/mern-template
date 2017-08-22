import StudentAdd from './StudentAdd.jsx';
import StudentFilter from './StudentFilter.jsx';

export  default class StudentList extends React.Component {

    constructor() {
        super();
        this.state = { students: []};

        this.createStudent = this.createStudent.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        fetch('api/students')
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
                <StudentFilter />
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
            <td>{student.id}</td>
            <td>{student.belt}</td>
            <td>{student.name}</td>
            <td>{student.appearances}</td>
        </tr>
    );

}

function StudentTable (props) {

    const studentRows = props.students.map(student => <StudentRow key={student.id} student={student} />)
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

StudentRow.propTypes = {
    id: React.PropTypes.number.isRequired,
    belt: React.PropTypes.string,
    name: React.PropTypes.string,
    appearances: React.PropTypes.string
}