import React from "react";

class FileContainerItem extends React.Component {
   
    render() {
        return (
            <li class="list-group-item" key={this.props.index}>
              <b>{this.props.item.webkitRelativePath}</b>
            </li>
        )
    }

}

export default FileContainerItem;