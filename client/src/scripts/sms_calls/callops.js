import { v4 as uuidv4 } from 'uuid';

export default class CallOperations {
    #callClient;
    #modalState;
    #audio;
    #confId;

    #setCallState;
    #setCallModalState;
    #answerCall;
    #hangupCall;

    constructor(callClient) {
        callClient.addListener({
            onIncomingCall: (_client, call) => {
                this.#handleIncomingCall(call);
            },
        });

        //fields
        this.#callClient = callClient;
        this.#modalState = null;
        this.#audio = null;
        this.#confId = null;

        //methods/functions
        this.#setCallState = null;
        this.#setCallModalState = null;
        this.#answerCall = null;
        this.#hangupCall = null;
    }

    /*
        TODO: include for next refactor
    */
    async createConference(remoteNumber) {
        this.#confId = uuidv4();
        //Invite client to a conference
        /*
        const call = await this.#callClient.callConference(this.#confId);

        if (!this.#modalState && this.#setCallModalState) {
            this.#callListeners(call);
            //this.#setCallEvents(call);
            this.hangupCall = () => call.hangup();
            this.#setCallModalState({
                type: 'CALL',
                isInbound: true,
                remoteUser: remoteNumber,
                acceptHide: true
            });
            this.#audio = new Audio();
            this.#audio.srcObject = call.incomingStream;
            this.#audio.play();
        }
        */

        return this.#confId;
    }

    #handleIncomingCall(call) {
        if (!this.#modalState && this.#setCallModalState) {
            this.#callListeners(call);
            this.#setCallEvents(call);
            this.#setCallModalState({
                type: 'CALL',
                isInbound: true,
                remoteUser: call.remoteUserId
            });
            this.#audio = new Audio();
            this.#audio.srcObject = call.incomingStream;
        }
    }

    #setCallEvents(call) {
        this.answerCall = () => {
            this.#audio.play();
            call['answer']();
        };
        this.hangupCall = () => call.hangup();
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

    async makeCall(callee, callType) {
        const call = null;
        if (callType === 'App')
            call = await this.#callClient.callUser(callee);
        else if (callType === 'PSTN')
            call = await this.#callClient.callPhoneNumber(callee);

        this.#callListeners(call);
        this.hangupCall = () => call.hangup();

        this.#audio = new Audio();
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
                this.#audio = null;
                this.#confId = null;
                this.#setCallStatus('Call Ended');
            },
        });
    }
}