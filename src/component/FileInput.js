
import React from "react";
 
class FileInput extends React.Component {

    render() {
        return (
            <div>
                <span>
                    <input id="fileControl" type="file"
                        
                        name="myFile"
                        style={{borderRadius: 5, backgroundColor: 'rgb(157, 246, 253)'}}
                        webkitdirectory="true"
                        onChange={this.props.uploadFile} />
                </span>
            </div>
        )
    }

    componentWillUpdate(nexProps) {
        if (nexProps.refresh) {
            let input = document.getElementById("fileControl");
            input.value = ''
        }
    }
}

export default FileInput;
