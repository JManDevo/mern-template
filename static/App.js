'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById('contents');

var StudentList = function (_React$Component) {
    _inherits(StudentList, _React$Component);

    function StudentList() {
        _classCallCheck(this, StudentList);

        var _this = _possibleConstructorReturn(this, (StudentList.__proto__ || Object.getPrototypeOf(StudentList)).call(this));

        _this.state = { students: [] };

        _this.createStudent = _this.createStudent.bind(_this);
        return _this;
    }

    _createClass(StudentList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadData();
        }
    }, {
        key: 'loadData',
        value: function loadData() {
            var _this2 = this;

            fetch('api/students').then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log("Toal number of students: ", data._metadata.total_count);
                data.records.forEach(function (student) {
                    student.name = student.name;
                });
                _this2.setState({ students: data.records });
            }).catch(function (err) {
                console.log(err);
            });
        }
    }, {
        key: 'createStudent',
        value: function createStudent(newStudent) {
            var _this3 = this;

            fetch('/api/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newStudent)
            }).then(function (response) {
                return response.json();
            }).then(function (updatedStudent) {
                updatedStudent.name = updatedStudent.name;
                if (updatedStudent.name) updatedStudent.name = updatedStudent.name;
                var newStudents = _this3.state.students.concat(updatedStudent);
                _this3.setState({ students: newStudents });
            }).catch(function (err) {
                //alert("Error in sending data to the server: " + err.message);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null,
                    'Student Tracker'
                ),
                React.createElement('hr', null),
                React.createElement(StudentFilter, null),
                React.createElement('hr', null),
                React.createElement(StudentTable, { students: this.state.students }),
                React.createElement('hr', null),
                React.createElement(StudentAdd, { createStudent: this.createStudent })
            );
        }
    }]);

    return StudentList;
}(React.Component);

var StudentRow = function StudentRow(props) {

    var student = props.student;
    return React.createElement(
        'tr',
        null,
        React.createElement(
            'td',
            null,
            student.id
        ),
        React.createElement(
            'td',
            null,
            student.belt
        ),
        React.createElement(
            'td',
            null,
            student.name
        ),
        React.createElement(
            'td',
            null,
            student.appearances
        )
    );
};

var StudentFilter = function (_React$Component2) {
    _inherits(StudentFilter, _React$Component2);

    function StudentFilter() {
        _classCallCheck(this, StudentFilter);

        return _possibleConstructorReturn(this, (StudentFilter.__proto__ || Object.getPrototypeOf(StudentFilter)).apply(this, arguments));
    }

    _createClass(StudentFilter, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                'This is a placeholder for the student filter.'
            );
        }
    }]);

    return StudentFilter;
}(React.Component);

function StudentTable(props) {

    var studentRows = props.students.map(function (student) {
        return React.createElement(StudentRow, { key: student.id, student: student });
    });
    return React.createElement(
        'table',
        { className: 'bordered-table' },
        React.createElement(
            'thead',
            null,
            React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    null,
                    'ID'
                ),
                React.createElement(
                    'th',
                    null,
                    'Belt'
                ),
                React.createElement(
                    'th',
                    null,
                    'Name'
                ),
                React.createElement(
                    'th',
                    null,
                    'Appearances'
                )
            )
        ),
        React.createElement(
            'tbody',
            null,
            studentRows
        )
    );
}

StudentRow.propTypes = {
    id: React.PropTypes.number.isRequired,
    belt: React.PropTypes.string,
    name: React.PropTypes.string,
    appearances: React.PropTypes.string
};

var StudentAdd = function (_React$Component3) {
    _inherits(StudentAdd, _React$Component3);

    function StudentAdd() {
        _classCallCheck(this, StudentAdd);

        var _this5 = _possibleConstructorReturn(this, (StudentAdd.__proto__ || Object.getPrototypeOf(StudentAdd)).call(this));

        _this5.handleSubmit = _this5.handleSubmit.bind(_this5);
        return _this5;
    }

    _createClass(StudentAdd, [{
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            e.preventDefault();
            var form = document.forms.studentAdd;
            this.props.createStudent({
                belt: form.belt.value,
                name: form.name.value,
                appearances: form.appearances.value
            });
            form.name.value = "";
            form.belt.value = "";
            form.appearances.value = "";
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'form',
                    { name: 'studentAdd', onSubmit: this.handleSubmit },
                    React.createElement('input', { type: 'text', name: 'name', placeholder: 'Students Name' }),
                    React.createElement(
                        'select',
                        { name: 'belt' },
                        React.createElement(
                            'option',
                            { value: '' },
                            '--- SELECT A GRADE ---'
                        ),
                        React.createElement(
                            'option',
                            { value: 'white' },
                            'White'
                        )
                    ),
                    React.createElement('input', { type: 'text', name: 'appearances', placeholder: 'Students Appearances' }),
                    React.createElement(
                        'button',
                        null,
                        'Add'
                    )
                )
            );
        }
    }]);

    return StudentAdd;
}(React.Component);

ReactDOM.render(React.createElement(StudentList, null), contentNode);