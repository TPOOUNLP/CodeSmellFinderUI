import React from "react";

class FileContainerItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <li class="list-group-item" key={this.props.index}>
              <button><b>{this.props.item.name}</b></button>
            </li>
        )
    }

}

export default FileContainerItem;