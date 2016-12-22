import { connectionDefinitions } from 'graphql-relay';
import { VideoType } from '../types';

const connection = connectionDefinitions({ name: 'Video', nodeType: VideoType });
export const VideoEdge = connection.edgeType;
export const VideoConnection = connection.connectionType;
