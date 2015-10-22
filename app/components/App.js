import React, {Component} from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            block: false
        };
    }

    enableBlock() {
        console.log("enableBlock");
        this.setState({
            block: true
        });
    }

    disableBlock() {
        console.log("disableBlock");
        this.setState({
            block: false
        });
    }

    render() {
        return (
            <div className="App">
                <Header />
                <div className="AppContent">
                    <SearchBar />
                    {this.props.children
                        && React.cloneElement(this.props.children, {
                            enableBlock: this.enableBlock.bind(this),
                            disableBlock: this.disableBlock.bind(this)
                    })}
                </div>
            </div>
        );
    }
}

export default App;
