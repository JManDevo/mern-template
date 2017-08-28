import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, Redirect, browserHistory, withRouter, IndexRoute, IndexRedirect} from 'react-router';
import StudentList from './StudentList.jsx';
import StudentEdit from './StudentEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page not found</p>;
const App = (props) => (
    <div>
        <div className="header">
            <h1>Students</h1>
        </div>
        <div className="contents">
            {props.children}
        </div>
        <div className="footer">
            Copyright (c) Joseph Man
        </div>
    </div>
)

App.propTypes = {
   children: React.PropTypes.object.isRequired,
}

const RoutedApp = () => (
    <Router history={browserHistory}>

        <Route path ="/" component={App}>
            <IndexRedirect to="/students" />
            <Route path="/students" component={withRouter(StudentList)}/>
            <Route path="/students/:id" component={StudentEdit}/>
            <Route path="*" component={NoMatch}/>
        </Route>
    </Router>
);
ReactDOM.render(<RoutedApp/>, contentNode);

if (module.hot) {
    module.hot.accept();
}