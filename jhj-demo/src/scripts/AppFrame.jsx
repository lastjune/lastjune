'use strict';

var React=require('react');
var mui=require('material-ui');
var ThemeManager =  require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../styles/myRawTheme');
var Toolbar=mui.Toolbar,ToolbarGroup=mui.ToolbarGroup,DropDownMenu=mui.DropDownMenu,ToolbarTitle=mui.ToolbarTitle,FontIcon=mui.FontIcon,ToolbarSeparator=mui.ToolbarSeparator,RaisedButton=mui.RaisedButton,DropDownIcon=mui.DropDownIcon,LeftNav=mui.LeftNav,Paper=mui.Paper,AppCanvas=mui.AppCanvas,List=mui.List,ListItem=mui.ListItem,Tab=mui.Tab,Tabs=mui.Tabs,FlatButton=mui.FlatButton,ListDivider=mui.ListDivider,Table=mui.Table,TableColumn=mui.TableColumn,TableFooter=mui.TableFooter,TableRow=mui.TableRow,TableBody=mui.TableBody,TableRowColumn=mui.TableRowColumn,TableHeader=mui.TableHeader,TableHeaderColumn=mui.TableHeaderColumn;
var AppFrame=React.createClass({
    getChildContext:function(){
        return {
            muiTheme: ThemeManager.getMuiTheme(MyRawTheme)
        }
    },
    getInitialState:function(){
        return  {state:{
          fixedHeader: true,
          fixedFooter: true,
          stripedRows: false,
          showRowHover: false,
          selectable: true,
          multiSelectable: false,
          enableSelectAll: false,
          deselectOnClickaway: true,
          height: '300px'}
        };
    },
    tabs:[],
    componentWillMount:function() {
        //ThemeManager.setComponentThemes({
            //toggle: {
                //thumbOnColor: String,
                //trackOnColor: String,
              //}
       //});
    },
    speak:function(e){
        alert("clicked"+this);
    },
    loadTableData:function(e){
        console.log("push tabs");
        this.tabs.push(1);
        this.forceUpdate();
    },
    renderTabs:function(){
        var self=this;
        if(self.tabs.length>0){
            return self.tabs.map(function(item,index){
                return (
                <Tab label={index} onClick={self.speak}>
<Table
  height={self.state.height}
  fixedHeader={self.state.fixedHeader}
  fixedFooter={self.state.fixedFooter}
  selectable={self.state.selectable}
  multiSelectable={self.state.multiSelectable}
  onRowSelection={self._onRowSelection}>
  <TableHeader enableSelectAll={self.state.enableSelectAll}>
    <TableRow>
      <TableHeaderColumn colSpan="3" tooltip='Super Header' style={{textAlign: 'center'}}>
        Super Header
      </TableHeaderColumn>
    </TableRow>
    <TableRow>
      <TableHeaderColumn tooltip='The ID'>ID</TableHeaderColumn>
      <TableHeaderColumn tooltip='The Name'>Name</TableHeaderColumn>
      <TableHeaderColumn tooltip='The Status'>Status</TableHeaderColumn>
    </TableRow>
  </TableHeader>
  <TableBody
    deselectOnClickaway={self.state.deselectOnClickaway}
    showRowHover={self.state.showRowHover}
    stripedRows={self.state.stripedRows}>
  <TableRow selected={true}>
      <TableRowColumn>1</TableRowColumn>
      <TableRowColumn>John Smith</TableRowColumn>
      <TableRowColumn>Employed</TableRowColumn>
    </TableRow>
    <TableRow>
      <TableRowColumn>2</TableRowColumn>
      <TableRowColumn>Randal White</TableRowColumn>
      <TableRowColumn>Unemployed</TableRowColumn>
    </TableRow>
    <TableRow selected={true}>
      <TableRowColumn>3</TableRowColumn>
      <TableRowColumn>Stephanie Sanders</TableRowColumn>
      <TableRowColumn>Employed</TableRowColumn>
    </TableRow>
    <TableRow>
      <TableRowColumn>4</TableRowColumn>
      <TableRowColumn>Steve Brown</TableRowColumn>
      <TableRowColumn>Employed</TableRowColumn>
    </TableRow>
    <TableRow>
      <TableRowColumn>5</TableRowColumn>
      <TableRowColumn>Joyce Whitten</TableRowColumn>
      <TableRowColumn>Employed</TableRowColumn>
    </TableRow>
    <TableRow>
      <TableRowColumn>6</TableRowColumn>
      <TableRowColumn>Samuel Roberts</TableRowColumn>
      <TableRowColumn>Unemployed</TableRowColumn>
    </TableRow>
    <TableRow>
      <TableRowColumn>7</TableRowColumn>
      <TableRowColumn>Adam Moore</TableRowColumn>
      <TableRowColumn>Employed</TableRowColumn>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableRowColumn>ID</TableRowColumn>
      <TableRowColumn>Name</TableRowColumn>
      <TableRowColumn>Status</TableRowColumn>
    </TableRow>
    <TableRow>
      <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
        Super Footer
      </TableRowColumn>
    </TableRow>
  </TableFooter>
</Table>
                </Tab>
                );
            });
        }
        return null;
    },
    mapItems:function(items){
        var self=this;
        var nodes=items.map(function(item){
            var nestedNodes;
            if(item.children&&item.children.length>0){
                nestedNodes=self.mapItems(item.children);
                return (
                  <ListItem
                    primaryText={item.primaryText}
                    nestedItems={nestedNodes}
                  />
                );
            }
            else{
                return (
                  <ListItem
                    primaryText={item.primaryText}
                    nestedItems={nestedNodes}
                    onClick={self.loadTableData}
                  />
                );
            }
        });
        return nodes;
    },
    render:function(){
        var listNodes=this.mapItems(this.props.tables);
        var tabs=this.renderTabs();
        return(
            <AppCanvas>
            <Paper>
            <Toolbar style={this.props.st}>
                <ToolbarGroup key={0} float="left">
                      <FlatButton linkButton={true} href="http://www.trjcn.com" secondary={true} label="投融界业务管理系统">
                      </FlatButton>
                </ToolbarGroup>
                <ToolbarGroup key={1} float="right">
                    <ToolbarTitle text="Options" />
                    <FontIcon className="mui-icon-sort" />
                    <DropDownIcon iconClassName="icon-navigation-expand-more" menuItems={this.props.iconMenuItems} />
                    <ToolbarSeparator/>
                    <RaisedButton label="Create Broadcast" primary={true} />
                </ToolbarGroup>
            </Toolbar>
            </Paper>
            <Paper style={{position:"relative"}}>
            <List subheader="功能菜单" style={{width:"20%",display:"block",position:"relative",float:"left"}} >
                {listNodes}
            </List>
            <Tabs ref="tabs" style={{float:"left",width:"80%",display:"block",position:"relative"}} tabItemContainerStyle={{backgroundColor:"rgb(226,226,226)"}}>
                {tabs}
            </Tabs>
            </Paper>
            </AppCanvas>
        );
    }
});
AppFrame.childContextTypes = {
  muiTheme: React.PropTypes.object
};
//ThemeManager.setTheme(ThemeManager.types.DARK);
module.exports=AppFrame;
