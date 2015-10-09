'use strict';

var React=require('react');
var Comment=React.createClass({
    render:function(){
        return (
            <div className="comment">
                <h1 className="commentAutor">
                    {this.props.author}
                </h1>
                {this.props.children}
            </div>
        );
    }
});
module.exports=Comment;
