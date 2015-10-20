import React, {Component} from "react";
import "./style/Movies.css";

class Movies extends Component {
    render() {
        const {day, movies} = this.props;
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

export default Movies;
