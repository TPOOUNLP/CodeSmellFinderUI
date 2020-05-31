import React from 'react';
import "../styles/style.css"

export default class TextFileReader extends React.Component {
    constructor() {
        super();
    };

    componentDidMount() {
        this.showFile()
    }
    showFile = () => {
        if (this.props.file) {
            if (window.File && window.FileReader && window.FileList && window.Blob) {
                var preview = document.getElementById('show-text');
                var file = this.props.file
                var reader = new FileReader()

                reader.onload = function (event) {
                    preview.innerHTML = event.target.result;
                }

                reader.readAsText(file);

            } else {
                alert("Your browser is too old to support HTML5 File API");
            }
        }
    }

    render() {
        return (
            <div>
                <pre class="sombra" style={{ backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 5, color: "white" }} id="show-text"></pre>
            </div>
        );
    }
}