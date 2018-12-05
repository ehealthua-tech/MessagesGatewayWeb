import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router";
import withStyles from "nebo15-isomorphic-style-loader/lib/withStyles";

import NavItem from "components/NavItem";
import Icon from "components/Icon";


import { logOut } from "./redux";

import styles from "./styles.scss";

@withStyles(styles)
@connect(
  state => ({
    location: state.routing
  }),
  { logOut }
)
export default class Nav extends React.Component {
  componentWillReceiveProps(props) {
    if (props.isOpen) {
      document.documentElement.classList.add(styles.navIsOpen);
    } else {
      document.documentElement.classList.remove(styles.navIsOpen);
    }
  }
  render() {
    const { isOpen } = this.props;

    return (
      <nav className={classnames(styles.nav, isOpen && styles.open)}>
        <ul>
          <NavItem to="/dashboard" activeClassName={styles.active}>
            <Link id="dashboard-nav" to="/dashboard">
              Статистика
            </Link>
          </NavItem>
        </ul>
        <ul className={styles.down}>
          <li className={styles.logout} onClick={() => this.props.logOut()}>
            <Icon name="exit" />
            Вихід
          </li>
        </ul>
      </nav>
    );
  }
}
