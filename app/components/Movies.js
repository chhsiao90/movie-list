import React, {Component} from "react";
import Transmit from "react-transmit";
import {retrieveMovies} from "../api/MovieRetriever";

class Movies extends Component {
    render() {
        const {date, list} = this.props.movies;
        return (
            <div className="Movies">
                <h3 className="DayTitle">{date}</h3>
                <table>
                    <tbody>
                        {list.map((movie) => (
                                <tr key={movie.playTime}>
                                    <td>{movie.playTime}</td>
                                    <td>{movie.movieName}</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Transmit.createContainer(Movies, {
    fragments: {
        movies({channelNum, date}) {
            if (!channelNum || !date) {
                return Promise.resolve([]);
            }
            return retrieveMovies(channelNum, date)
                .then(function(list) {
                    return {
                        list,
                        channelNum,
                        date
                    };
            });
        }
    }
});
