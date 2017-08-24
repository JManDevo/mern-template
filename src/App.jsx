import React from 'react';
import ReactDOM from 'react-dom';
import StudentList from './StudentList.jsx';
import StudentEdit from './StudentEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page not found</p>;


ReactDOM.render(<StudentList/>, contentNode);

if (module.hot) {
    module.hot.accept();
}