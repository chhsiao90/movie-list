import React, {Component} from "react";

class Block extends Component {
    render() {
        const blockClassName = this.props.block ? "Block-Enable" : "Block-Disable";
        const blockMessage = this.props.blockMessage || (<div></div>);
        return (
            <div className={blockClassName}>
                {blockMessage}
            </div>
        );
    }
}

export default Block;
