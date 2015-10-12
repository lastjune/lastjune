'use strict';

var React=require('react');
var mui=require('material-ui');

var Dialog=mui.Dialog,TextField=mui.TextField,FlatButton=mui.FlatButton;
var $=require('jquery');
var ThemeManager =  require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('./myRawTheme');
var LoginForm=React.createClass({
    getChildContext:function(){
        return {
            muiTheme: ThemeManager.getMuiTheme(MyRawTheme)
        }
    },
    submit:function(){
        window.location="http://localhost:9005";
    },
    getInitialState:function(){
        return {standarActions:"GET",modal:true}
    },
    handlerUserNameInputClick:function(e){
        console.log("Username input has been clicked.");
        this.handlerPassowrdInputClick(e);
    },
    handlerPassowrdInputClick:function(e){
        console.log("Password input has been clicked.");
    },
    render:function(){
        return (
            <Dialog
            title="投融界后台管理系统"
            actions={this.state.standardActions}
            openImmediately={true}
            actionFocus="submit"
            contentClassName="loginForm"
            modal={this.state.modal}>
            <TextField
            hintText="请输入用户名"
            floatingLabelText="用户名"
            onClick={this.handlerUserNameInputClick}/>
            <br />
            <TextField
            ref="passwordInput"
            hintText="Password Field"
            floatingLabelText="Password"
            type="password"
            onClick={this.handlerPassowrdInputClick}/>
            <br />
            <br />
            <FlatButton
            label="CANCEL"
            onTouchTap={this.dismiss}
            secondary={true}
            float="right" />
            <FlatButton
            label="SUBMIT"
            onTouchTap={this.submit}
            primary={true}
            float="right" />
            </Dialog>
        );
    }

});

LoginForm.childContextTypes = {
  muiTheme: React.PropTypes.object
};
module.exports=LoginForm;
