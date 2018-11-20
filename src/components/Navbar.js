import React, { Component } from 'react';
import { AppBar } from '@material-ui/core';
class Navbar extends Component {
    render() {
        return (
            <div>
                <AppBar style={{height: '50px'}}/>
            </div>
        );
    }
}

export default Navbar;