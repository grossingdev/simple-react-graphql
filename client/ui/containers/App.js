import React from 'react';
import { browserHistory } from 'react-router';
import 'react-mdl/extra/css/material.cyan-red.min.css';
import 'normalize.css/normalize.css';
import Navbar from '../common/Navbar';
import Footer from '../common/FooterComponent';
import styles from '../styles/containers/App.scss';
import refreshRelayNetwork from '../../relay/refreshRelayNetwork';

export default class App extends React.Component {
  onLogout = () => {
    browserHistory.push('/login');
    localStorage.setItem('accessToken', '');
    refreshRelayNetwork('');
    this.props.relay.forceFetch();
  };
  render() {
    const { user } = this.props.viewer;
    return (
      <div className={styles.root}>
        <Navbar user={user} onLogout={this.onLogout} />
        <div className={styles.greeting}>
          <h1 className={styles.sawasdee}>Content Revie System</h1>
        </div>
        <div className={styles.content}>
          {this.props.children}
        </div>
        <Footer user={user} />
      </div>
    );
  }
}
