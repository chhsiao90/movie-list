import React, {Component} from "react";

class Block extends Component {
    render() {
        const blockClassName = this.props.block ? "Block-Enable" : "Block-Disable";
        return (
            <div className={blockClassName}>
            </div>
        );
    }
}

export default Block;
