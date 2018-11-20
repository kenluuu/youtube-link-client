import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';
class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false
        }
    }

    handleChange = (key,value) => {
        
        this.setState({[key]: value});
    }

    handleSumbit = async () => {
        
        const { email, password } = this.state;
        try {
            let res = await axios.post('https://damp-retreat-88900.herokuapp.com/api/v1/users/signin', {
                
                email,
                password,
                
            });
            
            let token = res.data.access_token;
            console.log(token);
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
                    disabled={this.state.loading} 
                    style={{marginTop: '15px'}} 
                    variant="contained" 
                    color="primary"
                    onClick={this.handleSumbit}
                >
                    Submit
                </Button>
            </div>
        );
    }
}

export default Signin;