import React from 'react';
import { Provider } from 'react-redux';

import { Router, applyRouterMiddleware } from 'react-router';
import { useRedial } from 'react-router-redial';

import { I18nextProvider } from 'react-i18next';

const trackPage = (route) => {};

export default class RootComponent extends React.Component {
  constructor(props) {
    super(props);
    // History and routes in Router can't be replaced
    this.routes = props.routes;
    this.history = props.history;

    // Store in Provider can't be replaced
    this.store = props.store;
  }
  render() {
    const { renderProps, locals, i18n } = this.props;

    const { history, routes, store } = this;

    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <Router
            {...renderProps}
            history={history}
            routes={routes}
            render={applyRouterMiddleware(
              useRedial({
                locals,
                beforeTransition: ['fetch'],
                afterTransition: ['defer', 'done'],
                parallel: true,
                initialLoading:
                  process.env.NODE_ENV === 'production' ? null : () => <div>Loading...</div>,
                onCompleted: (transition) => {
                  if (transition === 'beforeTransition') {
                    window.scrollTo(0, 0);
                  }
                },
              })
            )}
          />
        </Provider>
      </I18nextProvider>
    );
  }
}
