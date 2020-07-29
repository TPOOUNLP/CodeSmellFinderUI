import React from "react";
import SideBar from "./SideBar";
import TextFileReader from "./TextFileReader";
import "../styles/style.css";
import { deatilComponentStyle } from "../styles/generalStyles"
import { dictionaries } from "../Utils/Dictionary";
export default class Detail extends React.Component {
    render() {
        return (
            <div>
                <div class="bg-image"></div>
                <div style={deatilComponentStyle.sideBar}>
                    <SideBar history={this.props.history} />
                    <button onclick="window.history.back();">Volver</button>
                </div>
                <div style={deatilComponentStyle.mainContainer}>
                    <div style={{ flex: 1.5, paddingRight: "2%" }}>
                        <div class="sombra" style={deatilComponentStyle.pathContainer}><p style={{ color: "black" }}>{dictionaries.spanish.PATH}{(this.props.location.state) ? this.props.location.state.file.path : null}</p>
                        </div>
                        <div style={deatilComponentStyle.file}>
                            <TextFileReader file={(this.props.location.state) ? this.props.location.state.file : null}
                                detectionResults={(this.props.location.state) ? this.props.location.state.detectionResults : null}
                                detectors={(this.props.location.state) ? this.props.location.state.detectors : null}></TextFileReader>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}