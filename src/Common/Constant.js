export const MY_BOOKING = "My Booking";
export const MAKE_BOOKING = "Make Booking";
export const FACILITY_MANAGEMENT = "Facility Management";
export const BOOKING_SETTING = "Booking Setting";
export const DEFAULT_VIEW = MY_BOOKING;

export const VIEWS = [MY_BOOKING, MAKE_BOOKING, FACILITY_MANAGEMENT, BOOKING_SETTING];

export const BOOKING_CONFIG = ["max_hr_per_booking", "max_bookahead", "booking_start_time", "booking_end_time"];

export const FACILITY_TABLE_HEADER = [
    {Header: "Name", accessor: "name"},
    {Header: "Floor", accessor: "level"},
    {Header: "Description", accessor: "description"},
    {Header: "Status", accessor: "status"}
];

export const STATUS_OPEN = "OPEN";
export const STATUS_MAINTENANCE = "MAINTENANCE";
export const STATUS_OPTIONS = [STATUS_OPEN, STATUS_MAINTENANCE];

export const FACILITY_TEMPLATE = {
    name: "",
    level: "",
    description: "",
    status: STATUS_OPEN
};

export const NOTIFICATION_OPTIONS =  {icons: {enabled: false}};

export const MAX_FACILITY_DETAILS_PER_CALL = 50;
export const MAX_BOOKINGS_PER_CALL = 50;

export const ONE_HOUR = 60 * 60 * 1000;

export const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST || 'localhost';
export const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT || '8000';