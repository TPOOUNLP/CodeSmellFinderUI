import React from "react";
import Popup from "reactjs-popup";
import history from "./History";
import { fileContainerItemStyle } from "../styles/generalStyles";
import { dictionaries } from "../Utils/Dictionary";

class FileContainerItem extends React.Component {
    renderModal() {
        let detections = this.props.detectionResults[this.props.item.path];
        return (
            <div>
            {   detections.map((detectionResult, key) =>
            <div style={fileContainerItemStyle.textContainer}>
                <p><strong>{dictionaries.spanish.DETECTION_CODE_SMELL}{detectionResult.name}"</strong></p>
                    {   detectionResult.detections.map((aDetectionMessage, key) =>
                        <p>- {aDetectionMessage}</p>
                        )
                    }
            </div>
            )}
            <div>
                <button  onClick={() => history.push({ pathname: '/detail' ,  state: { file: this.props.item, detectionResults: detections, detectors: this.props.detectors }}) } class="btn btn-warning"> ver correciones en detalle</button>
            </div>
            </div>
        )
    }

    render() {
        let detection = this.props.detectionResults;
        return (
            <tr key={this.props.index}>
                <th scope="row" style={fileContainerItemStyle.column}>{this.props.index}</th>
                <td><p style={fileContainerItemStyle.row}>{this.props.item.webkitRelativePath}</p></td>
                <td>{(!!detection) ?
                    (detection[this.props.item.path]) ? <img style={fileContainerItemStyle.icon} alt="faild" src={require('../assets/fallo.png')} /> :
                        <img style={fileContainerItemStyle.icon} alt="passed" src={require('../assets/ok.png')} /> : null}</td>
                <td>{(!!detection) ?
                    (detection[this.props.item.path]) ?
                        <Popup trigger={
                            <button style={fileContainerItemStyle.button}>{dictionaries.spanish.SEE_MORE}</button>}
                            position="right bottom" arrow={false}
                            contentStyle={fileContainerItemStyle.popUp}
                            overlayStyle={{backgroundColor: "rgba(0,0,0,0.2)"}}
                        >
                            {this.renderModal.bind(this)}
                        </Popup> : null
                    : null}</td>
            </tr>
        )
    }

}

export default FileContainerItem;