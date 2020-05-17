import React from 'react';
import Loader from 'react-loader-spinner'

export default class Spinner extends React.Component {
   render() {
    return(
     <Loader
        type="Audio"
        color='rgb(207,74,74)'
        height={30}
        width={40}
        timeout={30000} //3 secs

     />
    );
   }
}