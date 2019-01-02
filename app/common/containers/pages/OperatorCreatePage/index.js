import React from "react";
import withStyles from "withStyles";
import Helmet from "react-helmet";
import { H1 } from "../../../components/Title";
import styles from "../OperatorsTypesListPage/styles.scss";
import OperatorCreateForm from "../../forms/OperatorCreateForm";
import BackLink from "../../blocks/BackLink";


@withStyles(styles)
export default class OperatorCreatePage extends React.Component {
  render() {
    return (
      <div id="operator-type-create-page">
        <Helmet
          title="Створення  оператора"
          meta={[{ property: "og:title", content: "Створення  оператора" }]}
        />

        <BackLink onClick={() => this.props.router.goBack()}>
          Повернутись до cписку операторів
        </BackLink>

        <H1>Створення оператора з типом {this.props.location.state.name}</H1>


      </div>
    );
  }
}