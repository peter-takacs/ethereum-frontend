import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { State } from '../state/address-editor';
import { TextField } from '@material-ui/core';
import { Address } from '../types/ethereum-address';

export interface AddressEditorDispatch {
    onChange: (address: Address) => void;
}

export type AddressEditorProps = State & AddressEditorDispatch;

const AddressEditor = ({address, onChange}: AddressEditorProps) => {
    const onTextChanged = (text: string) => {
        if (Address.isValid(text)) {
            onChange(new Address(text));
        }
    }

    return (
        <div>
            <TextField 
                value={ address == null ? '' : address.toString()}
                onChange={(event) => onTextChanged(event.target.value)}
            />
        </div>
    );
}

export default AddressEditor;