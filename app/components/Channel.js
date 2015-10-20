import React, {Component} from "react";
import {Link} from "react-router";
import Transmit from "react-transmit";
import moment from "moment";
import app from "../config/app";
import Movies from "./Movies";

const channels = app.channels;

class Channel extends Component {
    componentWillMount() {
        const {channelNum, startDate, endDate} = this.props.params;
        const {enableBlock, disableBlock} = this.props;
        enableBlock();
        this.props.transmit.forceFetch({
            channelNum,
            dates: this.toDateIntervalArray(moment(startDate), moment(endDate))
        }).then(() => disableBlock());
    }

    componentWillReceiveProps(nextProps) {
        const {channelNum, startDate, endDate} = this.props.params;
        const {enableBlock, disableBlock} = this.props;
        const nextChannelNum = nextProps.params.channelNum;
        const nextStartDate = nextProps.params.startDate;
        const nextEndDate = nextProps.params.endDate;
        if (nextChannelNum !== channelNum) {
            enableBlock();
            this.props.transmit.forceFetch({
                channelNum: nextChannelNum,
                dates: this.toDateIntervalArray(moment(nextStartDate), moment(nextEndDate))
            }).then(() => disableBlock());
        }
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
        const {channelNum, startDate, endDate } = this.props.params;
        const {moviesList, enableBlock, disableBlock} = this.props;

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
                        {moviesList.map((movies) =>
                            <Movies movies={movies}
                                key={movies.date} />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Transmit.createContainer(Channel, {
    initialVariables: {
        dates: []
    },
    fragments: {
        moviesList({channelNum, dates}) {
            return Promise.all(
                dates.map((date) => Movies.getFragment("movies", {channelNum, date}))
            );
        }
    }
});
