const contentNode = document.getElementById('contents');

class StudentList extends React.Component {

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
        }).then(response => response.json()
        ).then(updatedStudent => {
            updatedStudent.name = updatedStudent.name;
            if (updatedStudent.name)
                updatedStudent.name = updatedStudent.name;
            const newStudents = this.state.students.concat(updatedStudent);
            this.setState({students:newStudents});
        }).catch(err => {
            //alert("Error in sending data to the server: " + err.message);
        })
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

class StudentFilter extends React.Component {
    render () {
        return (
            <div>This is a placeholder for the student filter.</div>
        );
    }
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

class StudentAdd extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.studentAdd;
        this.props.createStudent({
            belt: form.belt.value,
            name: form.name.value,
            appearances: form.appearances.value,
        });
        form.name.value = "";
        form.belt.value = "";
        form.appearances.value = "";
    }

    render () {
        return (
            <div>
                <form name="studentAdd" onSubmit={this.handleSubmit}>
                    <input type="text" name="name" placeholder="Students Name" />
                    <select name="belt">
                        <option value="">--- SELECT A GRADE ---</option>
                        <option value="white">White</option>
                    </select>
                    <input type="text" name="appearances" placeholder="Students Appearances" />
                    <button>Add</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<StudentList/>, contentNode);