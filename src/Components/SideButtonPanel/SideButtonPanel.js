import React from 'react';
import "./SideButtonPanel.css";

export default class SideButtonPanel extends React.Component {
    render() {
        const { currentView, onChange, views } = this.props;
        return (
            <div className="side-button-panel">
                {views.map((view)=>{
                    return(
                        <div className={`side-button ${(currentView===view)?'active':''}`}
                        onClick={()=>{onChange(view)}}>
                            {view}
                        </div>
                    )
                })}
            </div>
        );
    }
  }