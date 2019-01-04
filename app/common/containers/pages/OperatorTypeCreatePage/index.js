import React from "react";
import withStyles from "withStyles";
import Helmet from "react-helmet";

import { H1 } from "../../../components/Title";
import styles from "../OperatorsTypesListPage/styles.scss";

@withStyles(styles)
export default class OperatorCreatePage extends React.Component {
  render() {
    return (
      <div id="operator-type-create-page">
        <Helmet
          title="Створення типу оператора"
          meta={[{ property: "og:title", content: "Створення типу оператора" }]}
        />

        <H1>Створення типу оператора</H1>
      </div>
    );
  }
}
