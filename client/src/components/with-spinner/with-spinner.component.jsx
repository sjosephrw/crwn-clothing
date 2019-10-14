// import React from 'react';
// import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

//Higher Order Components (HOC) are functions that return other functional component
// const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
//     return isLoading ? (
//         //if the data has not been loaded render the spinner
//         <SpinnerOverlay>
//             <SpinnerContainer/>
//         </SpinnerOverlay>
//     ) 
//     //otherwise render the wrapped component with the other props
//     : <WrappedComponent { ...otherProps }/>;
// }


// //Higher Order Components (HOC) are functions that return other functional component
// export const WithSpinner = WrappedComponent => {
//     //making the above HOC more explicit 
//     const Spinner = ({ isLoading, ...otherProps }) => {
//         return isLoading ? (
//             //if the data has not been loaded render the spinner
//             <SpinnerOverlay>
//                 <SpinnerContainer/>
//             </SpinnerOverlay>
//         ) 
//         //otherwise render the wrapped component with the other props
//         : <WrappedComponent { ...otherProps }/>;
//     };
//     return Spinner;
// };

//explanation above
import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

const WithSpinner = WrappedComponent => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return Spinner;
};

export default WithSpinner;
