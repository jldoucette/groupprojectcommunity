var React = require('react');
var ReactDOM = require('react-dom');

// create component
var Profile = React.createClass({
    render: function(){
        return(
            <div>
                <h1>Hello</h1>
            </div>
        );
    }
});

// put component into html page
ReactDOM.render(<Profile />, document.getElementById('wrapper'));
