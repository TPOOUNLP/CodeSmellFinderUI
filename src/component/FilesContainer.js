import React from "react";
import FlatList from 'flatlist-react';
import FilesContainerItem from "./FileContainerItem";

class FilesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }

    renderItem(item, index) {
        return (
            <FilesContainerItem item={item} index={index} />
        );
    }

    render() {
        return (
            <div>
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col" style={{color: "white"}}>#</th>
                            <th scope="col" style={{color: "white"}}>File</th>
                            <th scope="col" style={{color: "white"}}>Run</th>
                            <th scope="col" style={{color: "white"}}>Cs</th>
                        </tr>
                    </thead>
                    <tbody>
                        <FlatList list={(!!this.props.files) ? this.props.files : []} renderItem={this.renderItem.bind(this)} />
                    </tbody>
                </table>
            </div>
        )
    }
}

export default FilesContainer;