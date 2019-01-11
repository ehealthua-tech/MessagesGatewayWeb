import React from "react";
import withStyles from "withStyles";
import Helmet from "react-helmet";
import { H1 } from "../../../components/Title";
import Button from "../../../components/Button";
import { Popup } from "../../../components/Popup";
import styles from "./styles.scss";
import { connect } from "react-redux";
import { provideHooks } from "redial";
import {
  deleteOperator,
  fetchOperators,
  fetchOperatorsTypes,
  fetchProtocols,
  fetchOperatorFields
} from "./redux";
import {
  getOperators,
  getOperatorsTypes,
  getProtocols
} from "../../../reducers";
import OperatorTypeSelectionForm from "../../forms/OperatorTypeSelectionForm";
import DeleteButton from "../../../components/DeleteButton";

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch }) =>
    Promise.all([
      dispatch(fetchOperators()),
      dispatch(fetchOperatorsTypes()),
      dispatch(fetchProtocols())
    ])
})
@connect(
  state => ({
    operators: getOperators(state),
    operatorsTypes: getOperatorsTypes(state),
    protocols: getProtocols(state)
  }),
  { fetchOperatorFields, deleteOperator }
)
export default class OperatorsListPage extends React.Component {
  state = {
    isOpened: false
  };

  openPopup = () => {
    this.setState({
      isOpened: true
    });
  };

  render() {
    const {
      router,
      operators,
      operatorsTypes,
      protocols,
      fetchOperatorFields,
      deleteOperator
    } = this.props;

    const { isOpened } = this.state;

    return (
      <div id="operator-list-page">
        <Helmet
          title="Оператори"
          meta={[{ property: "og:title", content: "Сторінка операторів" }]}
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
                    <DeleteButton onClick={() => deleteOperator(id)} />
                    <Button
                      className={styles.detail_button}
                      onClick={() =>
                        router.push({
                          pathname: `/operators/detail/${id}/`,
                          params: {
                            name
                          }
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
            <Button onClick={this.openPopup}>Додати оператора</Button>
          </div>
        </div>

        <Popup
          title={<span>Оберіть налаштування для створення</span>}
          active={isOpened}
          onClose={() => this.setState({ isOpened: false })}
        >
          <OperatorTypeSelectionForm
            operatorsTypes={operatorsTypes}
            protocols={protocols}
            onSubmit={values => fetchOperatorFields(values, router)}
          />
        </Popup>
      </div>
    );
  }
}
