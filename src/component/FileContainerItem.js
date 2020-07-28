import React from "react";
import Popup from "reactjs-popup";
import history from "./History";

const _localStyles = {
    textContainer: {
        width: "100%",
        flex: 1,
        position: "relative"
    },
    popUp: {
        backgroundColor: 'rgba(48,50,58,0.9)',
        width: "40%",
        borderRadius: 5,
        border: 0
    },
    button: {
        borderRadius: 5,
        background: 'rgb(207,74,74)',
        border: 0
    },
    icon: {
        width: 25,
        height: 25
    }
}

 //<TextFileReader file={this.props.item}/>
class FileContainerItem extends React.Component {

    

    renderModal() {
        let detections = this.props.detectionResults[this.props.item.path];
        return (
            <div>
            {   detections.map((detectionResult, key) =>
            <div style={_localStyles.textContainer}>
                {/* <strong>Detector:</strong><p>{detectionResult.name}</p>
                <strong>Relative Path:</strong><p>{detectionResult.relativePath}</p>
                <strong>Clase:</strong><p>{detectionResult.class}</p> */}
                <p><strong>Detecciones del Code Smell "{detectionResult.name}"</strong></p>
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
                <th scope="row" style={{ color: "white" }}>{this.props.index}</th>
                <td><p style={{ fontFamily: 'Roboto-Regular', color: "white" }}>{this.props.item.webkitRelativePath}</p></td>
                <td>{(!!detection) ?
                    (detection[this.props.item.path]) ? <img style={_localStyles.icon} alt="faild" src={require('../assets/fallo.png')} /> :
                        <img style={_localStyles.icon} alt="passed" src={require('../assets/ok.png')} /> : null}</td>
                <td>{(!!detection) ?
                    (detection[this.props.item.path]) ?
                        <Popup trigger={
                            <button style={_localStyles.button}> Ver mas</button>}
                            position="right bottom" arrow={false}
                            contentStyle={_localStyles.popUp}
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