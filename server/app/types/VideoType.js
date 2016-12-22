import { globalIdField } from 'graphql-relay';
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { nodeInterface } from '../nodeInterface';
import { registerType } from '../type-registry';
import { getVideoById } from '../services/videos';
import { Video } from '../data/videos';

const VideoType = new GraphQLObjectType({
  name: 'Video',
  description: 'A person who uses our app',
  fields: () => ({
    id: globalIdField('Video'),
    title: {
      type: GraphQLString,
      description: 'video title'
    },
    description: {
      type: GraphQLString,
      description: 'video description'
    },
    width: {
      type: GraphQLInt,
      description: 'Video width',
    },
    height: {
      type: GraphQLInt,
      description: 'Video height',
    },
    thumbnail: {
      type: GraphQLString,
      description: 'Video thumb photo url path'
    },
    embed: {
      type: GraphQLString,
      description: 'Video url path'
    }
  }),
  interfaces: [nodeInterface],
});

registerType(Video, VideoType, getVideoById);
export default VideoType;
