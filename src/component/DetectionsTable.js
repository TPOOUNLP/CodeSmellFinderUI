import React from "react";


class DetectionsTable extends React.Component {
   constructor(props) {
      super(props);
      debugger;
   }

   renderTableHeader() {
      if (this.props.detections.length) {
         let header = Object.keys(this.props.detections[0])
         return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
         })
      }
   }

   renderTableData() {
      if (this.props.detections.length) {
         return this.props.detections.map((detection, index) => {
            return (
               <tr key={index}>
                  <td>{detection.name}</td>
                  <td>{detection.path}</td>
                  <td>{detection.class}</td>
                  <td>{detection.detections}</td>
               </tr>
            )
         })
      }
   }

   render() {
      return (
         <div>
            <h1 id='title'>CODE SMELLS DETECTADOS: </h1>
            <table id='detections'>
               <tbody>
                  <tr>{ this.renderTableHeader() }</tr>
                  { this.renderTableData() }
               </tbody>
            </table>
         </div>
      )
   }
}

export default DetectionsTable;