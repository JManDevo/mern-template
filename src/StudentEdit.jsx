import React from 'react';
import {Link
} from 'react-router';

export default class StudentEdit extends React.Component {
    render() {
        return (
            <div>
                <p>this is a placeholder for the student edit page for student {this.props.params.id}</p>
                <Link to="/students">Back to students</Link>
            </div>
        );
    }
}

StudentEdit.propTypes = {
    params:React.PropTypes.object.isRequired,
}