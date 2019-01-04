import React from "react";
import withStyles from "withStyles";
import Helmet from "react-helmet";
import SortableList from "../../../containers/forms/PriorityForm";
import { H1 } from "../../../components/Title";
import styles from "./styles.scss";
import { connect } from "react-redux";
import { provideHooks } from "redial";
import {
  fetchOperatorsTypes,
  showChangedOperatorsTypes,
  combineOperatorsTypes
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
  { showChangedOperatorsTypes, combineOperatorsTypes }
)
export default class OperatorsTypesListPage extends React.Component {
  onSortEnd = ({ oldIndex, newIndex }) => {
    const { operatorsTypes } = this.props;
    this.props.showChangedOperatorsTypes({
      operatorsTypes,
      oldIndex,
      newIndex
    });
  };

  render() {
    const { operatorsTypes, combineOperatorsTypes } = this.props;
    return (
      <div id="priority-page">
        <Helmet
          title="Список типів операторів"
          meta={[{ property: "og:title", content: "Список типів операторів" }]}
        />

        <H1>Список типів операторів</H1>

        <div>
          <SortableList
            className={styles.form}
            items={operatorsTypes}
            onSortEnd={this.onSortEnd}
            onSubmit={values =>
              combineOperatorsTypes({ operatorsTypes, values })
            }
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
