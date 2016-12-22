import React, { Component } from 'react';
import { List, ListItem, ListItemContent, ListItemAction, Button } from 'react-mdl';
import { browserHistory } from 'react-router';
import { PageComponent } from '../components';
import styles from '../styles/containers/MainContainer.scss';

export default class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true
    };
  }
  componentDidMount() {
    if (!this.props.viewer.user) {
      this.props.relay.forceFetch({}, ({ done }) => {
        if (done) {
          this.setState({ fetching: false });
        }
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state.fetching || !nextState.fetching) {
      if (!nextProps.viewer.user && !this.props.viewer.user) {
        browserHistory.push('/login');
      }
    }
    return true;
  }
  getVideos() {
    const { user, videos } = this.props.viewer;
    let ret = [];
    if (user && videos && videos.edges) {
      ret = videos.edges.map(item => item.node);
    }
    return ret;
  }
  renderVideoItems() {
    const videos = this.getVideos();
    return videos.map((video, index) => (
      <ListItem twoLine key={index}>
        <ListItemAction>
          <img role='presentation' src={`./image/${video.thumbnail}.jpg`} className={styles.imgThumb} />
        </ListItemAction>
        <ListItemContent className={styles.iconItem}>
          <Button href='#' onClick={() => alert(video.id)} className={styles.title}>{video.title}</Button>
        </ListItemContent>
      </ListItem>
    ));
  }
  render() {
    return (
      <PageComponent heading='Video List'>
        <List style={{ width: '650px' }}>
          {this.renderVideoItems()}
        </List>
      </PageComponent>
    );
  }
}
