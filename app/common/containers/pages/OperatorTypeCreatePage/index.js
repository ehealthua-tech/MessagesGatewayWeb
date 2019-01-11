import React from "react";
import withStyles from "withStyles";
import Helmet from "react-helmet";

import { H1 } from "../../../components/Title";
import styles from "../OperatorsTypesListPage/styles.scss";
import OperatorTypeCreateForm from "../../forms/OperatorTypeCreateForm";
import { connect } from "react-redux";
import { addOperatorType } from "./redux";
import BackLink from "../../blocks/BackLink";

@withStyles(styles)
@connect(null, { addOperatorType })
export default class OperatorCreatePage extends React.Component {
  render() {
    const { router, addOperatorType } = this.props;
    return (
      <div id="operator-type-create-page">
        <Helmet
          title="Створення типу оператора"
          meta={[{ property: "og:title", content: "Створення типу оператора" }]}
        />

        <BackLink onClick={() => router.goBack()}>
          Повернутись до cписку типів операторів
        </BackLink>

        <H1>Створення типу оператора</H1>

        <OperatorTypeCreateForm
          onSubmit={values => addOperatorType(values, router)}
        />
      </div>
    );
  }
}
