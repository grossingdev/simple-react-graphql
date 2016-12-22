import Relay from 'react-relay';

const fatQuery = Relay.QL`
  fragment on loginPayload {
    user {
      id
      email
      name
      photo
      verified
      isAdmin
    }
    accessToken
  }
`;
export default class LoginMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation { login }
    `;
  }

  getVariables() {
    const { email, name, photo, verified, id, facebookToken, googleToken } = this.props;
    const isAdmin = false;
    return { id, email, name, photo, verified, isAdmin, facebookToken, googleToken };
  }

  getFatQuery() {
    return fatQuery;
  }
  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [
        fatQuery
      ],
    }];
  }
}
