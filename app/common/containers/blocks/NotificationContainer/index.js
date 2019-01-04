import React from "react";
import { connect } from "react-redux";
import Toast from "../../../components/Toast";

@connect(state => ({
  show: state.notification.showing,
  message: state.notification.message,
  type: state.notification.type
}))
export default class NotificationContainer extends React.Component {
  render() {
    const { show = false, message, type } = this.props;
    return show && <Toast message={message} type={type} />;
  }
}
