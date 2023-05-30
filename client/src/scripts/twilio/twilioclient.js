import TwilioCallOperations from "../sms_calls/twiliocalloperations.js";
import { fetchTwilioClientJWT } from "./fetchtwilioclientjwt.js"

let twilioCallOps = null;

export const getTwilioCallOperations = () => {
  return twilioCallOps;
}

export const restartTwilioClientDevice = async (username, setSMSCallModal) => {
  destroyTwilioClientDevice();
  await twilioClient(username, setSMSCallModal);
}

export const destroyTwilioClientDevice = () => {
  if(twilioCallOps) {
    twilioCallOps.destroyDevice();
    twilioCallOps = null;
  }
}

export const twilioClient = async (username, setSMSCallModal) => {
    const payload = await fetchTwilioClientJWT(username);

    if(!payload?.twilioVirtualNo) {
      console.info('User has no twilio virtual number!\n' +
                   'Can\'t start Twilio.Device!');
      return;
    }

    if(payload.token) {
        const device = new Twilio.Device(payload.token, {
            logLevel: 1,
            // Set Opus as our preferred codec. 
            //Opus generally performs better, 
            //requiring less bandwidth and
            // providing better audio quality in 
            //restrained network conditions.
            codecPreferences: ["opus", "pcmu"],
          });
          addDeviceListeners(device);
          twilioCallOps = 
            new TwilioCallOperations(device, setSMSCallModal);
    }
}

const addDeviceListeners = (device) => {
    if(!device) {
      console.error('Twilio device is not initialized!');
      return;
    }

    device.on("registered", function () {
      console.log("Twilio.Device Ready to make and receive calls!");
    });

    device.on("error", function (error) {
      console.log("Twilio.Device Error: " + error.message);
    });
}

  