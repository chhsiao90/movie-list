import React, {Component} from "react";
import {Link} from "react-router";
import moment from "moment";
import app from "../config/app";
import Movies from "./Movies";
import "./style/Channel.css";

const channels = app.channels;

class Channel extends Component {
    componentWillReceiveProps(nextProps) {
    }

    lookIndexInChannels(channelNum) {
        return channels.findIndex((each) => each === channelNum);
    }

    prevChannelNum(currChannelNum) {
        const currIndex = this.lookIndexInChannels(currChannelNum);
        const nextIndex = currIndex < 1 ? channels.length - 1 : currIndex - 1;
        return channels[nextIndex];
    }

    nextChannelNum(currChannelNum) {
        const currIndex = this.lookIndexInChannels(currChannelNum);
        let nextIndex;
        if (currIndex === channels.length - 1 || currIndex === -1) nextIndex = 0;
        else nextIndex = currIndex + 1;
        return channels[nextIndex];
    }

    toDateIntervalArray(startDate, endDate) {
        let dateArray = [];
        let currDate = moment(startDate);
        while (endDate.isAfter(currDate)) {
            dateArray.push(currDate.format("YYYY-MM-DD"));
            currDate.add(1, "days");
        }
        return dateArray;
    }

    render() {
        const {channelNum, startDate, endDate} = this.props.params;

        const dateIntervalArray = toDateIntervalArray(moment(startDate), moment(endDate));
        const prev = this.prevChannelNum(channelNum);
        const prevPath = `/channel/${startDate}/${endDate}/${prev}`;
        const next = this.nextChannelNum(channelNum);
        const nextPath = `/channel/${startDate}/${endDate}/${next}`;
        return (
            <div className="Channel">
                <h3 className="ChannelTitle">{`Channel ${channelNum}`}</h3>
                <div className="ChannelContent">
                    <div className="SelectArrowContainer">
                        <div className="SelectArrow">
                            <Link to={prevPath}>Prev</Link>
                        </div>
                        <div className="SelectArrow">
                            <Link to={nextPath}>Next</Link>
                        </div>
                    </div>
                    <div className="MoviesContainer">
                        {dateIntervalArray.map((date) =>
                            <Movies date={date}
                                channelNum={channelNum}
                                key={date} />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Channel;
