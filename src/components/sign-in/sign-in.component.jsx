import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle } from '../../firebase/firebase.utils';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

class SignIn extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }
    handleSubmit = async event => {
        event.preventDefault();
    
        const { email, password } = this.state;
    
        try {
            //signInWithEmailAndPassword built in to fire base
          await auth.signInWithEmailAndPassword(
            email,
            password
          );
            

          this.setState({//clear the form fields
            email: '',
            password: ''
          });
        } catch (error) {
          console.log(error);
        }
    
        console.log('Submit')
      };


      handleChange = event => {
        const { value, name } = event.target;
    
        this.setState({ [name]: value });
      };

    render(){
       return (
        <div className='sign-in'>
            <h2>I already have an account.</h2>
            <span>Sign in with your email and password.</span>
            <form onSubmit={this.handleSubmit}>
                <FormInput type="email" name="email" handleChange={this.handleChange} value={this.state.email} label='email' required/>
                <FormInput type="password" name="password" handleChange={this.handleChange} value={this.state.password} label='password' required/>            
                <CustomButton
                type='submit'
                >Sign In</CustomButton>
                <CustomButton 
                onClick={signInWithGoogle}
                isGoogleSignIn
                >Sign In with Google</CustomButton>
            </form>
        </div>
       )
    }

}

export default SignIn;