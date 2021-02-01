import React from 'react';
import PropTypes from 'prop-types';
import { NOTIFICATION_OPTIONS, ONE_HOUR } from '../../Common/Constant';
import DatePicker from 'react-datepicker';
import AWN from "awesome-notifications";
import "./MakeBookingModal.css";

let notifier = new AWN(NOTIFICATION_OPTIONS)

export default class MakeBookingModal extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            facility: '',
            purpose: '',
            start_dt: null,
            end_dt: null,
            minDate: null,
            maxDate: null
        }
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount(){
        const { facilitiesList, configs } = this.props;
        var timeNow = new Date();
        timeNow.setSeconds(0,0);
        var today = new Date();
        today.setHours(0,0,0,0);
        var maxBooking = new Date(today);
        maxBooking.setDate(maxBooking.getDate() + parseInt(configs.max_bookahead))
        if (facilitiesList.length !== 0)
        {
            this.setState({facility: facilitiesList[0].id, start_dt:timeNow, end_dt:timeNow, minDate:today, maxDate:maxBooking});
        }
    }

    onSave(){
        const { bookingsList, configs, onSave } = this.props;
        const { facility, start_dt, end_dt, purpose } = this.state;
        const currentFacilityBooking = bookingsList.filter((booking)=>booking.id === facility);
        const startTimeInHourMinute = new Date(null, null, null, start_dt.getHours(), start_dt.getMinutes());
        const endTimeInHourMinute = new Date(null, null, null, end_dt.getHours(), end_dt.getMinutes());

        var bookingTime = configs.booking_start_time.split(":");
        const configStartTime = new Date(null, null, null, bookingTime[0], bookingTime[1]);
        bookingTime = configs.booking_end_time.split(":");
        const configEndTime = new Date(null, null, null, bookingTime[0], bookingTime[1]);

        if(start_dt.getTime() >= end_dt.getTime())
        {
            notifier.warning('Booking Start Time later than Booking End Time');
        }
        else if (ONE_HOUR*configs.max_hr_per_booking < (end_dt.getTime() - start_dt.getTime()))
        {
            notifier.warning(`Maximum duration per Booking: ${configs.max_hr_per_booking}Hours`);
        }
        else if (!(configStartTime.getTime() <= startTimeInHourMinute.getTime() && configEndTime.getTime() > startTimeInHourMinute.getTime())
        ||!(configStartTime.getTime() < endTimeInHourMinute.getTime() && configEndTime.getTime() >= endTimeInHourMinute.getTime()))
        {
            notifier.warning(`Invalid Booking Timing, Booking only available from ${configs.booking_start_time} to ${configs.booking_end_time}`);
        }
        else
        {
            const overlapBooking = currentFacilityBooking.filter((booking)=>{
                return ((booking.start_time.getTime() <= start_dt.getTime() && booking.end_time.getTime() > start_dt.getTime()) ||
                (booking.start_time.getTime() < end_dt.getTime() && booking.end_time.getTime() >= end_dt.getTime()));
            });

            if(overlapBooking.length>0)
            {
                notifier.warning(`Unable to book, there is a existing booking from ${overlapBooking[0].start_time.toLocaleString()} to ${overlapBooking[0].end_time.toLocaleString()}`);
            }
            else
            {
                onSave({
                    facility_id:facility,
                    start_dt,
                    end_dt,
                    purpose
                });
            }
        }

    }

    render() {
        const { onCancel, facilitiesList, configs } = this.props;
        const { facility, purpose, start_dt, end_dt, minDate, maxDate} = this.state;
        return(
        <div className="make-booking-modal">
            <div className="make-booking-modal-header">
                <label className="make-booking-modal-header-label">New Booking</label>
            </div>
            <div className="make-booking-modal-body">
                <table className="make-booking-modal-table">
                    <tbody>
                        <tr>
                            <td>Facility <label className="required-field">*</label></td>
                        </tr>
                        <tr>
                            <td>
                                <select className="make-booking-modal-select" value={facility}
                                onChange={(e)=>{this.setState({facility:parseInt(e.target.value)})}}>
                                    {facilitiesList.map((fac, index)=>{
                                        return (<option key={index} value={fac.id}>{fac.title}</option>
                                            );
                                    })}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Purpose</td>
                        </tr>
                        <tr>
                            <td>
                                <input className="make-booking-modal-input"
                                placeholder="Enter Purpose"
                                value={purpose}
                                onChange={(e)=>{this.setState({purpose:e.target.value})}}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Book From</td>
                        </tr>
                        <tr>
                            <td>
                                <DatePicker
                                className="make-booking-modal-dt-picker"
                                selected={start_dt}
                                onChange={date => {this.setState({start_dt:date})}}
                                maxDate={maxDate}
                                minDate={minDate}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                showTimeSelect
                                placeholderText="Select Start Date"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Book To</td>
                        </tr>
                        <tr>
                            <td>
                                <DatePicker
                                className="make-booking-modal-dt-picker"
                                selected={end_dt}
                                onChange={date => {this.setState({end_dt:date})}}
                                maxDate={maxDate}
                                minDate={minDate}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                showTimeSelect
                                placeholderText="Select End Date"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <label className="make-booking-modal-label">{`*Booking only available from ${configs.booking_start_time} to ${configs.booking_end_time}`}</label>
            <br/>
            <label className="make-booking-modal-label">{`*Maximum duration per Booking: ${configs.max_hr_per_booking}Hours`}</label>
            <div className="make-booking-modal-footer">
                <button className="make-booking-modal-button" 
                onClick={this.onSave}>
                    Create
                </button>
                <button className="make-booking-modal-button"
                onClick={()=>{onCancel()}}>Cancel</button>
            </div>
        </div>)
    }
}

MakeBookingModal.propTypes = {
    configs: PropTypes.object,
    facilitiesList: PropTypes.arrayOf(PropTypes.object),
    bookingsList: PropTypes.arrayOf(PropTypes.object),
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};