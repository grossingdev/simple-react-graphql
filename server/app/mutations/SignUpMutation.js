import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';
import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from 'graphql';
import { UserType } from '../types';
import { registerUser } from '../../services/googleDataStore';

const signupMutation = mutationWithClientMutationId({
  name: 'signup',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    verified: {
      type: GraphQLBoolean
    },
    isAdmin: {
      type: GraphQLBoolean
    },
    photo: {
      type: new GraphQLNonNull(GraphQLString)
    },
  },
  outputFields: {
    user: {
      type: UserType
    },
    accessToken: {
      type: GraphQLString
    }
  },

  mutateAndGetPayload: async (input, request) => {
    console.log('signupMutation', input, request);
    const accessToken = toGlobalId('Token', input.id);
    const data = {
      id: input.id,
      email: input.email,
      name: input.name,
      photo: input.photo,
      isAdmin: false,
      verified: input.verified,
      accessToken
    };
    const user = await registerUser(data);
    return {
      user,
      accessToken: user ? accessToken : null
    };
  }
});
export default signupMutation;
