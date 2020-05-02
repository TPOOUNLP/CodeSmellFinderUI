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
            <FilesContainerItem item={item} index={index}/>
        );
      }

    render() {
        return (
            <div>
                <ul className="list-group">
                    <FlatList list={(!!this.props.files)? this.props.files : []} renderItem={this.renderItem.bind(this)} />
                </ul>
            </div>
        )
    }
}

export default FilesContainer;