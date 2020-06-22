import React from 'react';
import "../styles/style.css"
import CodeSmellsService from "../services/CodeSmellsService";

export default class TextFileReader extends React.Component {

    componentDidMount() {
        this.showFile()
    }
    
    showFile = () => {
        if (this.props.file) {
            if (window.File && window.FileReader && window.FileList && window.Blob) {
                var preview = document.getElementById('show-text');
                var file = this.props.file
                var reader = new FileReader()

                reader.onload = (event) => {
                    // TO-DO: ver librería o estilos css para mostrar coloreado el código
                    let fileContent = CodeSmellsService.showDetectionsOnFile(event.target.result, this.props.detectionResults, this.props.detectors);
                    preview.innerHTML = fileContent;
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