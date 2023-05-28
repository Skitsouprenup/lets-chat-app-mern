import React, { useState } from 'react';
import styles from '../../../css/main/profile.module.css';

const EditInput = (
    {
        input, 
        setInput,
        editInput,
        setEditInput,
        editInputType
    }) => {
        const [editValue, setEditValue] = useState(input ? input : '');

        const saveEdit = () => {
            setInput(editValue.trim());
            setEditInput('');
        }

        const cancelEdit = () => {
            setEditInput('');
            setEditValue(input ? input : '');
        }

        return (
            <>
                {
                    editInput === editInputType ? 
                    <div className={styles['edit-form']}>
                        <input 
                            type="input" 
                            value={editValue.trim()}
                            onChange={(e) => setEditValue(e.target.value)}
                            className={styles['edit-input']} />
                        <button onClick={cancelEdit}>
                            Cancel
                        </button>
                        <button onClick={saveEdit}>
                            Save
                        </button>
                    </div> :
                    <>
                        <p>{input}</p>
                        <p 
                            onClick={() => {
                                /*
                                    Set enables edit feature.
                                */
                                setEditInput(editInputType);
                            }}
                            className={styles['edit-button-text']}>
                            {input.trim() ? 'edit' : 'add'}
                        </p>
                    </>
                }
            </>
        );
};

export default EditInput;