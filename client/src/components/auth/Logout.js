import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../../actions";
import "../../css/logout.css";

class Logout extends Component {
    componentDidMount() {
        this.props.logout();
    }
    render() {
        return (
            <div className="outro">
                Don't forget, you can take OneList with you on the go!
            </div>
        )
    }
}

export default connect(null, actions)(Logout);