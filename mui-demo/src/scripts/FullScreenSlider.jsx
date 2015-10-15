'use strict';

var React=require('react');
var BackMovie=React.createClass({
    displayName:'BackMovie',
    renderPics:function(){
        var nodes=this.props.data.map(function(pic,index){
            var clsName="item"+index;
            return (
                <div className={clsName}></div>
            );
        });
        return nodes;
    },
    render:function(){
        var self=this;
        var nodes=self.renderPics();
        console.log("node is "+nodes);
        return (<div className="back">
        {nodes}
        </div>);
    }
});
module.exports=BackMovie;
