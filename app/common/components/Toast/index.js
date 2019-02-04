import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import styles from './styles.scss';
import { hideNotification } from '../../redux/notification';

@withStyles(styles)
@connect(null, dispatch => ({
  hideNotification: () => dispatch(hideNotification({ showing: false })),
}))
export default class Toast extends React.Component {
  componentDidMount() {
    this.timeout = setTimeout(() => {
      const { hideNotification } = this.props;
      hideNotification();
    }, 3500);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { message, type } = this.props;
    return (
      <div className={classnames(styles.notification, styles[`notification_${type}`])}>
        {message}
      </div>
    );
  }
}
