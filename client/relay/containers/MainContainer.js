import Relay from 'react-relay';
import MainContainer from '../../ui/containers/MainContainer';

export default Relay.createContainer(MainContainer, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on ViewerType {
        user {
          name,
          email
        }
        videos(first: 10) {
          edges {
            node {
              id
              title
              width
              height
              thumbnail
              embed
            }
          }
        }
      }`
  }
});
