import React from 'react';
import {Link} from 'react-router';

export default class StudentEdit extends React.Component {
    constructor() {
        super();
        this.state = {
            student: {
                _id: '',name:'',belt:'',appearances:'',
            },
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.params.id !== this.props.params.id) {
            this.loadData();
        }
    }
    onChange(event) {
        const student = Object.assign({},this.state.student);
        student[event.target.name] = event.target.value;
        this.setState(student);
    }
    loadData() {
        fetch(`/api/students/${this.props.params.id}`).then(response => {
            if (response.ok) {
                response.json().then(student => {
                    this.setState({student});
                });
            } else {
                resonse.json().then(error => {
                    alert(`Dailed to fetch student: ${error.message}`);
                });
            }
        }).catch(err=> {
            alert(`Error in fetching data from server: ${err.message}`);
        });
    }
    render() {
        const student= this.state.student;
        return (
            <div>
                <form>
                    ID: {student._id}
                    <br/>
                    Belt:
                    <select name="belt" value={student.belt} onChange={this.onChange}>
                        <option value="White">White</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Orange">Orange</option>
                    </select>
                    Name: <input name="name" value={student.name} onChange={this.onChange} />
                    <br/>
                    Appearances: <input name="appearances" value={student.appearances} onChange={this.onChange} />

                    <button type="submit">Submit</button>
                    <Link to="/students">Back to student list</Link>
                </form>
            </div>
        );
    }
}

StudentEdit.propTypes = {
    params:React.PropTypes.object.isRequired,
};