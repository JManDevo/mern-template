'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _StudentAdd = require('./StudentAdd.jsx');

var _StudentAdd2 = _interopRequireDefault(_StudentAdd);

var _StudentFilter = require('./StudentFilter.jsx');

var _StudentFilter2 = _interopRequireDefault(_StudentFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

                if (response.ok) {
                    response.json().then(function (updatedStudent) {
                        updatedStudent.name = updatedStudent.name;
                        if (updatedStudent.name) updatedStudent.name = updatedStudent.name;

                        var newStudents = _this3.state.students.concat(updatedStudent);
                        _this3.setState({ students: newStudents });
                    });
                } else {
                    response.json().then(function (error) {
                        alert("failed to add student " + error.message);
                    });
                }
            }).catch(function (err) {
                alert("error in sending data to server: " + err.message);
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
                React.createElement(_StudentFilter2.default, null),
                React.createElement('hr', null),
                React.createElement(StudentTable, { students: this.state.students }),
                React.createElement('hr', null),
                React.createElement(_StudentAdd2.default, { createStudent: this.createStudent })
            );
        }
    }]);

    return StudentList;
}(React.Component);

exports.default = StudentList;


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