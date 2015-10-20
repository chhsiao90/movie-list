import React, {Component} from "react";
import Transmit from "react-transmit";
import {retrieveMovies} from "../api/MovieRetriever";
import "./style/Movies.css";

class Movies extends Component {
    render() {
        const {movies} = this.props;
        return (
            <div className="Movies">
                <h3 className="DayTitle">{day}</h3>
                <table>
                    <tbody>
                        {movies.map((movie) => (
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
        movies({date, channelNum}) {
            return retrieveMovies(channelNum, date);
        }
    }
});
