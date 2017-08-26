import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, Redirect, hashHistory} from 'react-router';
import StudentList from './StudentList.jsx';
import StudentEdit from './StudentEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page not found</p>;
const RoutedApp = () => (
    <Router history={hashHistory}>
        <Redirect from="/" to="/students"/>
        <Route path="/students" component={StudentList}/>
        <Route path="/students/:id" component={StudentEdit}/>
        <Route path="*" component={NoMatch}/>
    </Router>
);
ReactDOM.render(<RoutedApp/>, contentNode);

if (module.hot) {
    module.hot.accept();
}