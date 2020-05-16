
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ReactDOM from 'react-dom'
import SideBar from "./component/SideBar";
import AstService from "./services/AstService";
import FileInput from "./component/FileInput";
import FilesContainer from "./component/FilesContainer";

const _localStyles = {
    generalContainer: {
        width: "100%",
        alignContent: "center" 
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
        marginTop: "1%",
        marginLeft: "8%",
        width: "40%",
        borderRadius: 5,
        alignContent: "center",
        padding: "1%",
        
    },
    filesContainer: {
        marginLeft: "8%",
        width: "40%",
        borderRadius: 5,
        alignContent: "center",
        padding: "1%"
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            content: null,
            files: []
        }
    }
    
    getContent() {
        AstService.getAstToPath("/").then((result) => {
            console.log(result)
            if (result && !!result.text) {
                 this.setState({content: result.text});
            }
        });
    }

    uploadFile(event) {
        this.setState({ files: event.target.files });
    }

     removeLastDirectoryPartOf(path, direcory){      
        let newPath = path.split('/')
        let last = newPath.pop()
        while (last != direcory) {
            last = newPath.pop();
        };
        newPath.push(last)
        return(newPath.join('/'));
    }

    render() {
        let pathDirectory = (!!this.state.files && this.state.files !== [] && !!this.state.files[0])? 
        this.removeLastDirectoryPartOf(this.state.files[0].path, this.state.files[0].webkitRelativePath.split("/")[0]) : null 
        return (
            <div>
                <div style={{position: "fixed", width: "10%" , height: "100%", zIndex: 10}}>
                    <SideBar />
                </div>
                <div style={_localStyles.generalContainer}>
                    <div style={_localStyles.fileInput}>
                        <FileInput uploadFile={(event) => this.uploadFile(event)}/>
                    </div>
                    <div className="shadow p-3 mb-5 bg-white rounded" style={_localStyles.pathContainer} >
                        <b style={{color: "black"}}>Directorio: {pathDirectory}</b>
                    </div>
                    <div style={_localStyles.filesContainer} className="shadow p-3 mb-5 bg-white rounded">
                        <FilesContainer files={this.state.files} />
                    </div>
                    <div style={_localStyles.filesContainer}>
                        <button onClick={this.getContent.bind(this)}>Test</button>
                    </div>
                    <div style={_localStyles.filesContainer}>
                        <p>content: {this.state.content}</p>
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
        return (nextState.content !== this.state.content || nextState.files !== this.state.files)
    }
}

/**
 * 
 */
const domContainer = document.querySelector('#main-container');
ReactDOM.render((<App/>), domContainer);