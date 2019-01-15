import React from "react";
import withStyles from "withStyles";
import Helmet from "react-helmet";
import { H1 } from "../../../components/Title";
import styles from "../OperatorsTypesListPage/styles.scss";
import OperatorCreateForm from "../../forms/OperatorCreateForm";
import BackLink from "../../blocks/BackLink";
import { connect } from "react-redux";
import { addOperator } from "./redux";

@withStyles(styles)
@connect(null, { addOperator })
export default class OperatorCreatePage extends React.Component {
  render() {
    const { fields, id, name } = this.props.location.state;
    const { router, addOperator } = this.props;

    return (
      <div id="operator-type-create-page">
        <Helmet
          title="Створення  оператора"
          meta={[{ property: "og:title", content: "Створення  оператора" }]}
        />
        <BackLink onClick={() => router.goBack()}>
          Повернутись до cписку операторів
        </BackLink>

        <H1>Створення оператора </H1>

        <OperatorCreateForm
          fields={fields}
          onSubmit={values => addOperator({ values, id, name, router })}
        />
      </div>
    );
  }
}
