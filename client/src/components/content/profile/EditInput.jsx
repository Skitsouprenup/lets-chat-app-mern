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
                        <button
                            onClick={saveEdit}>
                            Save
                        </button>
                    </div> :
                    <p 
                        onClick={() => setEditInput(editInputType)}
                        className={styles['edit-button-text']}>
                        {input.trim() ? 'edit' : 'add'}
                    </p>
                }
            </>
        );
};

export default EditInput;