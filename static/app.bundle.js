webpackJsonp([0],{

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(76);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(33);

var _StudentList = __webpack_require__(248);

var _StudentList2 = _interopRequireDefault(_StudentList);

var _StudentEdit = __webpack_require__(251);

var _StudentEdit2 = _interopRequireDefault(_StudentEdit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contentNode = document.getElementById('contents');
var NoMatch = function NoMatch() {
    return _react2.default.createElement(
        'p',
        null,
        'Page not found'
    );
};
var App = function App(props) {
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'div',
            { className: 'header' },
            _react2.default.createElement(
                'h1',
                null,
                'Students'
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'contents' },
            props.children
        ),
        _react2.default.createElement(
            'div',
            { className: 'footer' },
            'Copyright (c) Joseph Man'
        )
    );
};

App.propTypes = {
    children: _react2.default.PropTypes.object.isRequired
};

var RoutedApp = function RoutedApp() {
    return _react2.default.createElement(
        _reactRouter.Router,
        { history: _reactRouter.browserHistory },
        _react2.default.createElement(
            _reactRouter.Route,
            { path: '/', component: App },
            _react2.default.createElement(_reactRouter.IndexRedirect, { to: '/students' }),
            _react2.default.createElement(_reactRouter.Route, { path: '/students', component: (0, _reactRouter.withRouter)(_StudentList2.default) }),
            _react2.default.createElement(_reactRouter.Route, { path: '/students/:id', component: _StudentEdit2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '*', component: NoMatch })
        )
    );
};
_reactDom2.default.render(_react2.default.createElement(RoutedApp, null), contentNode);

if (false) {
    module.hot.accept();
}

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(114);

var _reactRouter = __webpack_require__(33);

var _StudentAdd = __webpack_require__(249);

var _StudentAdd2 = _interopRequireDefault(_StudentAdd);

var _StudentFilter = __webpack_require__(250);

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
        _this.setFilter = _this.setFilter.bind(_this);
        return _this;
    }

    _createClass(StudentList, [{
        key: 'setFilter',
        value: function setFilter(query) {
            this.props.router.push({ apthname: this.props.location.pathname, query: query });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadData();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            var oldQuery = prevProps.location.query;
            var newQuery = this.props.location.query;
            if (oldQuery.belt === newQuery.belt) {
                return;
            }
            this.loadData();
        }
    }, {
        key: 'loadData',
        value: function loadData() {
            var _this2 = this;

            fetch('api/students' + this.props.location.search).then(function (response) {
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
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h1',
                    null,
                    'Student Tracker'
                ),
                _react2.default.createElement('hr', null),
                _react2.default.createElement(_StudentFilter2.default, { setFilter: this.setFilter, initFilter: this.props.location.query }),
                _react2.default.createElement('hr', null),
                _react2.default.createElement(StudentTable, { students: this.state.students }),
                _react2.default.createElement('hr', null),
                _react2.default.createElement(_StudentAdd2.default, { createStudent: this.createStudent })
            );
        }
    }]);

    return StudentList;
}(_react2.default.Component);

exports.default = StudentList;


var StudentRow = function StudentRow(props) {

    var student = props.student;
    return _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(
                _reactRouter.Link,
                { to: '/students/' + props.student._id },
                props.student._id.substr(-4)
            )
        ),
        _react2.default.createElement(
            'td',
            null,
            student.belt
        ),
        _react2.default.createElement(
            'td',
            null,
            student.name
        ),
        _react2.default.createElement(
            'td',
            null,
            student.appearances
        )
    );
};

function StudentTable(props) {

    var studentRows = props.students.map(function (student) {
        return _react2.default.createElement(StudentRow, { key: student._id, student: student });
    });
    return _react2.default.createElement(
        'table',
        { className: 'bordered-table' },
        _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                    'th',
                    null,
                    'ID'
                ),
                _react2.default.createElement(
                    'th',
                    null,
                    'Belt'
                ),
                _react2.default.createElement(
                    'th',
                    null,
                    'Name'
                ),
                _react2.default.createElement(
                    'th',
                    null,
                    'Appearances'
                )
            )
        ),
        _react2.default.createElement(
            'tbody',
            null,
            studentRows
        )
    );
}

