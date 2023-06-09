export default class CallOperations {
    #callClient;
    #modalState;
    #audio;
    //#confId;

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
        //this.#confId = null;

        //methods/functions
        this.#setCallState = null;
        this.#setCallModalState = null;
        this.#answerCall = null;
        this.#hangupCall = null;
    }

    /*
        This function is not used anymore 
        because this client is now invited
        via conferenceCallout in the server.
        onIncomingCall event of this client 
        will be triggered if a conference 
        invitation is received.

        The advantage of 'conferenceCallout'
        over 'callConference' is that 
        conference region can be changed 
        in 'conferenceCallout'
    */
    /*
    async createConference(remoteNumber) {
        this.#confId = uuidv4();
        
        //Invite client to a conference
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
        

        return this.#confId;
    }
    */

    #handleIncomingCall(call) {
        if (!this.#modalState && this.#setCallModalState) {
            this.#callListeners(call);
            this.#setCallEvents(call);
            this.#setCallModalState({
                type: 'CALL',
                isInbound: true,
                remoteUser: call.remoteUserId,
                provider: 'Sinch'
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

    /*
        Note: Adding a callback URL in 
        Voice & Audio > Callback URL textbox in 
        Settings section may break some functionalities
        of sinch client such as app-to-app call.

        There are two things that we can do:
        #1: Make sure that the callback URL is reachable
        In this case, we may handle incoming app-to-app call.
        This is just an assumption. I didn't fully observe
        this behavior very well. 

        If the above solution doesn't work,
        #2: remove the callback URL
        However, doing this loses the ability of
        your app to receive incoming PSTN call.
    */
    async makeCall(callee, callType) {
        let call = null;
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
                //this.#confId = null;
                this.#setCallStatus('Call Ended');
            },
        });
    }
}