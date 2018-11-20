import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            confirmPassword: '',
            loading: false
        }
    }

    handleChange = (key,value) => {
        
        this.setState({[key]: value});
    }

    handleSubmit = () => {
        const { password, confirmPassword } = this.state;
        if (password === confirmPassword) {
            this.setState({ loading: true}, () => {
                this.registerUser();
            })
        } else {
            alert('password must match');
        }
    }

    async registerUser() {
        console.log('register')
        const { email, password, name } = this.state;
        try {
            let res = await axios.post('https://damp-retreat-88900.herokuapp.com/api/v1/users/create', {
                
                email,
                password,
                name
                
            });
            let token = res.data.access_token;
            await localStorage.setItem('token', token);
            this.props.history.push('/');
            

        } catch(e) {
            
            alert(e);
            this.setState({loading: false});
        }
        
    }
    render() {
        return (
            <div id="signin-container">
                <TextField 
                    style={{marginBottom: '5px'}}  
                    label="Full Name" placeholder="Full Name" 
                    value={this.state.name} 
                    onChange={(e) => this.handleChange('name', e.target.value)}
                />
                <TextField 
                    style={{marginBottom: '5px'}}  
                    label="Email" placeholder="Email" 
                    value={this.state.email} 
                    onChange={(e) => this.handleChange('email', e.target.value)}
                />
                <TextField 
                    type="password" style={{marginBottom: '5px'}}  
                    label="Password" 
                    placeholder="Password"
                    value={this.state.password}
                    onChange={(e) => this.handleChange('password', e.target.value)}
                />
                 <TextField 
                    type="password" style={{marginBottom: '5px'}}  
                    label="Confirm Password" 
                    placeholder="Confirm Password"
                    value={this.state.confirmPassword}
                    onChange={(e) => this.handleChange('confirmPassword', e.target.value)}
                />
                <Button 
                    disabled={this.state.loading} 
                    color="primary" 
                    onClick={() => this.props.history.push('/signin')}
                >
                    Signin
                </Button>
                
                <Button 
                    disabled={this.state.loading}  
                    color="primary" 
                    onClick={() => this.props.history.push('/register')}
                >
                    Register
                </Button>
                <Button 
                    onClick={this.handleSubmit}
                    disabled={this.state.loading} 
                    style={{marginTop: '15px'}} 
                    variant="contained" 
                    color="primary">
                        Submit
                </Button>
            </div>
        );
        
       
    }
}

export default Register;