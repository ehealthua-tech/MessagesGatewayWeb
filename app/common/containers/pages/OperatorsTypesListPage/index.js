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
    // operatorsTypesList: getOperatorsTypes(state)
  }),
  { showChangedOperatorsTypes, combineOperatorsTypes }
)
export default class OperatorsTypesListPage extends React.Component {

  // state = {
  //   isOpened: false
  // };

  // componentDidMount() {
  //   const { fetchOperatorsTypes } = this.props;
  //   fetchOperatorsTypes();
  // }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { operatorsTypes } = this.props;
    this.props.showChangedOperatorsTypes({ operatorsTypes, oldIndex, newIndex });
  };

  render() {
    const { operatorsTypes } = this.props;
    // const { isOpened } = this.state;
    return (
      <div id="priority-page">
        <Helmet
          title="Сторінка пріорітезації"
          meta={[{ property: "og:title", content: "Сторінка пріорітезації" }]}
        />

        <H1>Визначення пріоритетів</H1>

        <div>
          <SortableList
            className={styles.form}
            items={operatorsTypes}
            onSortEnd={this.onSortEnd}
            // openPopup={() => (this.setState({ isOpened: true }))}
            onSubmit={values => this.props.combineOperatorsTypes({ operatorsTypes, values })}
            useDragHandle
            hideSortableGhost={true}
            lockAxis="y"
            lockToContainerEdges
            lockOffset={["0%", "100%"]}
          />
        </div>

        {/*<Popup*/}
        {/*title={<span>Віберіть тип оператора</span>}*/}
        {/*active={isOpened}*/}
        {/*onClose={() => this.setState({ isOpened: false })}*/}
        {/*>*/}
        {/*<div>*/}
        {/*{operatorsTypesList.map((operatorType, index) => (*/}
        {/*<Button className={styles.operator_type}*/}
        {/*key={index}*/}
        {/*to={{*/}
        {/*pathname:`create-operator/${operatorType.id}`*/}
        {/*operator*/}
        {/*}}*/}
        {/*>*/}
        {/*{operatorType.name}*/}
        {/*</Button>*/}
        {/*))}*/}
        {/*</div>*/}
        {/*</Popup>*/}

      </div>
    );
  }
}