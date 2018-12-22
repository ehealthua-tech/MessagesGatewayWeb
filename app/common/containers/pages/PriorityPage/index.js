import React from "react";
import withStyles from "withStyles";
import Helmet from "react-helmet";
import SortableList from "../../../containers/forms/PriorityForm";
import { H1 } from "../../../components/Title";
import styles from "./styles.scss";
import { connect } from "react-redux";
import { provideHooks } from "redial";
import { fetchPriority, showChangedPriority, updatePriorityState } from "./redux";
import { getPriority } from "../../../reducers";

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchPriority())
})
@connect(
  state => ({
    priorityState: getPriority(state)
  }),
  { showChangedPriority, updatePriorityState }
)
export default class PriorityPage extends React.Component {

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { priorityState } = this.props;
    this.props.showChangedPriority({ priorityState, oldIndex, newIndex });
  };

  render() {
    const { priorityState } = this.props;
    return (
      <div id="priority-page">
        <Helmet
          title="Сторінка пріорітезації"
          meta={[{ property: "og:title", content: "Сторінка пріорітезації" }]}
        />

        <H1>Визначення пріоритетів</H1>

        <div>
          <SortableList
            classname={styles.form}
            items={priorityState}
            onSortEnd={this.onSortEnd}
            onSubmit={values => this.props.updatePriorityState({ priorityState, values })}
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