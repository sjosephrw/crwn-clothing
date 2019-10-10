import React from 'react';

import './custom-button.styles.scss';
import './custom-button.styles';
import { CustomButtonContainer } from './custom-button.styles';

const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => (
  <button
    className={`${inverted ? 'inverted' : ''} 
    ${isGoogleSignIn ? 'google-sign-in' : ''} 
    custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

// const CustomButton = ({children, ...props}) => (
//   <CustomButtonContainer {...props}>
//     {children}
//   </CustomButtonContainer>
// );

export default CustomButton;