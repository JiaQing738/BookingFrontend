import React from 'react';
import PropTypes from 'prop-types';
import { STATUS_OPTIONS, NOTIFICATION_OPTIONS } from '../../Common/Constant';
import AWN from "awesome-notifications";
import "./FacilityManagementModal.css";

let notifier = new AWN(NOTIFICATION_OPTIONS)

export default class FacilityManagementModal extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            facility: this.props.facility,
        }
        this.onSave = this.onSave.bind(this);
    }

    onSave(){
        const { facility } = this.state;
        const { mode, onSave, facilitiesList } = this.props;

        if(facility.name === "")
        {
            notifier.warning('Facility name can not be empty');
        }
        else if(mode==="NEW" && facilitiesList.map((fac)=>fac.name).includes(facility.name))
        {
            notifier.warning('Duplicates facility name');
        }
        else
        {
            onSave(facility);
        }
    }

    render() {
        const { facility } = this.state;
        const { mode, onCancel } = this.props;
        return(
        <div className="facility-management-modal">
            <div className="facility-management-modal-header">
                <label className="facility-management-modal-header-label">{(mode==="EDIT")?"Edit Facility": "New Facility"}</label>
            </div>
            <div className="facility-management-modal-body">
                <table className="facility-management-modal-table">
                    <tbody>
                        <tr>
                            <td>Name <label className="required-field">*</label></td>
                        </tr>
                        <tr>
                            <td>
                                <input className="facility-management-modal-input"
                                placeholder="Enter Facility Name"
                                value={facility.name}
                                onChange={(e)=>{this.setState({facility:{...facility,name:e.target.value}})}}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Floor</td>
                        </tr>
                        <tr>
                            <td>
                                <input className="facility-management-modal-input"
                                placeholder="Enter Floor Number"
                                value={facility.level}
                                onChange={(e)=>{this.setState({facility:{...facility,level:e.target.value}})}}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Description</td>
                        </tr>
                        <tr>
                            <td>
                                <input className="facility-management-modal-input"
                                placeholder="Enter Description"
                                value={facility.description}
                                onChange={(e)=>{this.setState({facility:{...facility,description:e.target.value}})}}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Status</td>
                        </tr>
                        <tr>
                            <td>
                                <select className="facility-management-modal-select" value={facility.status}
                                onChange={(e)=>{this.setState({facility:{...facility,status:e.target.value}})}}>
                                    {STATUS_OPTIONS.map((status, index)=>{
                                        return (<option key={index} value={status}>{status}</option>
                                            );
                                    })}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="facility-management-modal-footer">
                <button className="facility-management-modal-button" 
                onClick={this.onSave}>
                    {(mode==="EDIT")?"Save":"Create"}
                </button>
                <button className="facility-management-modal-button"
                onClick={()=>{onCancel()}}>Cancel</button>
            </div>
        </div>)
    }
}

FacilityManagementModal.propTypes = {
    mode: PropTypes.string,
    facility: PropTypes.object,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    facilitiesList: PropTypes.arrayOf(PropTypes.object),
};