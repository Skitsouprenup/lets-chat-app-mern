import React from 'react';

import InOutBoundSMS from '../modals/inoutboundsmscalls/InOutBoundSMS';
import InOutBoundCall from '../modals/inoutboundsmscalls/InOutBoundCall';

const SMSCallModal = ({
    smsCallModal, setSMSCallModal
}) => {

    switch (smsCallModal?.type) {

        case 'SMS':
            return <InOutBoundSMS
                phoneNo={smsCallModal?.phoneNo}
                setSMSCallModal={setSMSCallModal}
                provider={smsCallModal?.provider}
                username={smsCallModal?.username} />

        case 'CALL':
            return <InOutBoundCall
                input={smsCallModal?.input}
                setSMSCallModal={setSMSCallModal}
                provider={smsCallModal?.provider}
                isInbound={smsCallModal?.isInbound ? true : false}
                remoteUser={smsCallModal?.remoteUser}
                acceptHide={smsCallModal?.acceptHide ? smsCallModal.acceptHide : false} />;

        default:
            return null;
    }
};

export default SMSCallModal;