import React from "react";

class FileContainerItem extends React.Component {
   
    render() {
        return (
            <tr key={this.props.index}>
              <th scope="row"  style={{color: "white"}}>{this.props.index}</th>
              <td><p style={{fontFamily:'Roboto-Regular', color: "white"}}>{this.props.item.webkitRelativePath}</p></td>
              <td></td>
              <td></td>
            </tr>
        )
    }

}

export default FileContainerItem;