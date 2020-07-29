import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/style.css"
import React from 'react'
import ReactDOM from 'react-dom'
import SideBar from "./SideBar";
import FileInput from "./FileInput";
import FilesContainer from "./FilesContainer";
import Filter from "./Filter";
import Spinner from "./Spinner";
import AstService from "../services/AstService";
import { homeStyle } from "../styles/generalStyles";
import { dictionaries } from "../Utils/Dictionary";
import { alertDictionary } from "../Utils/AlertDictionary";
import { removeLastDirectoryPartOf } from "../Utils/GenearlFunction";
export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.button = dictionaries.spanish.RUN_DETECTOR;
        this.buttonLoading = dictionaries.spanish.RUNING_DETECTORS;
        this.pathDirectory = null;
        this.filters = []
        this.state = {
            files: [],
            showSpinner: false,
            currentMessageButton: dictionaries.spanish.RUN_DETECTOR,
            detectionResults: null,
            refresh: false
        }
    }

    clear() {
        this.setState({
            files: [],
            showSpinner: false,
            currentMessageButton: dictionaries.spanish.RUN_DETECTOR,
            detectionResults: null,
            refresh: true
        })
        this.filters = []
    }

    chechData() {
        let success = true
        if (this.pathDirectory == null) {
            alert(alertDictionary.home.EMPTY_DIRECTORY);
            success = false;
        }
        if (this.filters.length === 0) {
            alert(alertDictionary.home.EMPTY_FILTER);
            success = false;
        }
        return success;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async sendData() {
        if (this.chechData()) {
            this.setState({
                showSpinner: true,
                currentMessageButton: this.buttonLoading
            });
            let data = {
                directory: this.pathDirectory,
                filters: this.filters
            }
            await this.sleep(4000);
            AstService.postAstToPath("/detect", data).then((result) => {

                let jsonData = AstService.processResults(result, this.pathDirectory);
                this.setState({
                    showSpinner: false,
                    currentMessageButton: this.button,
                    detectionResults: jsonData
                });
            });

        }
    }

    uploadFile(event) {
        this.setState({ files: event.target.files , refresh: false});
    }

    onChangeFilter(event, value, reason) {
        this.filters = value;
    }

    render() {
        this.pathDirectory = (!!this.state.files && this.state.files !== [] && !!this.state.files[0]) ?
            removeLastDirectoryPartOf(this.state.files[0].path, this.state.files[0].webkitRelativePath.split("/")[0]) : null
        return (
            <div>
                <div class="bg-image"></div>
                <div style={homeStyle.sidebar}>
                    <SideBar />
                </div>
                <div style={homeStyle.fileInput}>
                    <FileInput refresh={this.state.refresh} uploadFile={(event) => this.uploadFile(event)} />
                </div>
                <div style={homeStyle.generalContainer}>
                    <div style={{ flex: 1.5, paddingRight: "2%" }}>
                        <div style={homeStyle.pathContainer} class="sombra" >
                            <b style={homeStyle.pathText}>{dictionaries.spanish.DIRECTORY}{this.pathDirectory}</b>
                        </div>
                        <div class="sombra" style={homeStyle.filterContainer} >
                            <Filter onChangeFilter={(event, value, reason) => this.onChangeFilter(event, value, reason)} />
                        </div>
                        <div class="sombra" style={homeStyle.filesContainer} >
                            <FilesContainer history={this.props.history} files={this.state.files} detectionResults={this.state.detectionResults} detectors={this.filters}/>
                        </div>
                    </div>
                    <div style={{ flex: 1 , display: "inline-block"}}>
                        <div style={homeStyle.buttonFilter}>
                            <button onClick={this.sendData.bind(this)} class="btn btn-success">{this.state.currentMessageButton}</button>
                            
                        </div>
                        <div style={homeStyle.buttonFilter}>
                        {this.state.showSpinner && (<Spinner />)}
                        </div>
                        <div style={homeStyle.buttonClear}>
                            <button onClick={this.clear.bind(this)} class="btn btn-success">{dictionaries.spanish.CLEAR_ALL}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    /**
     * 
     * @param {*} nextState 
     * @param {*} nextProps 
     */
    shouldComponentUpdate(nextState, nextProps) {
        return (nextState.detectionResults !== this.state.detectionResults ||
            nextState.files !== this.state.files ||
            this.state.showSpinner !== nextState.showSpinner)
    }
}

/**
 * 
 */
const domContainer = document.querySelector('#main-container');
ReactDOM.render((<Home />), domContainer);