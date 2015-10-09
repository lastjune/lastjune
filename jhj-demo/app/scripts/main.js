var React = require('react');
var $=require('jquery');
var AppFrame=require('./AppFrame.jsx');
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
var mui=require('material-ui');
var MenuItem=mui.MenuItem;
var filterOptions1 = [
  { payload: '1', text: '投融界' },
  { payload: '2', text: '投融界' },
  { payload: '3', text: 'All Text' },
  { payload: '4', text: 'Complete Voice' },
  { payload: '5', text: 'Complete Text' },
  { payload: '6', text: 'Active Voice' },
  { payload: '7', text: 'Active Text' },
];

var iconMenuItems = [
  { payload: '1', text: 'Download' },
  { payload: '2', text: 'More Info' }
];
var leftMenuItems = [
  { route: 'get-started', text: 'Get Started' },
  { route: 'customization', text: 'Customization' },
  { route: 'components', text: 'Components' },
  { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
  {
     type: MenuItem.Types.LINK,
     payload: 'https://github.com/callemall/material-ui',
     text: 'GitHub'
  },
  {
     text: 'Disabled',
     disabled: true
  },
  {
     type: MenuItem.Types.LINK,
     payload: 'https://www.google.com',
     text: 'Disabled Link',
     disabled: true
  },
];
var st={position:"relative",height:64,backgroundColor:"#f3f3f4",display:"block"};
var tables=[{primaryText:"系统维护",initiallyOpen:true,tableName:"sample1",children:[{primaryText:"功能权限管理",initiallyOpen:false,tableName:"sample2",children:null}]},{primaryText:"系统维护2",initiallyOpen:true,tableName:"sample3",children:[{primaryText:"功能权限管理",initiallyOpen:false,tableName:"sample3",children:null},{primaryText:"功能权限管理2",initiallyOpen:false,tableName:"sample4",children:null}]}];
if($('#tree').length>0){
    React.render(<AppFrame filterOptions={filterOptions1} iconMenuItems={iconMenuItems} leftMenuItems={leftMenuItems} st={st} tables={tables}/>,document.getElementById('tree'));
}

