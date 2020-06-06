import React from "react";
import SideBar from "./SideBar";
import TextFileReader from "./TextFileReader";
import "../styles/style.css";

const _localStyles = { 
    mainContainer: {
        flex: 1,
        position: "relative",
        zIndex: 10,
        marginLeft: 100,
        display: "flex",
        paddingTop: "2%"
    },
    sideBar: {
        position: "fixed",
        width: "10%",
        height: "100%",
        zIndex: 10
    },
    file: {
        alignSelf: "center",
        marginBottom: "2%",
        backgroundColor: 'rgba(0,0,0,0.3)',
        marginTop: "5%",
        borderRadius: 5
    },
    pathContainer: {
        borderRadius: 5,
        backgroundColor: 'rgba(192,192,192,0.9)',
        alignContent: "center",
        borderWidth: 10,
        borderColor: "#ffffff",
        border: 1
    }
}

export default class Detail extends React.Component {
    render() {
        return (
            <div>
                <div class="bg-image"></div>
                <div style={_localStyles.sideBar}>
                    <SideBar history={this.props.history} />
                </div>
                <div style={_localStyles.mainContainer}>
                    <div style={{ flex: 1.5, paddingRight: "2%" }}>
                        <div class="sombra" style={_localStyles.pathContainer}><p style={{ color: "#ffffff" }}>PATH:{(this.props.location.state) ? this.props.location.state.file.path : null}</p>
                        </div>
                        <div style={_localStyles.file}>
                            <TextFileReader file={(this.props.location.state) ? this.props.location.state.file : null}
                                detectionResults={(this.props.location.state) ? this.props.location.state.detectionResults : null}></TextFileReader>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}