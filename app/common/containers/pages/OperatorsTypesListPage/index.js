import React from "react";
import withStyles from "withStyles";
import Helmet from "react-helmet";
import SortableList from "../../forms/OperatorTypesPriorityForm";
import { H1 } from "../../../components/Title";
import styles from "./styles.scss";
import { connect } from "react-redux";
import { provideHooks } from "redial";
import {
  fetchOperatorsTypes,
  showChangedOperatorsTypes,
  combineOperatorsTypes,
  deleteOperatorType
} from "./redux";
import { getOperatorsTypes } from "../../../reducers";

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchOperatorsTypes())
})
@connect(
  state => ({
    operatorsTypes: getOperatorsTypes(state)
  }),
  { showChangedOperatorsTypes, combineOperatorsTypes, deleteOperatorType }
)
export default class OperatorsTypesListPage extends React.Component {
  onSortEnd = ({ oldIndex, newIndex }) => {
    const { operatorsTypes, showChangedOperatorsTypes } = this.props;
    showChangedOperatorsTypes(operatorsTypes, oldIndex, newIndex);
  };

  render() {
    const {
      operatorsTypes,
      combineOperatorsTypes,
      deleteOperatorType
    } = this.props;

    return (
      <div id="priority-page">
        <Helmet
          title="Список типів операторів"
          meta={[{ property: "og:title", content: "Список типів операторів" }]}
        />

        <H1>Список типів операторів</H1>

        <div>
          <SortableList
            items={operatorsTypes}
            onSortEnd={this.onSortEnd}
            onDeleteType={id => deleteOperatorType(id)}
            onSubmit={values => combineOperatorsTypes(operatorsTypes, values)}
            useDragHandle
            hideSortableGhost={true}
            lockAxis="y"
            lockToContainerEdges
            lockOffset={["0%", "100%"]}
          />
        </div>
      </div>
    );
  }
}
