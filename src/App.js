import React from 'react';
import SideBar from './Components/SideBar/SideBar';
import './App.css';
import { DEFAULT_VIEW, VIEWS, MAKE_BOOKING } from './Common/Constant';

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
            currentView={currentView}
            onChange={(update)=>{this.setState({currentView:update})}}
            views={(admin)?VIEWS:[MAKE_BOOKING]}
            />
          </div>
          <div className="app-content"></div>
        </div>
    );
  }
}
