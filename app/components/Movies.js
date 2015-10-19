import React, {Component} from "react";
import "./style/Movies.css";

class MoviesInDay extends Component {
    render() {
        const {day, movies} = this.props;
        return (
            <div className="Movies">
                <div className="DayTitle">{day}</div>
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

export default MoviesInDay;
