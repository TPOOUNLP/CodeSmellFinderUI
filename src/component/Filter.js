
import "../styles/style.css"
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import AstService from "../services/AstService";
import { dictionaries } from "../Utils/Dictionary";
export default class Filter extends React.Component {

  constructor(props) {
      super();
      this.getDetectors();
      this.state= {
        detectors: []
    }
  }
  
  getDetectors() {
    AstService.getAstToPath("/detectors").then((result) => {
        console.log(result)
        if (result) {
             this.setState({detectors: result});
        }
    });
  }

  render() {
  return (
     
    <div style={{width: "100%"}} >
      <Autocomplete
        multiple
        id="tags-outlined"
        options={this.state.detectors}
        classes={{
          listbox: 'listbox',
          inputRoot: 'listbox'
        }} 
        getOptionLabel={(option) => option.title}
        onChange={(event, value, reason) =>  {
          this.props.onChangeFilter(event, value, reason)
        }}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={<strong style={{color: "black"}}>{dictionaries.spanish.ADD_DETECTORS}</strong>}
            placeholder={dictionaries.spanish.DETECTORS}
          />
        )}
      />
    </div>
  );
}
}