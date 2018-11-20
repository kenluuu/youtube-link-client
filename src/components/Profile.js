import React, { Component } from 'react';
import axios from 'axios';
import {Button } from '@material-ui/core';
import Modal from 'react-responsive-modal';
import { Link } from 'react-router-dom';


const profilePic = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"; 


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            showFollower: false,
            showFollowing: false
        };
    }
    componentDidMount() {
        const token = localStorage.getItem('token');
        if (!token) {
            this.props.history.push('/signin')
        } else {
            this.fetchData();
        }
        
    }

    handleClose(input) {
        console.log(input)
        this.setState({ [input]: false });
    };
    getProfileId() {
        const id = this.props.match.params.id;
        return id;
    }
    fetchData = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': token
        };
        try {
            let res = await axios.get(
                `https://damp-retreat-88900.herokuapp.com/api/v1/users/show/${this.getProfileId()}`,
                { headers }
            );
            this.setState({ data: res.data.data})
        } catch(e) {
            return null;
        }
    }
    logout = async () => {
        await localStorage.removeItem('token');
        this.props.history.push('/signin');
    }

    renderButton() {
        let id = this.getProfileId();
        id = parseInt(id);
        const { current_user, is_following } = this.state.data;
        if (id === current_user.id) {
            
            return (
                <Button
                    style={{marginBottom: '15px'}}
                    variant="contained" 
                    color="secondary"
                    onClick={this.logout}
                >
                    Logout
                </Button>
            )
        } else if (is_following) {
            return (
                <Button
                    style={{marginBottom: '15px'}}
                    variant="contained" 
                    color="secondary"
                    onClick={() => this.handleFollow('unfollow')}
                >
                    Unfollow
                </Button>
            )
        } else {
            return (
                <Button
                style={{marginBottom: '15px'}}
                variant="contained" 
                color="secondary"
                onClick={() => this.handleFollow('follow')}
            >
                Follow
            </Button>
            );
        }

    }

    handleFollow = async (input) => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': token
        };
        let id = this.getProfileId();
        id = parseInt(id);
        try {
            let res = await axios.post(
                `https://damp-retreat-88900.herokuapp.com/api/v1/users/${input}/`,
                {
                    id
                },
                {
                    headers
                }
            )
            this.fetchData();
        } catch(e) {
            return null;
        }
    }

    renderUserLinks() {
        const profileContainer  = document.getElementById('profile-container');
        const width = profileContainer.clientWidth;
        const { user_links } = this.state.data;
        return user_links.map((link, index) => {
            
            return (
            <div key={index}>
                 <iframe 
                    id='video'
                    allowFullScreen="allowFullScreen"
                    src={`https://www.youtube.com/embed/${link.video_id}`}
                    title={index}
                    style={{width: width/3, height: width/3}}
                />
            </div>
            )
        });
    }

    profileOnClick = (id) => {
        window.location.href = `/profile/${id}`
    }
    showFollower() {
        if (this.state.data) {
            const { followers} = this.state.data;
            return (
                <Modal open={this.state.showFollower} onClose={() => this.handleClose('showFollower')}>
                    <div className="modal">
                        {followers.map((item, index) => {
                            return (
                                <div key={index} style={{display: 'flex', alignItems: 'center'}}>
                                    <img src={profilePic} className="modal-pic" alt="" />
                                   <Button onClick={() => this.profileOnClick(item.id)}><p>{item.name}</p></Button>
                                </div>
                            );
                        })}
                    </div>
                    
                </Modal>
            );
        }
        
    }
    showFollowing() {
        if (this.state.data) {
            const { following} = this.state.data;
            return (
                <Modal open={this.state.showFollowing} onClose={() => this.handleClose('showFollowing')}>
                    <div className="modal">
                        {following.map((item, index) => {
                            return (
                                <div key={index} style={{display: 'flex', alignItems: 'center'}}>
                                    <img src={profilePic} className="modal-pic" alt="" />
                                   <Button onClick={() => this.profileOnClick(item.id)}><p>{item.name}</p></Button>
                                </div>
                            );
                        })}
                    </div>
                    
                </Modal>
            );
        }
        
    }

    renderProfile() {
        
        const profileContainer  = document.getElementById('profile-container');
        const width = profileContainer.clientWidth;
        const { current_user, followers, following, user_info } = this.state.data;
        return (
            <div id="profile-content-container">
                <img id="profile-img" src={profilePic} alt="" />
                <h3>{user_info.name}</h3>
                {this.renderButton()}
                <div id="follow-container">
                    <Button onClick={() => this.setState({showFollower: true})}>{followers.length} Followers</Button>
                    <Button onClick={() => this.setState({showFollowing: true})}>{following.length} Following</Button>
                </div>
                <div id="user-video-container" style={{width: width}}>
                    {this.renderUserLinks()}
                </div>
                
            </div>
            
        )
    }

    render() {
        
        return (
            <div id="profile-container">
                {this.showFollower()}
                {this.showFollowing()}
                {this.state.data ? this.renderProfile() : null}
            </div>
        );
    }
}

export default Profile;