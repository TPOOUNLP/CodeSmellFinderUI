import React from "react";
import Popup from "reactjs-popup";

const _localStyles = {
    textContainer: {
        width: "100%",
        flex: 1,
        position: "relative"
    },
    popUp: {
        backgroundColor: 'rgba(48,50,58,0.5)',
        width: "40%",
        borderRadius: 15
    },
    button: {
        borderRadius: 10,
        backgroundColor: 'rgba(48,50,58)'
    },
    icon: {
        width: 25,
        height: 25
    }
}
class FileContainerItem extends React.Component {

    renderModal() {
        let detection = this.props.detectionResults[this.props.item.path];
        return (
            <div style={_localStyles.textContainer}>
                <strong>Detector:</strong><p>{detection.name}</p>
                <strong>Path:</strong><p>{detection.path}</p>
                <strong>Clase:</strong><p>{detection.class}</p>
                <strong>Detections</strong><p>{detection.detections}</p>
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
                    (detection[this.props.item.path]) ? <img style={_localStyles.icon} src={require('../assets/fallo.png')} /> :
                        <img style={_localStyles.icon} src={require('../assets/ok.png')} /> : null}</td>
                <td>{(!!detection) ?
                    (detection[this.props.item.path]) ?
                        <Popup trigger={
                            <button style={_localStyles.button}> Ver mas</button>}
                            position="right center" arrow={false}
                            contentStyle={_localStyles.popUp}
                        >
                            {this.renderModal.bind(this)}
                        </Popup> : null
                    : null}</td>
            </tr>
        )
    }

}

export default FileContainerItem;