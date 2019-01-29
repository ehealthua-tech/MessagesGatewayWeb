import React from 'react';
import Helmet from 'react-helmet';
import { H1 } from '../../../components/Title';

export default class DashboardPage extends React.Component {
  render() {
    return (
      <div id="dashboard-page">
        <Helmet title="Головна" meta={[{ property: 'og:title', content: 'Головна' }]} />

        <H1>Щоб розпочати роботу виберіть пункт в меню</H1>
      </div>
    );
  }
}
