import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import styles from './styles.scss';
import Icon from '../Icon';

const DeleteButton = ({ onClick }) => (
  <div onClick={onClick} className={styles.delete_button}>
    <Icon name="trash" />
  </div>
);

export default withStyles(styles)(DeleteButton);
