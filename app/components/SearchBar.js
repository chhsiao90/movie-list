import React, {Component} from "react";
import {Link} from "react-router";
import DatePicker from "react-datepicker";
import moment from "moment";
import util from "util";
import app from "../config/app";
import "./style/react-datepicker.css";
import "./style/SearchBar.css";

const defaultChannel = app.channels[0];
const dateFormat = app.dateFormat;

function toPath(startDate, endDate) {
    return util.format("/channel/%s/%s/%s", startDate.format(dateFormat), endDate.format(dateFormat), defaultChannel);
}

class SearchBar extends Component {
    constructor(props) {
        super(props);
        const startDate = moment();
        const endDate = moment().add(5, "days");
        this.state = {
            startDate,
            endDate,
            path: toPath(startDate, endDate)
        };
    }

    onStartDateChanged(startDate) {
        const path = toPath(startDate, this.state.endDate);
        this.setState({
            startDate,
            path
        });
    }

    onEndDateChanged(endDate) {
        const path = toPath(this.state.startDate, endDate);
        this.setState({
            endDate,
            path
        });
    }

    render() {
        return (
            <div className="SearchBar">
                <h3 className="InputTitle">Select Date Range:</h3>
                <div className="SearchBarContent">
                    <div className="SearchBarComponent">
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.onStartDateChanged} />
                        </div>
                    <div className="SearchBarComponent">
                        <DatePicker
                            selected={this.state.endDate}
                            onChange={this.onEndDateChanged} />
                    </div>
                    <div className="SearchBarComponent">
                        <Link className="SubmitBtn" to={this.state.path}>
                            Submit
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBar;
