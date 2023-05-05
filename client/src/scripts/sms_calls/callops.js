
export default class CallOperations {
    #callClient;
    #modalState;
    #audio;

    #setCallState;
    #setCallModalState;
    #answerCall;
    #hangupCall;

    constructor(callClient) {
        callClient.addListener({
            onIncomingCall: (_client, call) => {
                if (!this.#modalState && this.#setCallModalState) {
                    this.#callListeners(call);
                    this.#setCallEvents(call);
                    this.#setCallModalState({
                        type: 'CALL',
                        isInbound: true,
                        remoteUser: call.remoteUserId
                    });
                    this.#audio.srcObject = call.incomingStream;
                }
            },
        });

        //fields
        this.#callClient = callClient;
        this.#modalState = null;
        this.#audio = new Audio();

        //methods/functions
        this.#setCallState = null;
        this.#setCallModalState = null;
        this.#answerCall = null;
        this.#hangupCall = null;
    }

    #setCallEvents(call) {
        this.answerCall = () => {
            this.#audio.play();
            call['answer']();
        };
        this.hangupCall = () => call['hangup']();
    }

    answerCall() {
        if (this.#answerCall) this.#answerCall();
    }

    hangupCall() {
        if (this.#hangupCall) this.#hangupCall();
    }

    //Call Modal Value
    setModalState(modalState) {
        this.#modalState = modalState;
    }

    //Call Modal Setter
    setCallModalStateSetter(setCallModalState) {
        this.#setCallModalState = setCallModalState;
    }

    //Call State
    setCallStateSetter(setCallState) {
        this.#setCallState = setCallState;
    }

    #setCallStatus(status) {
        if (this.#setCallState) this.#setCallState(status);
    }

    async makeCall(callee) {
        const call = await this.#callClient.callUser(callee);
        this.#callListeners(call);
        this.hangupCall = () => call['hangup']();

        this.#audio.srcObject = call.incomingStream;
        this.#audio.play();
    }

    #callListeners(call) {
        call.addListener({
            onCallProgressing: () => {
                this.#setCallStatus('In-Progress');
            },
            onCallEstablished: () => {
                this.#setCallStatus('Call Established');
            },
            onCallEnded: () => {
                this.#modalState = '';
                this.#audio.pause();
                this.#audio.srcObject = null;
                this.#setCallStatus('Call Ended');
            },
        });
    }
}