import React from "react";
import { connect } from "react-redux";
import { provideHooks } from "redial";
import withStyles from "withStyles";
import Helmet from "react-helmet";

import { H1 } from "../../../components/Title";
import SystemConfigurationForm from "../../../containers/forms/ConfigurationForm";

import { getConfiguration } from "../../../reducers";

import { fetchConfiguration, updateConfiguration } from "./redux";
import styles from "./styles.scss";

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchConfiguration())
})
@connect(
  state => ({
    configuration: getConfiguration(state)
  }),
  { updateConfiguration }
)
export default class SystemConfigurationPage extends React.Component {
  render() {
    const { updateConfiguration, configuration } = this.props;
    return (
      <div id="system-configuration-page">
        <Helmet
          title="Конфігурація системи"
          meta={[{ property: "og:title", content: "Конфігурація системи" }]}
        />

        <H1>Конфігурація системи</H1>

        <SystemConfigurationForm
          initialValues={configuration}
          onSubmit={values => updateConfiguration({ values })}
        />
      </div>
    );
  }
}
