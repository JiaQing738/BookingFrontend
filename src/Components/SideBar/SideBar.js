import React from 'react';
import ProfilePanel from '../ProfilePanel/ProfilePanel';
import SideButtonPanel from '../SideButtonPanel/SideButtonPanel';
import "./SideBar.css";

export default class SideBar extends React.Component {
    render() {
        const { currentView, onChange, views } = this.props;
        return (
            <div className="side-bar">
                <ProfilePanel/>
                <SideButtonPanel
                currentView={currentView}
                onChange={onChange}
                views={views}
                />
            </div>
        );
    }
  }