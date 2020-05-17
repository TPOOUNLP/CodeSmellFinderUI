
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ReactDOM from 'react-dom'
import SideBar from "./component/SideBar";
import FileInput from "./component/FileInput";
import FilesContainer from "./component/FilesContainer";
import Filter from "./component/Filter";
import Spinner from "./component/Spinner";

const _localStyles = {
    generalContainer: {
        flex: 1,
        marginLeft: 100,
        display: "flex",
        paddingTop: "2%",
    },
    fileInput: {
        flex: 1,
        background: 'rgb(207,74,74)',
        alignContent: "center",
        alignSelf: "center",
        textAlign: "center",
        padding: "1%"
    },
    pathContainer: {
        borderRadius: 5,
        alignContent: "center",
        padding: "1%",

    },
    filesContainer: {
        borderRadius: 5,
        alignContent: "center",
        padding: "1%"
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.button = "Correr Dettectores";
        this.buttonLoading = "Corriendo detectores ...";
        this.pathDirectory = null;
        this.state = {
            content: null,
            files: [],
            showSpinner: false,
            currentMessageButton: "Correr Dettectores"
        }
    }

    //TODO move this to crresponding file
    chechData() {
        let success = true
        if (this.pathDirectory == null) {
            alert("No se seleciono ningun Directorio para correr los filtros");
            success = false;
        }
        return success; 
    }

    sendData() {
        if (this.chechData()) {
            //make call to pharo
            this.setState({
                showSpinner: !this.state.showSpinner,
                currentMessageButton: (this.state.currentMessageButton == this.button) ? this.buttonLoading : this.button
            });
        }
    }

    uploadFile(event) {
        this.setState({ files: event.target.files });
    }

    removeLastDirectoryPartOf(path, direcory) {
        let newPath = path.split('/')
        let last = newPath.pop()
        while (last != direcory) {
            last = newPath.pop();
        };
        newPath.push(last)
        return (newPath.join('/'));
    }

    render() {

        this.pathDirectory = (!!this.state.files && this.state.files !== [] && !!this.state.files[0]) ?
            this.removeLastDirectoryPartOf(this.state.files[0].path, this.state.files[0].webkitRelativePath.split("/")[0]) : null
        return (
            <div>
                <div style={{ position: "fixed", width: "10%", height: "100%", zIndex: 10 }}>
                    <SideBar />
                </div>
                <div style={_localStyles.fileInput}>
                    <FileInput uploadFile={(event) => this.uploadFile(event)} />
                </div>
                <div style={_localStyles.generalContainer}>
                    <div style={{ flex: 1.5, paddingRight: "2%" }}>
                        <div className="shadow p-3 mb-5 bg-white rounded" style={_localStyles.pathContainer} >
                            <b style={{ color: "black" }}>Directorio: {this.pathDirectory}</b>
                        </div>
                        <div style={{ alignSelf: "center", paddingBottom: "2%" }}>
                            <Filter />
                        </div>
                        <div style={_localStyles.filesContainer} className="shadow p-3 mb-5 bg-white rounded">
                            <FilesContainer files={this.state.files} />
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: "flex" }}>
                            <button onClick={this.sendData.bind(this)} class="btn btn-success">{this.state.currentMessageButton}</button>
                            {this.state.showSpinner && (<Spinner />)}
                        </div>
                        <div style={{ paddingTop: 60 }}>
                            <h6>Resultado total:</h6>
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
        return (nextState.content !== this.state.content ||
            nextState.files !== this.state.files ||
            this.state.showSpinner != nextState.showSpinner)
    }
}

/**
 * 
 */
const domContainer = document.querySelector('#main-container');
ReactDOM.render((<App />), domContainer);