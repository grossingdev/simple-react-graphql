import {
  save,
  batchSave,
  runQuery
} from './api';

const VIDEO_KEY = 'BLITZ_VIDEO';

export async function saveVideo(item) {
  let ret = null;
  try {
    const entity = {
      key: [VIDEO_KEY, item.id],
      data: item,
    };
    ret = await save(entity);
  } catch (err) {
    console.info('saveVideo err', err);
  }
  return ret;
}

export async function saveVideos(items) {
  let ret = null;
  try {
    const entities = items.map(item => ({
      key: [VIDEO_KEY, item.id],
      data: item,
    }));
    ret = await batchSave(entities);
  } catch (err) {
    console.info('saveVideos err', err);
  }
  return ret;
}

export async function runVideoQuery(filters) {
  let ret = [];
  try {
    ret = await runQuery(VIDEO_KEY, filters);
    ret = ret[0];
  } catch (err) {
    console.log('queryVideo err', err);
  }
  return ret;
}
