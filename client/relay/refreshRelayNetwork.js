import Relay from 'react-relay';
import {
  RelayNetworkLayer,
  retryMiddleware,
  urlMiddleware,
  authMiddleware,
  loggerMiddleware,
  gqErrorsMiddleware
} from 'react-relay-network-layer';

const configName = process.env.NODE_ENV || 'development';
console.info('configName', configName);
function isLoggedOut(res) {
  let logOut;
  try {
    logOut = res.json.data.viewer.profile === null;
  } catch (e) {
    logOut = false;
  }
  return logOut;
}

const redirectMiddleware = (redirect) => {
  console.info('redirectMiddleware');
  return next => req => next(req)
    .then((res) => {
      if (res.status === 401 || isLoggedOut(res)) {
        redirect();
      }
      return res;
    });
};

export default function refreshRelayNetwork(token) {
  const url = configName === 'development' ? 'http://localhost:3000/graphql' : 'https://blitz-content-review.appspot-preview.com/graphql';
  Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer(url, {
      headers: {
        Authorization: token
      },
    })
  );
}
