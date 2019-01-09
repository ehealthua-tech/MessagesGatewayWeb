import React from "react";
import withStyles from "withStyles";
import Helmet from "react-helmet";
import { H1 } from "../../../components/Title";
import Button from "../../../components/Button";
import { Popup } from "../../../components/Popup";
import styles from "./styles.scss";
import { connect } from "react-redux";
import { provideHooks } from "redial";
import { fetchOperators, fetchOperatorsTypes, fetchProtocols } from "./redux";
import {
  getOperators,
  getOperatorsTypes,
  getProtocols
} from "../../../reducers";
import OperatorTypeSelectionForm from "../../forms/OperatorTypeSelectionForm";
import { fetchOperatorFields } from "../../../redux/operators";

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
  { fetchOperatorFields }
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
      fetchOperatorFields
    } = this.props;
    const { isOpened } = this.state;
    return (
      <div id="priority-page">
        <Helmet
          title="Оператори"
          meta={[{ property: "og:title", content: "Сторінка пріорітезації" }]}
        />

        <H1>Оператори</H1>

        <div className={styles.operators_container}>
          {operators.map((operator, index) => {
            const { name, id } = operator;
            return (
              <Button
                className={styles.operator_type}
                key={index}
                onClick={() =>
                  router.push({
                    pathname: `/operators/detail/${id}/`,
                    params: {
                      name
                    }
                  })
                }
              >
                {operator.name}
              </Button>
            );
          })}
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
            onSubmit={values => {
              const { id } = values.operator_type;
              const { name } = values.protocol;
              fetchOperatorFields(name).then(action => {
                return router.push({
                  pathname: `/operators/create/${id}/`,
                  state: {
                    fields: action.payload.fields
                  }
                });
              });
            }}
          />
        </Popup>
      </div>
    );
  }
}
