import React, {Component} from "react";
import {Link} from "react-router";
import app from "../config/app";
import MovieList from "../data/MovieList";
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

    render() {
        const {channelNum, startDate, endDate} = this.props.params;
        const moviesInChannel = MovieList[channelNum] || [];

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
                        {moviesInChannel.map((movies) =>
                            <Movies {...movies}
                               key={movies.day} />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Channel;
