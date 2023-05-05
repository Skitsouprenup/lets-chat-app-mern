import JWT from './jwt.js';
import CallOperations from '../sms_calls/callops.js';

let sinchClientInstance = null;

export const instantiateSinchClient = (username) => {
  if (sinchClientInstance === null)
    sinchClientInstance = new SinchClientWrapper(username);
}

export const terminateSinchClient = () => {
  if (sinchClientInstance !== null) {
    sinchClientInstance.terminate();
    sinchClientInstance = null;
  }
}

export const getCallOperations = () => {
  return sinchClientInstance?.callOperations;
}

export const getUserId = () => {
  if (sinchClientInstance !== null)
    return sinchClientInstance.userId;
  else return '';
}

class SinchClientWrapper {
  constructor(userId) {
    this.userId = userId;

    const sinchClient = Sinch.getSinchClientBuilder()
      .applicationKey(process.env.SINCH_CLIENT_APP_KEY)
      .userId(userId)
      .environmentHost(process.env.SINCH_CLIENT_ENVIRONMENT_HOST)
      .build();

    sinchClient.addListener(this.#sinchClientListener());
    sinchClient.setSupportManagedPush('sinchclient-sw.js');
    sinchClient.start();

    this.sinchClient = sinchClient;
    this.callOperations = new CallOperations(sinchClient.callClient);
  }

  terminate() {
    this.sinchClient.terminate();
  }

  #sinchClientListener(jwt) {
    return {
      onCredentialsRequired: (_sinchClient, clientRegistration) => {

        /*
          Will put on the back-end in the future
        */
        return new JWT(
          process.env.SINCH_CLIENT_APP_KEY,
          process.env.SINCH_CLIENT_APP_SECRET, this.userId)
          .toJwt()
          .then(clientRegistration.register)
          .catch((error) => {
            clientRegistration.registerFailed();
            console.error(error);
          });
      },

      onClientStarted: (_sinchClient) => {
        console.log("Sinch - Start client succeded");
      },

      onClientFailed: (_sinchClient, error) => {
        console.log("Sinch - Start client failed");
        console.error(error);
      },
    };
  };

}