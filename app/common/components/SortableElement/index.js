import React from 'react';
import { Field } from 'redux-form';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { SortableElement } from 'react-sortable-hoc';
import Handle from '../SortableHandle';
import DeleteButton from '../DeleteButton';
import FieldCheckbox from '../reduxForm/FieldCheckbox';
import styles from './styles.scss';

const SortableItem = SortableElement(({ value, onDeleteType, sortIndex }) => (
  <div className={styles.item}>
    <Handle title="Утримуйте" />
    <DeleteButton
      onClick={() => {
        const { id } = value;
        return onDeleteType(id);
      }}
    />
    <div className={styles.text}>
      <div className={styles.title}>
        Активність типу <span>{value.name}</span>
      </div>
      <Field name={value.name} component={FieldCheckbox} />
    </div>
    <div className={styles.text}>
      <span>Пріорітет</span>
      {sortIndex + 1}
    </div>
  </div>
));

export default withStyles(styles)(SortableItem);
