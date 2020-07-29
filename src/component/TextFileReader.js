import React from 'react';
import "../styles/style.css";
import CodeSmellsService from "../services/CodeSmellsService";
import { alertDictionary } from "../Utils/AlertDictionary";

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
                alert(alertDictionary.browser.NOT_SUPPORT);
            }
        }
    }

    render() {
        return (
            <div>
                <pre class="sombra" style={{ backgroundColor: 'rgba(255,255,255,1)', borderRadius: 5, color: "black" }} id="show-text"></pre>
            </div>
        );
    }
}