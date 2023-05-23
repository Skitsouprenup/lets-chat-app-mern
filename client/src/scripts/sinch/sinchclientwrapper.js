import CallOperations from '../sms_calls/sinchcalloperations.js';
import { fetchSinchClientJWT } from './fetchsinchclientjwt.js';

let sinchClientInstance = null;

export const instantiateSinchClient = async (username) => {
  if (sinchClientInstance === null) {
    const jwt = await fetchSinchClientJWT(username);
    sinchClientInstance = new SinchClientWrapper(username, jwt);
  }
}

export const instantiateSinchClientLoggedIn =
  async (username, setSMSCallModal) => {
    if (sinchClientInstance === null) {
      const jwt = await fetchSinchClientJWT(username);
      sinchClientInstance = new SinchClientWrapper(username, jwt);
      getSinchCallOperations().setCallModalStateSetter(setSMSCallModal);
    }
  }

export const terminateSinchClient = () => {
  if (sinchClientInstance !== null) {
    sinchClientInstance.terminate();
    sinchClientInstance = null;
  }
}

export const getSinchCallOperations = () => {
  return sinchClientInstance?.callOperations;
}

export const getUserId = () => {
  if (sinchClientInstance !== null)
    return sinchClientInstance.userId;
  else return '';
}

class SinchClientWrapper {
  constructor(userId, jwt) {

    const sinchClient = Sinch.getSinchClientBuilder()
      .applicationKey(process.env.SINCH_CLIENT_APP_KEY)
      .userId(userId)
      .callerIdentifier(process.env.SINCH_VIRTUAL_NUMBER_TRIAL)
      .environmentHost(process.env.SINCH_CLIENT_ENVIRONMENT_HOST)
      .build();

    sinchClient.addListener(this.#sinchClientListener(jwt));
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
        return clientRegistration.register(jwt.key);
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