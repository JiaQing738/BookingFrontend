import React from 'react';
import PropTypes from 'prop-types';
import "./ProfilePanel.css";

export default class ProfilePanel extends React.Component {
  render() {
    const { userName } = this.props;
    return (
      <div className="profile-panel">
        <div className="profile-picture" disabled>
          <svg viewBox="0 0 24 24">
            <path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"/>
          </svg>
        </div>
        <div className="profile-name">{userName}</div>
      </div>
    );
  }
}

ProfilePanel.propTypes = {
  userName: PropTypes.string
};