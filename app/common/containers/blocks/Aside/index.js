import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";

import withStyles from "nebo15-isomorphic-style-loader/lib/withStyles";

import Nav from "containers/blocks/Nav";
import Gamburger from "containers/blocks/Gamburger";

import { toggleMenu } from "./redux";

import styles from "./styles.scss";

@withStyles(styles)
@connect(state => state.blocks.Aside, { toggleMenu })
export default class Aside extends React.Component {
  render() {
    const { active, toggleMenu } = this.props;
    return (
      <aside className={styles.aside}>
        <Link className={styles.logo} to="/">
          <img src="/images/nhs-logo.svg" alt="Logo" />
        </Link>
        <hr className={styles.line} />

        <Nav isOpen={active} />

        <div className={styles["menu-control"]}>
          <Gamburger isOpen={active} onToggle={toggleMenu} />
        </div>
      </aside>
    );
  }
}
