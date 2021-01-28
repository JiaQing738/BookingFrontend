import React from 'react';
import ReactTable from "react-table";
import { confirmAlert } from 'react-confirm-alert';
import { Modal } from 'react-responsive-modal';
import { FACILITY_TABLE_HEADER, FACILITY_TEMPLATE, NOTIFICATION_OPTIONS } from '../../Common/Constant';
import FacilityManagementModal from '../FacilityManagementModal/FacilityManagementModal';
import { getFacilityDetails, updateFacilityDetail, createFacilityDetail, deleteFacilityDetail } from '../../Actions/FacilityDetailActions';
import AWN from "awesome-notifications";
import "./FacilityManagementPanel.css";

let notifier = new AWN(NOTIFICATION_OPTIONS)

export default class FacilityManagementPanel extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            facilitiesList: [],
            facility: null,
            mode: null
        }
    }

    componentDidMount() {
        this.retrieveAllFacilitySetting();
    }

    async retrieveAllFacilitySetting() {
        const result = await getFacilityDetails();
        this.setState({facilitiesList:result});
    }

    render() {
        const { facility, mode, facilitiesList } = this.state;
        return (
            <div className="facility-management-panel">
                <div className="facility-management-content">
                    <div className="facility-management-header">
                        <label className="facility-management-header-label">Facility Management</label>
                        <button
                        className="facility-management-button"
                        title="Add New Facility"
                        onClick={()=>{
                            this.setState({facility:FACILITY_TEMPLATE, mode:"NEW"})
                        }}> + New </button>
                    </div>
                    <div className="facility-management-body">
                        <ReactTable
                        data={facilitiesList}
                        columns={FACILITY_TABLE_HEADER.concat(this.addCustomColumn())}
                        style={{
                            height: "400px"
                        }}
                        defaultPageSize={10}
                        className="-striped -highlight"
                        noDataText="No Facility Available"
                        rowsText="facilities"
                        />
                    </div>
                </div>
                <Modal
                open={(facility!==null)}
                onClose={()=>{this.setState({facility:null})}}
                center
                showCloseIcon={false}>
                    <FacilityManagementModal
                    mode={mode}
                    facility={facility}
                    onCancel={()=>{this.setState({facility:null})}}
                    onSave={(facility)=>{this.onSave(facility)}}
                    facilitiesList={facilitiesList}
                    />
                </Modal>
            </div>
        );
    }

    async onSave(facility) {
        const { mode } = this.state;
        var success = false;
        if(mode==="EDIT")
        {
            success = await updateFacilityDetail(facility);
        }
        else
        {
            success = await createFacilityDetail(facility);
        }

        if(success)
        {
            notifier.success(`Facility ${(mode==="EDIT")?"Updated":"Created"}`);
            this.setState({facility:null});
            this.retrieveAllFacilitySetting();
        }
        else
        {
            notifier.alert(`Something went wrong, unable to ${(mode==="EDIT")?"update":"create new"} facility`);
        }
    }

    async onDelete(facility) {
        if(facility.id)
        {
            const success = await deleteFacilityDetail(facility.id);
            if(success)
            {
                notifier.success(`Facility Deleted`);
                this.retrieveAllFacilitySetting();
            }
            else
            {
                notifier.alert(`Something went wrong, unable to delete facility`);
            }
        }
    }

    addCustomColumn() {
        return [{
            Header: "Actions",
            Cell: (cell)=>(
                <>
                    <button className="facility-management-table-button"
                    title="Edit"
                    onClick={()=>{this.editFacility(cell.original)}}>
                        <svg viewBox="0 0 24 24">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        </svg>
                    </button>
                    <button className="facility-management-table-button"
                    title="Delete"
                    onClick={()=>{this.deleteFacility(cell.original)}}>
                        <svg viewBox="0 0 24 24">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                    </button>
                </>
            )
        }];
    }

    editFacility(facility) {
        this.setState({facility: facility, mode:"EDIT"});
    }

    deleteFacility(facility) {
        confirmAlert({
            title: `Delete ${facility.name}`,
            message: 'This will also delete all bookings under this facility.',
            buttons: [
              {
                label: 'Confirm',
                onClick: () => {this.onDelete(facility)}
              },
              {
                label: 'Cancel',
                onClick: () => {}
              }
            ]
        });
    }
}