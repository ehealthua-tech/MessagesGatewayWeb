import React from 'react';
import withStyles from 'withStyles';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { H1 } from '../../../components/Title';
import Button from '../../../components/Button';
import { Popup } from '../../../components/Popup';
import styles from './styles.scss';
import {
  deleteOperator,
  fetchOperators,
  fetchOperatorsTypes,
  fetchProtocols,
  fetchOperatorFields,
} from './redux';
import { getOperators, getOperatorsTypes, getProtocols } from '../../../reducers';
import OperatorTypeSelectionForm from '../../forms/OperatorTypeSelectionForm';
import DeleteButton from '../../../components/DeleteButton';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch }) =>
    Promise.all([
      dispatch(fetchOperators()),
      dispatch(fetchOperatorsTypes()),
      dispatch(fetchProtocols()),
    ]),
})
@connect(
  state => ({
    operators: getOperators(state),
    operatorsTypes: getOperatorsTypes(state),
    protocols: getProtocols(state),
  }),
  { fetchOperatorFields, deleteOperator }
)
export default class OperatorsListPage extends React.Component {
  state = {
    isOpenedNew: false,
    isOpenedDelete: false,
    id: '',
  };

  openPopupNew = () => {
    this.setState({
      isOpenedNew: true,
    });
  };

  openPopupDelete = (id) => {
    this.setState({
      isOpenedDelete: true,
      id,
    });
  };

  render() {
    const {
      router,
      operators,
      operatorsTypes,
      protocols,
      fetchOperatorFields,
      deleteOperator,
    } = this.props;

    const { isOpenedNew, isOpenedDelete, id } = this.state;

    return (
      <div id="operator-list-page">
        <Helmet
          title="Оператори"
          meta={[{ property: 'og:title', content: 'Сторінка операторів' }]}
        />

        <H1>Оператори</H1>

        <div className={styles.operators_container}>
          {operators.length ? (
            operators.map((operator, index) => {
              const { name, id } = operator;
              return (
                <div className={styles.operator_type} key={index}>
                  <div>{operator.name}</div>
                  <div>
                    <DeleteButton onClick={() => this.openPopupDelete(id)} />
                    <Button
                      className={styles.detail_button}
                      onClick={() =>
                        router.push({
                          pathname: `/operators/detail/${id}/`,
                          params: {
                            name,
                          },
                        })
                      }
                    >
                      Деталі
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.not_found}>
              <h2>Нажаль, жодного оператора не додано</h2>
            </div>
          )}
          <div>
            <Button onClick={this.openPopupNew}>Додати оператора</Button>
          </div>
        </div>
        <Popup
          title={<span>Оберіть налаштування для створення</span>}
          active={isOpenedNew}
          onClose={() => this.setState({ isOpenedNew: false })}
        >
          <OperatorTypeSelectionForm
            operatorsTypes={operatorsTypes}
            protocols={protocols}
            isOpenedNew={() => this.setState({ isOpenedNew: false })}
            onSubmit={values => fetchOperatorFields({ values })}
          />
        </Popup>

        <Popup
          title={<span>Ви впевнені, що хочете видалити оператора?</span>}
          active={isOpenedDelete}
          onClose={() => this.setState({ isOpenedDelete: false })}
        >
          <div className={styles.buttons_block}>
            <Button
              onClick={() =>
                deleteOperator(id).then(() => {
                  this.setState({ isOpenedDelete: false });
                })
              }
            >
              Видалити
            </Button>
            <Button onClick={() => this.setState({ isOpenedDelete: false })}>Cкасувати</Button>
          </div>
        </Popup>
      </div>
    );
  }
}
