import React from 'react';
import { Link } from 'react-router';
import { Layout, Header, Navigation, Drawer, Button } from 'react-mdl';
import styles from '../styles/common/Navbar.scss';

export default class Navbar extends React.Component {

  onLogout = () => {
    this.props.onLogout();
  };
  render() {
    const { user } = this.props;
    return (
      <Layout className={styles.root}>
        <Header title={<Link to='/' />} scroll>
          {!user ?
            <Navigation>
              <Link to='/signup'>Sign up</Link>
              <Link to='/login'>Login</Link>
            </Navigation> :
            <Button className={styles.logout} href='#' onClick={this.onLogout}>Logout {user.name}</Button>
          }
        </Header>
        <Drawer title={<Link to='/' style={{ fontSize: '1.5em' }} />} className='mdl-layout--small-screen-only'>
          {!user ?
            <Navigation>
              <Link to='/signup'>Sign up</Link>
              <Link to='/login'>Login</Link>
            </Navigation> :
            <Button href='#' onClick={this.onLogout}>Logout {user.name}</Button>
          }
        </Drawer>
      </Layout>
    );
  }
}
