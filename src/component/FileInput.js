
import React from "react";
 
class FileInput extends React.Component {
    constructor(props) {
      super(props)
     
    }

    render() {
        return (
            <div>
                <span>
                    <input type="file"
                        name="myFile"
                        style={{borderRadius: 5, backgroundColor: 'rgb(157, 246, 253)'}}
                        webkitdirectory="true"
                        onChange={this.props.uploadFile} />
                </span>
            </div>
        )
    }
}

export default FileInput;
