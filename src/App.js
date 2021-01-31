import React from 'react';
import SideBar from './Components/SideBar/SideBar';
import MyBookingPanel from './Components/MyBookingPanel/MyBookingPanel';
import MakeBookingPanel from './Components/MakeBookingPanel/MakeBookingPanel';
import BookingSettingPanel from './Components/BookingSettingPanel/BookingSettingPanel';
import FacilityManagementPanel from './Components/FacilityManagementPanel/FacilityManagementPanel';
import Login from './Components/Login/Login';
import './Timeline.css';
import 'awesome-notifications/dist/style.css';
import './react-responsive-modal.css';
import './react-confirm-alert.css';
import './react-table.css';
import './App.css';
import './react-datepicker.css';
import { DEFAULT_VIEW, VIEWS, MY_BOOKING, MAKE_BOOKING, FACILITY_MANAGEMENT, BOOKING_SETTING } from './Common/Constant';

const DEFAULT_STATE = {
  currentView: DEFAULT_VIEW,
  token:null
}

export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = DEFAULT_STATE;
    this.setToken = this.setToken.bind(this);
  }

  setToken(userToken) {
    this.setState({token:userToken});
  }

  render(){
    const { currentView, token } = this.state;
    return (
        <div className="App">
          {(token!==null)?
          <>
            <div className="app-menu">
              <SideBar
              userName={token.user_id}
              currentView={currentView}
              onChange={(update)=>{this.setState({currentView:update})}}
              views={(token && token.admin)?VIEWS:[MY_BOOKING, MAKE_BOOKING]}
              onLogout={()=>{this.setState(DEFAULT_STATE)}}
              />
            </div>
            <div className="app-content">
                {(currentView===MY_BOOKING)?
                <MyBookingPanel
                userId={token.user_id}/>:
                (currentView===MAKE_BOOKING)?
                <MakeBookingPanel
                userName={(token && token.user_id)?token.user_id:null}
                email={(token && token.email)?token.email:null}
                />:
                (currentView===FACILITY_MANAGEMENT)?
                <FacilityManagementPanel/>:
                (currentView===BOOKING_SETTING)?
                <BookingSettingPanel/>:
                null}
            </div>
          </>:
          <Login setToken={this.setToken}/>
          }
        </div>
    );
  }
}
