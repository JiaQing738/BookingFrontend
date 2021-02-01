import React from 'react';
import PropTypes from 'prop-types';
import { NOTIFICATION_OPTIONS } from '../../Common/Constant';
import { getBookings, deleteBooking } from '../../Actions/BookingActions';
import { getFacilityDetails } from '../../Actions/FacilityDetailActions';
import { confirmAlert } from 'react-confirm-alert';
import AWN from "awesome-notifications";
import "./MyBookingPanel.css";

let notifier = new AWN(NOTIFICATION_OPTIONS)

export default class MyBookingPanel extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            myBooking: [],
            facilityList: []
        }
        this.cancelBooking = this.cancelBooking.bind(this);
        this.deleteBooking = this.deleteBooking.bind(this);
    }

    componentDidMount() {
        const { userId } = this.props;
        this.retrieveMyBookings(userId);
    }

    async retrieveMyBookings(userId) {
        const dbQuery = await getBookings(userId);
        const result = await getFacilityDetails();
        this.setState({myBooking:dbQuery, facilityList:result});
    }

    cancelBooking(booking) {
        const { deleteBooking } = this;
        confirmAlert({
            title: `Delete Booking`,
            buttons: [
              {
                label: 'Confirm',
                onClick: () => {deleteBooking(booking.id)}
              },
              {
                label: 'Cancel',
                onClick: () => {}
              }
            ]
        });
    }

    async deleteBooking(id){
        const success = await deleteBooking(id);
        if(success)
        {
            notifier.success(`Booking canceled`);
            this.retrieveMyBookings();
        }
        else
        {
            notifier.alert(`Something went wrong, unable to cancel booking`);
        }
    }

    render() {
        const { myBooking,facilityList } = this.state;
        const { cancelBooking } = this;
        return (
            <div className="my-booking-panel">
                <div className="my-booking-content">
                    <div className="my-booking-header">
                        <label className="my-booking-header-label">My Booking</label>
                    </div>
                    <div className="my-booking-body">
                        {(myBooking.length===0)?
                        <div className="my-booking-no-entry">
                            You do not have any booking
                        </div>:
                        <div className="my-booking-list">
                            {myBooking.map((booking, index)=>{
                                const facility = facilityList.find(fac=>fac.id===booking.id)
                                const start = new Date(booking.start_dt);
                                const end = new Date(booking.end_dt);
                                return (
                                <div className="my-booking-entry" key={index}>
                                    <table className="my-booking-table">
                                        <tbody>
                                            <tr>
                                                <td>Facility</td>
                                                <td><div className="my-booking-field">{(facility)?facility.name:''}</div></td>
                                                <td>Purpose</td>
                                                <td><div className="my-booking-field">{booking.purpose}</div></td>
                                            </tr>
                                            <tr>
                                                <td>Booking From</td>
                                                <td><div className="my-booking-field">{start.toLocaleString()}</div></td>
                                                <td>Booking From</td>
                                                <td><div className="my-booking-field">{end.toLocaleString()}</div></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button className="my-booking-cancel"
                                    onClick={()=>{cancelBooking(booking)}}>Cancel Booking</button>
                                </div>);
                            })}
                        </div>}
                    </div>
                </div>
            </div>
        );
    }
}

MyBookingPanel.propTypes = {
    userId: PropTypes.string
};