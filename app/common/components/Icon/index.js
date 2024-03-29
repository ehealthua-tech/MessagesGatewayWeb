import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import styles from './icons.font';

export const icons = [
  'arrow-left',
  'arrow-left-large',
  'arrow-right',
  'arrow-down',
  'check-right',
  'add',
  'pdf',
  'doc',
  'trash',
  'exit',
  'close',
  'envelope',
  'lock',
  'back',
  'search',
];

const Icon = ({ name }) =>
  React.createElement('i', {
    className: classnames(styles.icon, styles[`icon-${name}`]),
  });

Icon.propTypes = {
  name: PropTypes.oneOf(icons).isRequired,
};

export default withStyles(styles)(Icon);
