import {
  save,
  getEntity
} from './api';

const KEY = 'BLITZ_USERS';
export async function registerUser(user) {
  let ret = null;
  try {
    const entity = {
      key: [KEY, user.id],
      data: user,
    };
    await save(entity);
    ret = user;
  } catch (err) {
    console.info('registerUser err', err);
  }
  return ret;
}
export async function getUserByID(id) {
  let ret = null;
  try {
    const user = await getEntity([KEY, id]);
    if (user) {
      ret = user;
    }
  } catch (err) {
    console.info('getUserByID err', err);
  }
  return ret;
}
