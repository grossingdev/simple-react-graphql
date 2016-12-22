import { fromGlobalId, connectionArgs, connectionFromArray } from 'graphql-relay';
import { getAccessTokenFromHeader } from '../services/token';
import { getUserByID } from '../../services/googleDataStore/user';
import { runVideoQuery } from '../../services/googleDataStore/video';
import { VideoConnection } from '../connections';

const VideoQuery = {
  description: 'Get Videos information',
  type: VideoConnection,
  args: connectionArgs,
  resolve: async (arg1, args, { request }) => {
    let user = null;
    let userId = null;
    let videos = [];
    try {
      const token = getAccessTokenFromHeader(request);
      if (token) {
        userId = fromGlobalId(token).id;
      }
      if (userId && userId.length > 0) {
        user = await getUserByID(userId);
      }
      if (user) {
        videos = await runVideoQuery([]);
      }
    } catch (err) {
      console.log('VideoQuery err', err);
    }
    return connectionFromArray(videos, args);
  }
};

export default VideoQuery;
