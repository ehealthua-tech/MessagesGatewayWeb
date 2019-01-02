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
  fetchOperators
} from "./redux";
import { getOperators } from "../../../reducers";


@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchOperators())
})
@connect(
  state => ({
    operators: getOperators(state)
  }),
  null
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
    const { operators } = this.props;
    const { isOpened } = this.state;
    return (
      <div id="priority-page">
        <Helmet
          title="Оператори"
          meta={[{ property: "og:title", content: "Сторінка пріорітезації" }]}
        />

        <H1>Оператори</H1>
        {console.log(this.props.router)}

        <div className={styles.operators_container}>
          {operators.map((operator, index) => {
            const { name, id } = operator;
            return <Button
              className={styles.operator_type}
              key={index}
              onClick={() => this.props.router.push({
                pathname: `/operators/detail/${id}/`,
                params: {
                  name
                }
              })}>
              {operator.name}
            </Button>;
          })}
          <div>
            <Button onClick={this.openPopup}>
              Додати оператора
            </Button>
          </div>
        </div>

        <Popup
          title={<span>Віберіть тип оператора</span>}
          active={isOpened}
          onClose={() => this.setState({ isOpened: false })}
        >
          <div>
            {operators.map((operator, index) => {
              const { name, id } = operator.operator_type;
              return (
                <Button className={styles.operator_type}
                        key={index}
                        onClick={() => this.props.router.push({
                          pathname: `/operators/create/${id}/`,
                          params: {
                            name
                          }
                        })}
                >
                  {name}
                </Button>
              );
            })}
          </div>
        </Popup>
      </div>
    );
  }
}