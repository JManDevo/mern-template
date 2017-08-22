"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "form",
                    { name: "studentAdd", onSubmit: this.handleSubmit },
                    React.createElement("input", { type: "text", name: "name", placeholder: "Students Name" }),
                    React.createElement(
                        "select",
                        { name: "belt" },
                        React.createElement(
                            "option",
                            { value: "" },
                            "--- SELECT A GRADE ---"
                        ),
                        React.createElement(
                            "option",
                            { value: "White" },
                            "White"
                        ),
                        React.createElement(
                            "option",
                            { value: "Yellow" },
                            "Yellow"
                        ),
                        React.createElement(
                            "option",
                            { value: "Orange" },
                            "Orange"
                        )
                    ),
                    React.createElement("input", { type: "text", name: "appearances", placeholder: "Students Appearances" }),
                    React.createElement(
                        "button",
                        null,
                        "Add"
                    )
                )
            );
        }
    }]);

    return StudentAdd;
}(React.Component);

exports.default = StudentAdd;