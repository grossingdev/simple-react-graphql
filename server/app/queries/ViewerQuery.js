import { ViewerType } from '../types';

const ViewerQuery = {
  description: 'Viewer query',
  type: ViewerType,
  resolve: async (arg1, arg2, { request }) => ({})
};

export default ViewerQuery;
