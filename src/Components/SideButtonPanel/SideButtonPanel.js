import React from 'react';
import PropTypes from 'prop-types';
import "./SideButtonPanel.css";

export default class SideButtonPanel extends React.Component {
    render() {
        const { currentView, onChange, views } = this.props;
        return (
            <div className="side-button-panel">
                {views.map((view, index)=>{
                    return(
                        <div className={`side-button ${(currentView===view)?'active':''}`}
                        key={index}
                        onClick={()=>{onChange(view)}}>
                            {view}
                        </div>
                    )
                })}
            </div>
        );
    }
}

SideButtonPanel.propTypes = {
    currentView: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    views: PropTypes.arrayOf(PropTypes.string)
};