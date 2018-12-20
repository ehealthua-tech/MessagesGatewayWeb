import React from "react";
import withStyles from "nebo15-isomorphic-style-loader/lib/withStyles";

import Aside from "containers/blocks/Aside";
import styles from "./styles.scss";
import NotificationContainer from "../../blocks/NotificationContainer";

const Main = ({ children }) => (
  <div className={styles.main}>
    <main>
      <Aside />
      <div className={styles.content}>{children}</div>
      <NotificationContainer/>
    </main>
    <footer className={styles.footer} />
  </div>
);

export default withStyles(styles)(Main);
