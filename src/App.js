import React from 'react';
import SideBar from './Components/SideBar/SideBar';
import MakeBookingPanel from './Components/MakeBookingPanel/MakeBookingPanel';
import BookingSettingPanel from './Components/BookingSettingPanel/BookingSettingPanel';
import FacilityManagementPanel from './Components/FacilityManagementPanel/FacilityManagementPanel';
import "awesome-notifications/dist/style.css";
import './App.css';
import { DEFAULT_VIEW, VIEWS, MAKE_BOOKING, FACILITY_MANAGEMENT, BOOKING_SETTING } from './Common/Constant';

const APP_CONTENT = {
  [MAKE_BOOKING]: <MakeBookingPanel/>,
  [FACILITY_MANAGEMENT]: <FacilityManagementPanel/>,
  [BOOKING_SETTING]: <BookingSettingPanel/>,
}

export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      currentView: DEFAULT_VIEW,
      admin:true
    }
  }

  render(){
    const { currentView, admin } = this.state;
    return (
        <div className="App">
          <div className="app-menu">
            <SideBar
            userName={"DEMO"}
            currentView={currentView}
            onChange={(update)=>{this.setState({currentView:update})}}
            views={(admin)?VIEWS:[MAKE_BOOKING]}
            />
          </div>
          <div className="app-content">
              {APP_CONTENT[currentView]}
          </div>
        </div>
    );
  }
}
