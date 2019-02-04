import React from 'react';
import withStyles from 'withStyles';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { H1 } from '../../../components/Title';
import styles from './styles.scss';
import Button from '../../../components/Button';
import DeleteButton from '../../../components/DeleteButton';
import { Popup } from '../../../components/Popup';
import {
  fetchAllKeysPairs,
  activateKeyPair,
  deactivateKeyPair,
  deleteKeyPair,
  generateKeyPair,
} from './redux';
import { getKeysPairs } from '../../../reducers';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchAllKeysPairs()),
})
@connect(
  state => ({
    keysPairs: getKeysPairs(state),
  }),
  { activateKeyPair, deactivateKeyPair, deleteKeyPair, generateKeyPair }
)
export default class OperatorsTypesListPage extends React.Component {
  state = {
    isOpened: false,
    id: '',
  };

  openPopup = (id) => {
    this.setState({
      isOpened: true,
      id,
    });
  };

  render() {
    const {
      keysPairs,
      activateKeyPair,
      deactivateKeyPair,
      deleteKeyPair,
      generateKeyPair,
    } = this.props;
    const { isOpened, id } = this.state;

    return (
      <div id="priority-page">
        <Helmet
          title="Конфігурація ключів"
          meta={[{ property: 'og:title', content: 'Конфігурація ключів' }]}
        />

        <H1>Конфігурація ключів</H1>

        {keysPairs.length ? (
          keysPairs.map((item, index) => {
            const { id, key, active } = item;
            return (
              <div className={styles.key_pair_item} key={index}>
                <div>
                  <div className={styles.code_item}>
                    user <code> {id}</code>
                  </div>
                  <div className={styles.code_item}>
                    key <code> {key}</code>
                  </div>
                </div>
                <DeleteButton onClick={() => this.openPopup(id)} />
                <Button
                  className={styles.detail_button}
                  onClick={active ? () => deactivateKeyPair({ id }) : () => activateKeyPair({ id })}
                >
                  {active ? (
                    <div className={styles.deactive_button}>Деактувати</div>
                  ) : (
                    <div className={styles.active_button}>Aктивувати</div>
                  )}
                </Button>
              </div>
            );
          })
        ) : (
          <div className={styles.not_found}>
            <h2>Нажаль, жодного ключа не додано</h2>
          </div>
        )}

        <Button onClick={() => generateKeyPair()}>Згенерувати новий ключ</Button>

        <Popup
          title={<span>Ви впевнені, що хочете видалити ключ?</span>}
          active={isOpened}
          onClose={() => this.setState({ isOpened: false })}
        >
          <div className={styles.buttons_block}>
            <Button
              onClick={() =>
                deleteKeyPair(id).then(() => {
                  this.setState({ isOpened: false });
                })
              }
            >
              Видалити
            </Button>
            <Button onClick={() => this.setState({ isOpened: false })}>Cкасувати</Button>
          </div>
        </Popup>
      </div>
    );
  }
}
