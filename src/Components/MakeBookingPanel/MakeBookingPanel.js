import React from 'react';
import PropTypes from 'prop-types';
import { getFacilityDetails } from '../../Actions/FacilityDetailActions';
import { getBookingSettings } from '../../Actions/BookingSettingActions';
import { getBookings } from '../../Actions/BookingActions';
import { Modal } from 'react-responsive-modal';
import MakeBookingModal from '../../Components/MakeBookingModal/MakeBookingModal';
import Timeline from 'react-calendar-timeline';
import { STATUS_OPEN, ONE_HOUR, NOTIFICATION_OPTIONS } from '../../Common/Constant';
import { createBooking } from '../../Actions/BookingActions';
import AWN from "awesome-notifications";
import moment from 'moment';
import "./MakeBookingPanel.css";

let notifier = new AWN(NOTIFICATION_OPTIONS)

const ITEM_TEMPLATE = {
    color: 'white',
    bgColor : 'rgba(43, 56, 63, 0.7)'
};

export default class MakeBookingPanel extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            bookings: [],
            configs: null,
            facilities: [],
            newBooking: false
        }
        this.setNewBooking = this.setNewBooking.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    setNewBooking() {
        if(this.state.facilities.length===0)
        {
            notifier.warning('No Facility Available');
        }
        else
        {
            this.setState({newBooking:true})
        }
    }

    async onSave(booking) {
        const { userName, email } = this.props;
        const bookingRecord = {...booking, user_id: userName, email: email}
        var success = await createBooking(bookingRecord);
        if(success)
        {
            notifier.success(`Booking Made`);
            this.setState({newBooking:false});
            this.retrieveData();
        }
        else
        {
            notifier.alert(`Something went wrong, unable to create Booking`);
        }
    }

    componentDidMount() {
        this.retrieveData();
    }

    async retrieveData() {
        var config = {};
        const bookingSettings = await getBookingSettings();
        if(bookingSettings.length!==0)
        {
            bookingSettings.forEach((record)=>{
                config[record.key] = record.value;
            });
        }
        const facilitiesResult = await getFacilityDetails(STATUS_OPEN);
        const facilities = facilitiesResult.map((facility)=>{
            return ({ id:facility.id, title:facility.name });
        })

        const bookingsResult = await getBookings();
        const bookings = bookingsResult.map((booking)=>{
            const starttime = new Date(booking.start_dt)
            const endtime = new Date(booking.end_dt)
            return {...ITEM_TEMPLATE, 
                id:booking.id, 
                group:booking.facility_id, 
                title:booking.purpose, 
                start_time: starttime, 
                end_time: endtime,
                duration: `${booking.purpose} (${starttime.toLocaleString()} to ${endtime.toLocaleString()})`};
        });

        this.setState({
            configs:config,
            facilities:facilities,
            bookings: bookings
        });
    }

    itemRenderer = ({
        item,
        timelineContext,
        itemContext,
        getItemProps,
        getResizeProps,
      }) => {
        const { left: leftResizeProps, right: rightResizeProps } = getResizeProps()
        return (
            <div
                {...getItemProps({
                style: {
                    backgroundColor: item.bgColor,
                    color: item.color,
                    borderColor: item.bgColor,
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderRadius: 4,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                }
                }) }
                >
                {itemContext.useResizeHandle ? (
                <div {...leftResizeProps} />
                ) : null}
                <div
                style={{
                    height: itemContext.dimensions.height,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                    lineHeight: '16px'
                }}
                >
                {itemContext.title}
                </div>
                {itemContext.useResizeHandle ? (
                <div {...rightResizeProps} />
                ) : null}
            </div>
        )
    }

    render() {
        const { facilities, bookings, configs, newBooking } = this.state;
        return (
            <div className="make-booking-panel">
                <div className="make-booking-content">
                    <div className="make-booking-header">
                        <label className="make-booking-header-label">Booking</label>
                        <button
                        className="make-booking-button"
                        title="Make Booking"
                        onClick={this.setNewBooking}> + New </button>
                    </div>
                    <div className="make-booking-body">
                    {(facilities.length!==0)?
                        <Timeline
                        groups={facilities}
                        items={bookings}
                        defaultTimeStart={moment()}
                        defaultTimeEnd={moment().add(12, 'hour')}
                        canMove={false}
                        canChangeGroup={false}
                        canResize={false}
                        canSelect={false}
                        traditionalZoom={true}
                        keys={
                            {
                                groupIdKey: 'id',
                                groupTitleKey: 'title',
                                groupRightTitleKey: 'rightTitle',
                                groupLabelKey: 'title',
                                itemIdKey: 'id',
                                itemTitleKey: 'title',
                                itemDivTitleKey: 'duration',
                                itemGroupKey: 'group',
                                itemTimeStartKey: 'start_time',
                                itemTimeEndKey: 'end_time'
                              }
                        }
                        itemRenderer={this.itemRenderer}
                        minZoom={ONE_HOUR*6}
                        maxZoom={ONE_HOUR*24}
                        />:
                        <div className="make-booking-no-entry">
                            No Facility Available
                        </div>
                    }
                    </div>
                    <Modal
                    open={newBooking}
                    onClose={()=>{this.setState({newBooking:false})}}
                    center
                    showCloseIcon={false}>
                        <MakeBookingModal
                        configs={configs}
                        facilitiesList={facilities}
                        bookingsList={bookings}
                        onCancel={()=>{this.setState({newBooking:false})}}
                        onSave={(booking)=>{this.onSave(booking)}}
                        />
                    </Modal>
                </div>
            </div>
        );
    }
}

MakeBookingPanel.propTypes = {
    userName: PropTypes.string,
    email: PropTypes.string
};