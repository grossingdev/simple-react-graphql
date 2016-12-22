import { GraphQLObjectType } from 'graphql';
import { UserQuery, VideoQuery } from '../queries';

const ViewerType = new GraphQLObjectType({
  name: 'ViewerType',
  description: 'A viewer object',
  fields: () => ({
    user: UserQuery,
    videos: VideoQuery,
  })
});

export default ViewerType;
