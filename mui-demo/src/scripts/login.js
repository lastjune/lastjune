'use strict';

var React=require('react');
var $=require('jquery');
var LoginForm=require('./LoginForm.jsx');
var BackMovie=require('./FullScreenSlider.jsx');
//var ItemList=require('./Test.jsx');
if($('#login').length>0){
    var Dialog=React.render(<LoginForm />,document.getElementById('login'));
}
if($('#back').length>0){
    var list=[{"name":1},{"name":2}];
    React.render(<BackMovie data={list} />,document.getElementById('back'));
}
