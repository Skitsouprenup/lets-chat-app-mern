
export default class TwilioCallOperations {
    #smsCallModalState;
    #smsCallModalStateSetter;
    #callStatusSetter;

    #ongoingCall;
    #device;

    constructor(device, smsCallModalStateSetter) {
        this.#smsCallModalState = null;
        this.#smsCallModalStateSetter = smsCallModalStateSetter;
        this.#callStatusSetter = null;

        this.#ongoingCall = null;
        this.#device = device;

        this.#device.on("incoming", this.#handleIncomingCall.bind(this));
        // Device must be registered in order to receive incoming calls
        this.#device.register();
    }

    destroyDevice() {
      this.#device.destroy();
    }

    setCallStatusSetter(callStatusSetter) {
      this.#callStatusSetter = callStatusSetter;
    }

    setSMSCallModalState(smsCallModalState) {
      this.#smsCallModalState = smsCallModalState;
    }

    answerCall() {
        if(!this.#ongoingCall) return;

        this.#ongoingCall.accept();
        this.#callStatusSetter('Call Established');
        console.log("Accepted incoming call.");
    }

    //https://www.twilio.com/docs/voice/twiml/reject
    rejectCall() {
        if(!this.#ongoingCall) return;

        this.#ongoingCall.reject();
        console.log("Rejected incoming call");
    }

    //https://www.twilio.com/docs/voice/twiml/hangup
    hangupCall() {
        if(!this.#ongoingCall) return;

        this.#ongoingCall.disconnect();
        console.log("Hanging up incoming call");
    }

    #handleIncomingCall(call) {
      console.log(`Incoming call from ${call.parameters.From}`);
      if (!this.#smsCallModalState && 
           this.#smsCallModalStateSetter) {
          this.#ongoingCall = call;
          this.#setCallEvents();
          this.#smsCallModalStateSetter({
              type: 'CALL',
              isInbound: true,
              remoteUser: call.parameters.From,
              provider: 'Twilio'
          });
      }
    }

    async makeOutgoingCall(inputValue) {
        var params = {
          // get the phone number to call from the DOM
          To: inputValue,
        };
    
        if (this.#device) {
          console.log(`Attempting to call ${params.To} ...`);
    
          // Twilio.Device.connect() returns a Call object
          const call = await this.#device.connect({ params });
          this.#ongoingCall = call;
          this.#setCallEvents();
    
        } else {
          console.log("Unable to make call.");
        }
    }

    #setCallEvents() {
      if(!this.#ongoingCall) return;

      //add listeners to the Call
      //"accepted" means the call has finished connecting and the state is now "open"
      this.#ongoingCall.on("accept", () => {
        this.#callStatusSetter('Call Established');
      });
      this.#ongoingCall.on("disconnect", () => {
        this.#callStatusSetter('Call Ended');
        this.#ongoingCall = null;
      });
      this.#ongoingCall.on("cancel", () => {
        this.#callStatusSetter('Call Ended');
        this.#ongoingCall = null;
      });
    }
}