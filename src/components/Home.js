import React, { Component } from 'react';
import {Button, TextField} from '@material-ui/core';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import { Link } from 'react-router-dom';




class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            url: '',
            loading: false,
            links: []
        };
    }
    componentDidMount() {
        const token = localStorage.getItem('token')
        if (!token) {
            this.props.history.push('/signin')
        } else {
            this.fetchLinks();
        }
        
        
    }

    fetchLinks = async () => {
        try {
            let res =  await axios.get('https://damp-retreat-88900.herokuapp.com/api/v1/links/');
            this.setState({links: res.data.data});
        } catch(e){
            return null;
        }
    }
    handleOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };
    
    handleSubmit = async () => {
        this.setState({loading: true}, () => this.postLink());
        
    }

    async postLink() {
        const token = localStorage.getItem('token')
        const { url } = this.state;
        const headers = {
            'Authorization': token
        };
        let res;
        try {
            res = await axios.post(
                'https://damp-retreat-88900.herokuapp.com/api/v1/links/create', 
                {
                    url
                },
                {
                    headers
                }
                
            );
            
            this.setState({
                loading: false,
                open: false
            }, () => this.fetchLinks())

            
        } catch(e) {
            this.setState({loading: false, open: false});
            return null;

        }
    }
    renderLinks() {
        
        
        const { links } = this.state;
        if (links.length > 0) {
            return links.map((link,index) => {
                
                return (
                    <div key={index} id="link-container">
                        <div id="link-header">
                           <Link to={`/profile/${link.user_id}`}><p>{link.user_name}</p></Link>
                        </div>

                        <iframe id="video"
                            allowFullScreen="allowFullScreen"
                            src={`https://www.youtube.com/embed/${link.video_id}`}
                            title={index}
                        />
                        <div>
                            <a href={`${link.url}`}><p  id="video-link">
                                {link.url}
                            </p></a>
                        </div>

                    </div>
                );
            });
        }
    }

    showModal() {
        return (
            <Modal open={this.state.open} onClose={this.handleClose}>
                
                    <div className="modal">
                        <TextField 
                            value={this.state.url}
                            placeholder="Youtube Link"
                            label="Youtube Link"
                            style={{marginBottom: '5px'}}  
                            onChange={(e) => this.setState({url:e.target.value})}
                        />
                         <Button 
                            onClick={this.handleSubmit}
                            disabled={this.state.loading} 
                            style={{marginTop: '15px'}} 
                            variant="contained" 
                            color="primary">
                                Share
                        </Button>
                        
                    </div>
                
            </Modal>
        );
    }

    
    render() {
        console.log(this.state.links);
        return (
           
            <div className="App" style={{minHeight: window.screen.height, maxWidth: '614px', marginTop: '50px'}}>
                {this.showModal()}
                {this.renderLinks()}
                <Button onClick={this.handleOpen} variant="contained" color="primary" id="create-btn">
                    Share Youtube Link
                </Button>
            </div>
        );
    }
}

export default Home;