StudentList.propTypes = {
    location: _react2.default.PropTypes.object.isRequired,
    router: _react2.default.PropTypes.object
};

/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StudentAdd = function (_React$Component) {
    _inherits(StudentAdd, _React$Component);

    function StudentAdd() {
        _classCallCheck(this, StudentAdd);

        var _this = _possibleConstructorReturn(this, (StudentAdd.__proto__ || Object.getPrototypeOf(StudentAdd)).call(this));

        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    _createClass(StudentAdd, [{
        key: "handleSubmit",
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
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "form",
                    { name: "studentAdd", onSubmit: this.handleSubmit },
                    _react2.default.createElement("input", { type: "text", name: "name", placeholder: "Students Name" }),
                    _react2.default.createElement(
                        "select",
                        { name: "belt" },
                        _react2.default.createElement(
                            "option",
                            { value: "" },
                            "--- SELECT A GRADE ---"
                        ),
                        _react2.default.createElement(
                            "option",
                            { value: "White" },
                            "White"
                        ),
                        _react2.default.createElement(
                            "option",
                            { value: "Yellow" },
                            "Yellow"
                        ),
                        _react2.default.createElement(
                            "option",
                            { value: "Orange" },
                            "Orange"
                        )
                    ),
                    _react2.default.createElement("input", { type: "text", name: "appearances", placeholder: "Students Appearances" }),
                    _react2.default.createElement(
                        "button",
                        null,
                        "Add"
                    )
                )
            );
        }
    }]);

    return StudentAdd;
}(_react2.default.Component);

exports.default = StudentAdd;

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(33);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StudentFilter = function (_React$Component) {
    _inherits(StudentFilter, _React$Component);

    function StudentFilter(props) {
        _classCallCheck(this, StudentFilter);

        var _this = _possibleConstructorReturn(this, (StudentFilter.__proto__ || Object.getPrototypeOf(StudentFilter)).call(this, props));

        _this.state = {
            belt: props.initFilter.belt || '',
            changed: false
        };

        _this.onChangeBelt = _this.onChangeBelt.bind(_this);
        _this.applyFilter = _this.applyFilter.bind(_this);
        _this.resetFilter = _this.resetFilter.bind(_this);
        _this.clearFilter = _this.clearFilter.bind(_this);

        return _this;
    }

    _createClass(StudentFilter, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            this.setState({
                belt: newProps.initFilter.belt || '',
                changed: false
            });
        }
    }, {
        key: 'resetFilter',
        value: function resetFilter() {
            this.setState({
                belt: this.props.initFilter.belt || '',
                changed: false
            });
        }

        /*clearFilter(e){
            e.preventDefault();
            this.props.setFilter({});
         }*/

    }, {
        key: 'setFilterWhite',
        value: function setFilterWhite(e) {
            e.preventDefault();
            this.props.setFilter({ belt: "White" });
        }
    }, {
        key: 'setFilterYellow',
        value: function setFilterYellow(e) {
            e.preventDefault();
            this.props.setFilter({ belt: "Yellow" });
        }
    }, {
        key: 'onChangeBelt',
        value: function onChangeBelt(e) {
            this.setState({ belt: e.target.value, changed: true });
        }
    }, {
        key: 'applyFilter',
        value: function applyFilter() {
            var newFilter = {};
            if (this.state.belt) newFilter.belt = this.state.belt;
            this.props.setFilter(newFilter);
        }
    }, {
        key: 'clearFilter',
        value: function clearFilter() {
            this.props.setFilter({});
        }
    }, {
        key: 'render',
        value: function render() {
            var Seperator = function Seperator() {
                return _react2.default.createElement(
                    'span',
                    null,
                    ' | '
                );
            };
            return _react2.default.createElement(
                'div',
                null,
                'Belt:',
                _react2.default.createElement(
                    'select',
                    { value: this.state.belt, onChange: this.onChangeBelt },
                    _react2.default.createElement(
                        'option',
                        { value: '' },
                        '(All Grades)'
                    ),
                    _react2.default.createElement(
                        'option',
                        { value: 'White' },
                        'White'
                    ),
                    _react2.default.createElement(
                        'option',
                        { value: 'Yellow' },
                        'Yellow'
                    ),
                    _react2.default.createElement(
                        'option',
                        { value: 'Orange' },
                        'Orange'
                    )
                ),
                _react2.default.createElement(
                    'button',
                    { onClick: this.clearFilter },
                    'Clear'
                ),
                _react2.default.createElement(
                    'button',
                    { onClick: this.resetFilter },
                    'Reset'
                ),
                _react2.default.createElement(
                    'button',
                    { onClick: this.applyFilter },
                    'Apply'
                )
            );
        }
    }]);

    return StudentFilter;
}(_react2.default.Component);

