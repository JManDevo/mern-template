import React from 'react';
import {Link} from 'react-router';
export default class StudentFilter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            belt: props.initFilter.belt || '',
            changed:false,
        };

        this.onChangeBelt = this.onChangeBelt.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.resetFilter = this.resetFilter.bind(this);
        this.clearFilter = this.clearFilter.bind(this);

    }

    componentWillReceiveProps(newProps) {
        this.setState({
            belt:newProps.initFilter.belt || '',
            changed:false,
        });
    }

    resetFilter() {
        this.setState({
            belt: this.props.initFilter.belt || '',
            changed: false,
        })
    }

    /*clearFilter(e){
        e.preventDefault();
        this.props.setFilter({});

    }*/

    setFilterWhite(e){
        e.preventDefault();
        this.props.setFilter({belt:"White"});
    }

    setFilterYellow(e){
        e.preventDefault();
        this.props.setFilter({belt:"Yellow"});
    }

    onChangeBelt(e) {
        this.setState({belt:e.target.value,changed:true});
    }

    applyFilter() {
        const newFilter = {};
        if (this.state.belt) newFilter.belt = this.state.belt;
        this.props.setFilter(newFilter);
    }

    clearFilter () {
        this.props.setFilter({});
    }

    render () {
        const Seperator = () => <span> | </span>;
        return (
            <div>
                Belt:
                <select value={this.state.belt} onChange={this.onChangeBelt}>
                    <option value="">(All Grades)</option>
                    <option value="White">White</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Orange">Orange</option>
                </select>


                <button onClick={this.clearFilter}>Clear</button>
                <button onClick={this.resetFilter}>Reset</button>
                <button onClick={this.applyFilter}>Apply</button>


            </div>
        );
    }
}
StudentFilter.propTypes = {
    setFilter:React.PropTypes.func.isRequired,
    initFilter: React.PropTypes.object.isRequired,
}