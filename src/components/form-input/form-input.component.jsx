import React from 'react';
import './form-input.styles.scss';

const FormInput = ({ handleChange, label, ...otherProps}) => (
    <div className='group'>
    {
        //destructure the otherProps
    }
        <input className='form-input' onChange={handleChange} {...otherProps}/>
        {   //otherProps.value.length if it is true then render the shrink class or render a balnk string
            //otherProps.value.length is true when the user starts typing something    
            label ? (<label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}></label>) : null//if there is a label then render it or render null
        }
    </div>
)

export default FormInput;