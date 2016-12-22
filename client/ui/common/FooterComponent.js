import React from 'react';
import { Footer as MDLFooter, FooterSection } from 'react-mdl';
import styles from './../styles/common/Footer.scss';

export default class Footer extends React.Component {
  static propTypes = {
  };

  render() {
    const { user } = this.props;
    return (
      <MDLFooter className={styles.root} size='mini'>
        <FooterSection type='middle'>
          {user && <span>Login with ♥ by <a href='#'>@{this.props.user.email}</a></span>}
        </FooterSection>
      </MDLFooter>
    );
  }
}
