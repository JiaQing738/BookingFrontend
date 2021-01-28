import React from 'react';
import { getBookingSettings, updateBookingSettings } from '../../Actions/BookingSettingActions';
import { NOTIFICATION_OPTIONS } from '../../Common/Constant';
import AWN from "awesome-notifications";
import "./BookingSettingPanel.css";

let notifier = new AWN(NOTIFICATION_OPTIONS)

export default class BookingSettingPanel extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            max_hr_per_booking: '',
            max_bookahead: '',
            booking_start_time: '',
            booking_end_time: '',
            canSave: false
        }
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        this.retrieveAllBookingSetting();
    }

    async retrieveAllBookingSetting() {
        const dbQuery = await getBookingSettings();
        if(dbQuery.length!==0)
        {
            var newState = {};
            dbQuery.forEach((record)=>{
                newState[record.key] = record.value;
            });
            this.setState(newState);
        }
    }

    async onSave() {
        const {max_hr_per_booking, max_bookahead, booking_start_time, booking_end_time} = this.state;
        const maxHrPerBooking = parseFloat(max_hr_per_booking);
        const maxBookahead = parseInt(max_bookahead);
        var bookingTime;
        bookingTime = booking_start_time.split(":");
        const startTime = new Date(null, null, null, bookingTime[0], bookingTime[1]);
        bookingTime = booking_end_time.split(":");
        const endTime = new Date(null, null, null, bookingTime[0], bookingTime[1]);

        if(maxHrPerBooking > 24 || maxHrPerBooking <= 0 || max_hr_per_booking === "")
        {
            notifier.warning('Invalid Max Booking');
        }
        else if(maxBookahead <= 0 || max_bookahead === "")
        {
            notifier.warning('Invalid Max Bookahead');
        }
        else if(startTime.getTime() >= endTime.getTime())
        {
            notifier.warning('Booking Start Time later than Booking End Time');
        }
        else
        {
            const config = {
                max_hr_per_booking: max_hr_per_booking,
                max_bookahead: max_bookahead,
                booking_start_time: booking_start_time,
                booking_end_time: booking_end_time
            }
            const result = await updateBookingSettings(config);
            if(result)
            {
                notifier.success('Updated');
            }
            else
            {
                notifier.alert('Something went wrong, unable to update setting.');
            }
        }
    }

    render() {
        const {max_hr_per_booking, max_bookahead, booking_start_time, booking_end_time, canSave} = this.state;
        const maxHrPerBooking = parseFloat(max_hr_per_booking);
        const maxBookahead = parseInt(max_bookahead);
        return (
            <div className="booking-setting-panel">
                <div className="booking-setting-content">
                    <div className="booking-setting-header">
                        <label className="booking-setting-header-label">Booking Setting</label>
                    </div>
                    <div className="booking-setting-body">
                        <table className="booking-setting-table">
                            <colgroup>
                                <col width="75%"/>
                                <col width="25%"/>
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td><div className="booking-setting-label">Max Booking (Hour)</div></td>
                                    <td>
                                        <input className={`booking-setting-input ${(maxHrPerBooking > 24 || maxHrPerBooking < 0)?"invalid":""}`}
                                        type="number" value={max_hr_per_booking}
                                        min={1}
                                        max={24}
                                        step={0.5}
                                        onChange={(e)=>{this.setState({max_hr_per_booking:e.target.value, canSave:true})}}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td><div className="booking-setting-label">Max Bookahead (Day)</div></td>
                                    <td>
                                    <input className={`booking-setting-input ${(maxBookahead <= 0)?"invalid":""}`}
                                        type="number" value={max_bookahead} 
                                        min={1}
                                        step={1}
                                        onChange={(e)=>{this.setState({max_bookahead:e.target.value, canSave:true})}}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td><div className="booking-setting-label">Booking Start Time (Hour of the Day)</div></td>
                                    <td>
                                        <input className="booking-setting-input time" 
                                        type="time" value={booking_start_time}
                                        onChange={(e)=>{this.setState({booking_start_time:e.target.value, canSave:true})}}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td><div className="booking-setting-label">Booking End Time (Hour of the Day)</div></td>
                                    <td>
                                        <input className="booking-setting-input time" 
                                        type="time" value={booking_end_time}
                                        onChange={(e)=>{this.setState({booking_end_time:e.target.value, canSave:true})}}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="booking-setting-footer">
                        <button className="booking-setting-button" 
                        disabled={!canSave}
                        onClick={this.onSave}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}