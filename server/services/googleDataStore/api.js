import { datastore } from 'google-cloud';

const dataStoreClient = datastore({
  projectId: 'blitz-content-review',
  keyFilename: './config/google_api_service_key.json'
});

export async function save(item) {
  let ret = null;
  try {
    const key = dataStoreClient.key(item.key);
    ret = await dataStoreClient.save({ key, data: item.data });
  } catch (err) {
    console.log('save err', err);
  }
  return ret;
}

export async function batchSave(items) {
  let ret = null;
  try {
    const entities = items.map((item) => {
      const key = dataStoreClient.key(item.key);
      const data = item.data;
      return { key, data };
    });
    ret = await dataStoreClient.upsert(entities);
  } catch (err) {
    console.log('batchSave err', err);
  }
  return ret;
}

export async function lookupEntities(_keys) {
  let ret = null;
  try {
    const keys = _keys.map(item => dataStoreClient.key(item));
    const result = await dataStoreClient.get(keys);
    ret = result[0];
  } catch (err) {
    console.log('lookupEntities err', err);
  }
  return ret;
}

export async function getEntity(key) {
  let ret = null;
  try {
    const result = await dataStoreClient.get(dataStoreClient.key(key));
    ret = result[0];
  } catch (err) {
    console.log('getEntity err', err);
  }
  return ret;
}

export async function deleteEntities(_keys) {
  let ret = null;
  try {
    const keys = _keys.map(item => dataStoreClient.key(item));
    ret = await dataStoreClient.delete(keys);
  } catch (err) {
    console.log('deleteEntities err', err);
  }
  return ret;
}

export async function runQuery(namespace, filters) {
  let ret = null;
  try {
    let query = dataStoreClient.createQuery(namespace);
    filters.forEach((item) => {
      query = query.filter(item.fieldName, item.condition, item.value);
    });
    ret = await dataStoreClient.runQuery(query);
  } catch (err) {
    console.log('runQuery err', err);
  }
  return ret;
}
