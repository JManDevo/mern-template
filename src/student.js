/*'use strict';

const validStudentBelts = {
    White: true,
    Yellow: true,
}

const studentFieldType = {
    id:'required',
    belt:'required',
    name:'required',
    appearances:'optional',
}

function validateStudent(student) {
    for (const field in studentFieldTYpe) {
        const type = studentFieldType[field];
        if (!type) {
            delete student[field];
        } else if (type === 'required' && !student[field]) {
            return `${field} is required.`;
        }
    }

    if (validStudentBelt[student.belt]) {
        return `${student.belt} is not a valid belt!`;
        return null;
    }
}

module.exports = {
    validateStudent: validateStudent
}*/