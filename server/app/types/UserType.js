import { globalIdField } from 'graphql-relay';
import { GraphQLObjectType, GraphQLBoolean, GraphQLString } from 'graphql';
import { nodeInterface } from '../nodeInterface';
import { registerType } from '../type-registry';
import { getUserByID } from '../services/user';
import { User } from '../data/users';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => ({
    id: globalIdField('User'),
    email: {
      type: GraphQLString,
      description: 'user email'
    },
    name: {
      type: GraphQLString,
      description: 'user name'
    },
    verified: {
      type: GraphQLBoolean,
      description: 'status for verified user',
      defaultValue: false,
    },
    isAdmin: {
      type: GraphQLBoolean,
      description: 'admin status for user',
      defaultValue: false,
    },
    photo: {
      type: GraphQLString,
      description: 'user photo url path'
    }
  }),
  interfaces: [nodeInterface],
});

registerType(User, UserType, getUserByID);
export default UserType;
