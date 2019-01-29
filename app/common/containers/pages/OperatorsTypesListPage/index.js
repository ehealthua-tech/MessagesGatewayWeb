import React from 'react';
import withStyles from 'withStyles';
import Helmet from 'react-helmet';
import SortableList from '../../forms/OperatorTypesPriorityForm';
import { H1 } from '../../../components/Title';
import styles from './styles.scss';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import {
  fetchOperatorsTypes,
  showChangedOperatorsTypes,
  combineOperatorsTypes,
  deleteOperatorType,
} from './redux';
import { getOperatorsTypes } from '../../../reducers';
import { Popup } from '../../../components/Popup';
import Button from '../../../components/Button';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchOperatorsTypes()),
})
@connect(
  state => ({
    operatorsTypes: getOperatorsTypes(state),
  }),
  { showChangedOperatorsTypes, combineOperatorsTypes, deleteOperatorType }
)
export default class OperatorsTypesListPage extends React.Component {
  state = {
    isOpened: false,
    id: '',
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { operatorsTypes, showChangedOperatorsTypes } = this.props;
    showChangedOperatorsTypes({ operatorsTypes, oldIndex, newIndex });
  };

  openPopup = (id) => {
    this.setState({
      isOpened: true,
      id,
    });
  };

  render() {
    const { operatorsTypes, combineOperatorsTypes, deleteOperatorType } = this.props;

    const { isOpened, id } = this.state;

    return (
      <div id="priority-page">
        <Helmet
          title="Список типів операторів"
          meta={[{ property: 'og:title', content: 'Список типів операторів' }]}
        />

        <H1>Список типів операторів</H1>

        <div>
          <SortableList
            items={operatorsTypes}
            onSortEnd={this.onSortEnd}
            onDeleteType={id => this.openPopup(id)}
            onSubmit={values => combineOperatorsTypes({ operatorsTypes, values })}
            useDragHandle
            hideSortableGhost
            lockAxis="y"
            lockToContainerEdges
            lockOffset={['0%', '100%']}
          />
        </div>
        <Popup
          title={<span>Ви впевнені, що хочете видалити тип оператора?</span>}
          active={isOpened}
          onClose={() => this.setState({ isOpened: false })}
        >
          <div className={styles.buttons_block}>
            <Button
              onClick={() => {
                return deleteOperatorType(id).then(() => {
                  this.setState({ isOpened: false });
                });
              }}
            >
              Видалити
            </Button>
            <Button onClick={() => this.setState({ isOpened: false })}>Cкасувати</Button>
          </div>
        </Popup>
      </div>
    );
  }
}
