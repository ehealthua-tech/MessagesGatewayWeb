import React from 'react';
import withStyles from 'withStyles';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { SortableContainer } from 'react-sortable-hoc';
import Button from 'components/Button';
import SortableItem from '../../../components/SortableElement';
import { getOperatorsFormFields } from '../../../reducers';
import styles from './styles.scss';

const SortableList = SortableContainer(
  ({ items, onDeleteType, submitting, handleSubmit, onSubmit }) => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {items.length ? (
          items.map((value, index) => (
            <SortableItem
              key={index}
              index={index}
              value={value}
              sortIndex={index}
              onDeleteType={onDeleteType}
            />
          ))
        ) : (
          <div className={styles.not_found}>
            <h2>Нажаль, жодного типу оператора не додано</h2>
          </div>
        )}
      </div>
      <div className={styles.buttons_block}>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Збереження...' : 'Зберегти'}
        </Button>
        <Button to={'operators-types/create/'}>Додати тип оператора</Button>
      </div>
    </form>
  )
);

export default compose(
  connect(state => ({ initialValues: getOperatorsFormFields(state) })),
  reduxForm({
    form: 'operator-type-form',
    enableReinitialize: true,
  }),
  withStyles(styles)
)(SortableList);
