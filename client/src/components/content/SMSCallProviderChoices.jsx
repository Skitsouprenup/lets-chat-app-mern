import React from 'react';
import modalStyles from '../../css/content/modals/modals.module.css';

const SMSCallProviderChoices = (
    {
        providerType, 
        setProviderType,
        twilioVirtualNoActive,
        sinchVirtualNoActive,
    }
) => {

    const switchProvider = () => {
        providerType === 'Sinch' ?
        setProviderType('Twilio') :
        setProviderType('Sinch');
    }

    return (
        <div className={modalStyles['provider-options']}>
            <p>Provider</p>
            <div className={modalStyles['provider-choices']}>
                <button 
                    className={
                        providerType === 'Twilio' ?
                        modalStyles['choice-active'] :
                        modalStyles['choice-inactive']
                    }
                    onClick={switchProvider}
                    disabled={!twilioVirtualNoActive}>
                    Twilio
                </button>
                <button 
                    className={
                        providerType === 'Sinch' ?
                        modalStyles['choice-active'] :
                        modalStyles['choice-inactive']
                    }
                    onClick={switchProvider}
                    disabled={!sinchVirtualNoActive}>
                    Sinch
                </button>
            </div>
        </div>
    );
};

export default SMSCallProviderChoices;