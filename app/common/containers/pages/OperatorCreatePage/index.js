import React from "react";
import withStyles from "withStyles";
import Helmet from "react-helmet";
import { H1 } from "../../../components/Title";
import styles from "../OperatorsTypesListPage/styles.scss";
import OperatorCreateForm from "../../forms/OperatorCreateForm";
import BackLink from "../../blocks/BackLink";
import { connect } from "react-redux";
import { addOperator } from "./redux";
import { provideHooks } from "redial";
import { fetchOperator } from "../OperatorDetailPage/redux";
import { getOperatorsDetailFormFields } from "../../../reducers";

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(fetchOperator(id))
})
@connect(
  state => ({
    operatorFields: getOperatorsDetailFormFields(state)
  }),
  { addOperator }
)
export default class OperatorCreatePage extends React.Component {
  render() {
    const { fields } = this.props.location.state;
    const { operatorFields, addOperator } = this.props;
    return (
      <div id="operator-type-create-page">
        <Helmet
          title="Створення  оператора"
          meta={[{ property: "og:title", content: "Створення  оператора" }]}
        />
        <BackLink onClick={() => this.props.router.goBack()}>
          Повернутись до cписку операторів
        </BackLink>
        <H1>Створення оператора </H1>

        <OperatorCreateForm
          intialValues={operatorFields}
          fields={fields}
          onSubmit={values => addOperator(values)}
        />
      </div>
    );
  }
}
