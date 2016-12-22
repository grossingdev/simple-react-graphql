import Relay from 'react-relay';

const fatQuery = Relay.QL`
  fragment on signupPayload {
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
export default class SignupMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation { signup }
    `;
  }

  getVariables() {
    const { email, name, photo, verified, id } = this.props;
    const isAdmin = false;
    return { id, email, name, photo, verified, isAdmin };
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
