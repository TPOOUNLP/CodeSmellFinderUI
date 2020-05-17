
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/style.css"
import React from 'react'
import ReactDOM from 'react-dom'
import SideBar from "./component/SideBar";
import FileInput from "./component/FileInput";
import FilesContainer from "./component/FilesContainer";
import Filter from "./component/Filter";
import Spinner from "./component/Spinner";

const _localStyles = {
    sidebar: {
        position: "fixed",
        width: "10%",
        height: "100%",
        zIndex: 10 
    },
    generalContainer: {
        flex: 1,
        position: "relative",
        zIndex: 10,
        marginLeft: 100,
        display: "flex",
        paddingTop: "2%"
    },
    fileInput: {
        flex: 1,
        zIndex: 2,
        padding: "1%",
        position: "relative",
        background: 'rgb(207,74,74)',
        alignContent: "center",
        alignSelf: "center",
        textAlign: "center"
    },
    pathContainer: {
        borderRadius: 5,
        backgroundColor: 'rgba(192,192,192,0.9)',
        alignContent: "center",
        padding: "1%",
        borderWidth: 10,
        borderColor: "#ffffff",
        border: 1
    },
    filesContainer: {
        borderRadius: 5,
        alignContent: "center",
        backgroundColor: 'rgba(192,192,192,0.9)',
        padding: "1%",
        marginTop: "7%"
    },
    filterContainer: {
        alignSelf: "center",
        marginBottom: "2%",
        backgroundColor: 'rgba(0,0,0,0.3)',
        marginTop: "5%",
        borderRadius: 5
    },
    resultContainer: {
        marginTop: "10%",
        color: "#ffffff" 
    },
    pathText: {
        color: "white",
        fontFamily: "Roboto-Regular"
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.button = "Correr Dettectores";
        this.buttonLoading = "Corriendo detectores ...";
        this.pathDirectory = null;
        this.filters = []
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
        if (this.filters.length == 0) {
            alert("No se seleciono ningun Filtro para correr");
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

    onChangeFilter(event, value, reason) {
      this.filters = value;
    }

    render() {

        this.pathDirectory = (!!this.state.files && this.state.files !== [] && !!this.state.files[0]) ?
            this.removeLastDirectoryPartOf(this.state.files[0].path, this.state.files[0].webkitRelativePath.split("/")[0]) : null
        return (
            <div>
                <div class="bg-image"></div>
                <div style={_localStyles.sidebar}>
                    <SideBar />
                </div>
                <div style={_localStyles.fileInput}>
                    <FileInput uploadFile={(event) => this.uploadFile(event)} />
                </div>
                <div style={_localStyles.generalContainer}>

                    <div style={{ flex: 1.5, paddingRight: "2%" }}>

                        <div style={_localStyles.pathContainer} class="sombra" >
                            <b style={_localStyles.pathText}>Directorio: {this.pathDirectory}</b>
                        </div>

                        <div class="sombra" style={_localStyles.filterContainer} >
                            <Filter onChangeFilter={(event, value, reason) => this.onChangeFilter(event, value, reason)} />
                        </div>

                        <div class="sombra" style={_localStyles.filesContainer} >
                            <FilesContainer files={this.state.files} />
                        </div>
                    </div>

                    <div style={{ flex: 1 }}>

                        <div style={{ display: "flex" }}>
                            <button onClick={this.sendData.bind(this)} class="btn btn-success">{this.state.currentMessageButton}</button>
                            {this.state.showSpinner && (<Spinner />)}
                        </div>

                        <div style={_localStyles.resultContainer}>
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