import React, {Component} from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import "./style/App.css"

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <div className="AppContent">
                    <SearchBar />
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