exports.default = StudentFilter;

StudentFilter.propTypes = {
    setFilter: _react2.default.PropTypes.func.isRequired,
    initFilter: _react2.default.PropTypes.object.isRequired
};

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(33);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StudentEdit = function (_React$Component) {
    _inherits(StudentEdit, _React$Component);

    function StudentEdit() {
        _classCallCheck(this, StudentEdit);

        var _this = _possibleConstructorReturn(this, (StudentEdit.__proto__ || Object.getPrototypeOf(StudentEdit)).call(this));

        _this.state = {
            student: {
                _id: '', name: '', belt: '', appearances: ''
            }
        };
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    _createClass(StudentEdit, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadData();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (prevProps.params.id !== this.props.params.id) {
                this.loadData();
            }
        }
    }, {
        key: 'onChange',
        value: function onChange(event) {
            var student = Object.assign({}, this.state.student);
            student[event.target.name] = event.target.value;
            this.setState(student);
        }
    }, {
        key: 'loadData',
        value: function loadData() {
            var _this2 = this;

            fetch('/api/students/' + this.props.params.id).then(function (response) {
                if (response.ok) {
                    response.json().then(function (student) {
                        _this2.setState({ student: student });
                    });
                } else {
                    resonse.json().then(function (error) {
                        alert('Dailed to fetch student: ' + error.message);
                    });
                }
            }).catch(function (err) {
                alert('Error in fetching data from server: ' + err.message);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var student = this.state.student;
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'form',
                    null,
                    'ID: ',
                    student._id,
                    _react2.default.createElement('br', null),
                    'Belt:',
                    _react2.default.createElement(
                        'select',
                        { name: 'belt', value: student.belt, onChange: this.onChange },
                        _react2.default.createElement(
                            'option',
                            { value: 'White' },
                            'White'
                        ),
                        _react2.default.createElement(
                            'option',
                            { value: 'Yellow' },
                            'Yellow'
                        ),
                        _react2.default.createElement(
                            'option',
                            { value: 'Orange' },
                            'Orange'
                        )
                    ),
                    'Name: ',
                    _react2.default.createElement('input', { name: 'name', value: student.name, onChange: this.onChange }),
                    _react2.default.createElement('br', null),
                    'Appearances: ',
                    _react2.default.createElement('input', { name: 'appearances', value: student.appearances, onChange: this.onChange }),
                    _react2.default.createElement(
                        'button',
                        { type: 'submit' },
                        'Submit'
                    ),
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { to: '/students' },
                        'Back to student list'
                    )
                )
            );
        }
    }]);

    return StudentEdit;
}(_react2.default.Component);

exports.default = StudentEdit;


StudentEdit.propTypes = {
    params: _react2.default.PropTypes.object.isRequired
};

/***/ })

},[115]);
//# sourceMappingURL=app.bundle.js.map