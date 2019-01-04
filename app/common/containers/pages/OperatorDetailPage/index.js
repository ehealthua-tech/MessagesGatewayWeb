import React from "react";
import withStyles from "withStyles";
import Helmet from "react-helmet";
import { H1 } from "../../../components/Title";
import styles from "../OperatorsTypesListPage/styles.scss";
import OperatorDetailForm from "../../forms/OperatorDetailForm";
import { provideHooks } from "redial";
import BackLink from "../../../containers/blocks/BackLink";
import { connect } from "react-redux";
import { getOperatorsDetailFormFields } from "../../../reducers";
import { fetchOperator, updateOperator } from "./redux";

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(fetchOperator(id))
})
@connect(
  state => ({
    operatorFields: getOperatorsDetailFormFields(state)
  }),
  { updateOperator }
)
export default class OperatorDetailPage extends React.Component {
  render() {
    const { operatorFields, updateOperator } = this.props;
    return (
      <div id="operator-detail-page">
        <Helmet
          title="Деталі  оператора"
          meta={[{ property: "og:title", content: "Деталі  оператора" }]}
        />

        <BackLink onClick={() => this.props.router.goBack()}>
          Повернутись до cписку операторів
        </BackLink>

        <H1>Деталі оператора </H1>

        <OperatorDetailForm
          initialValues={operatorFields}
          onSubmit={values => updateOperator(values)}
        />
      </div>
    );
  }
}
