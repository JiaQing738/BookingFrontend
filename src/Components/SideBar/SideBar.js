import React from 'react';
import PropTypes from 'prop-types';
import ProfilePanel from '../ProfilePanel/ProfilePanel';
import SideButtonPanel from '../SideButtonPanel/SideButtonPanel';
import "./SideBar.css";

export default class SideBar extends React.Component {
    render() {
        const { currentView, onChange, views, userName, onLogout } = this.props;
        return (
            <div className="side-bar">
                <ProfilePanel
                userName={userName}
                />
                <SideButtonPanel
                currentView={currentView}
                onChange={onChange}
                views={views}
                />
                <div className="logout-panel">
                    <button className="logout-button" onClick={onLogout}>Log Out</button>
                </div>
            </div>
        );
    }
}

SideBar.propTypes = {
    currentView: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    views: PropTypes.arrayOf(PropTypes.string),
    userName: PropTypes.string,
    onLogout: PropTypes.func.isRequired
};