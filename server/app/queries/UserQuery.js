import { fromGlobalId } from 'graphql-relay';
import { GraphQLString } from 'graphql';
import { UserType } from '../types';
import { getAccessTokenFromHeader } from '../services/token';
import { getUserByID } from '../../services/googleDataStore/user';

const UserQuery = {
  description: 'Get User information',
  type: UserType,
  args: {
    id: {
      type: GraphQLString
    }
  },
  resolve: async (arg1, args, { request }) => {
    let user = null;
    let userId = null;
    try {
      const token = getAccessTokenFromHeader(request);
      if (args.id) {
        userId = fromGlobalId(args.id).id;
      } else if (token) {
        userId = fromGlobalId(token).id;
      }
      console.log('UserID ', token, userId);
      if (userId && userId.length > 0) {
        user = await getUserByID(userId);
      }
    } catch (err) {
      console.log('UserQuery err', err);
    }
    console.log('UserQuery result', user);
    return user;
  }
};

export default UserQuery;
