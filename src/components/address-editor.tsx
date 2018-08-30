import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { State } from '../state/address-editor';
import { TextField } from '@material-ui/core';
import { Address } from '../types/ethereum-address';

export interface AddressEditorDispatch {
    onChange: (address: Address) => void;
}

export type AddressEditorProps = State & AddressEditorDispatch;

interface AddressEditorState {
    text: string | null;
}

class AddressEditor extends React.Component<AddressEditorProps, AddressEditorState> {

    constructor(props: AddressEditorProps) {
        super(props);
        this.state = {
            text: props.address && props.address.toString()
        };
    }
    
    private onTextChanged (text: string) {
        this.setState({text});
        if (Address.isValid(text)) {
            this.props.onChange(new Address(text));
        }
    }

    render() {
        return (
            <TextField
                placeholder={this.props.placeholder}
                value={this.state.text || ''}
                onChange={(event) => this.onTextChanged(event.target.value)}
            />
        );
    }
}

export default AddressEditor;