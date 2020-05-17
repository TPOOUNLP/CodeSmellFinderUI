/* eslint-disable no-use-before-define */
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import AstService from "../services/AstService";

export default class Filter extends React.Component {

  constructor(props) {
      super();
      this.getDetectors();
      this.mock = true;
      this.detectors = [
        { title: "CSDetectorIdentifierTooLong" },
        { title: "CSDetectorRepeatedMethodBody" },
        { title: "CSDetectorTooManyLinesInMethod" },
        { title: "CSDetectorTooManyMethodParameters" },
        { title: "CSDetectorTooManyMethods" }
      ];
  }
  

  getDetectors() {
    if (!this.mock) {
    AstService.getAstToPath("/getDetectors").then((result) => {
        console.log(result)
        if (result && !!result.OrderedCollection) {
             this.setState({content: result});
        }
    });
    }
  }

  render() {
  return (
     
    <div style={{width: "100%"}} >
      <Autocomplete
        multiple
        id="tags-outlined"
        options={this.detectors}
        getOptionLabel={(option) => option.title}
        defaultValue={[this.detectors[0]]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Agregue detectores que desea aplicar al directorio"
            placeholder="Detectores"
          />
        )}
      />
    </div>
  );
}
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
