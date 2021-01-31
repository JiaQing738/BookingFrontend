import React from 'react';
import { NOTIFICATION_OPTIONS } from '../../Common/Constant';
import { getBookings } from '../../Actions/BookingActions';
import AWN from "awesome-notifications";
import "./MyBookingPanel.css";

let notifier = new AWN(NOTIFICATION_OPTIONS)

export default class MyBookingPanel extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            myBooking: [],
        }
    }

    componentDidMount() {
        const { userId } = this.props;
        this.retrieveMyBookings(userId);
    }

    async retrieveMyBookings(userId) {
        const dbQuery = await getBookings(userId);
        this.setState({myBooking:dbQuery});
    }

    render() {
        const { myBooking } = this.state;
        console.log(myBooking)
        return (
            <div className="my-booking-panel">
                <div className="my-booking-content">
                    <div className="my-booking-header">
                        <label className="my-booking-header-label">My Booking</label>
                    </div>
                    <div className="my-booking-body">
                        {(myBooking.length===0)?
                        <div className="my-booking-no-entry">
                            No Booking
                        </div>:
                        <div className="my-booking-list">
                            {myBooking.map((booking, index)=>{
                                return (
                                <div className="my-booking-entry" key={index}>
                                    {booking.start_dt}
                                </div>);
                            })}
                        </div>}
                    </div>
                </div>
            </div>
        );
    }
}