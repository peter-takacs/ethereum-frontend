import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Address } from '../types/ethereum-address';
import AddressEditor from './address-editor';
import { configure, mount, EnzymeAdapter } from 'enzyme';
import { textChange } from '../utils/test/form-events';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';

const dummyAddressString = '0x0000111122223333444455556666777788889999';
const dummyChangedString = '0xaaaa111122223333444455556666777788889999';
const dummyAddress = new Address(dummyAddressString);


test('It renders correctly with an empty address', () => {
    const tree = renderer.create(
        <AddressEditor address={null} onChange={() => {}}/>
    )
    expect(tree.toJSON()).toMatchSnapshot();
})


test('It renders correctly with a correct address', () => {
    const tree = renderer.create(
        <AddressEditor address={dummyAddress} onChange={() => {}}/>
    )
    expect(tree.toJSON()).toMatchSnapshot();
})

configure({adapter: new ReactSixteenAdapter()});

function setup(initialAddress: Address | null = null) {
    const props = {
        address: initialAddress,
        onChange: jest.fn()
    };

    const enzymeWrapper = mount(<AddressEditor {...props}/>);

    return {
        props,
        enzymeWrapper
    }
}

describe('Actions', () => {

    it('Should call onChange if the input changes from an invalid to a valid address', () => {
        const { enzymeWrapper, props } = setup();
        const input = enzymeWrapper.find('TextField');
        const onChange = input.props().onChange;
        if (onChange == null) {
            fail('No change handler attached to TextField');
            return;
        }
        onChange(textChange(dummyAddressString));
        
        expect(props.onChange).toHaveBeenCalled();
    });


    it('Should call onChange if the input changes from a valid to a valid address', () => {
        const { enzymeWrapper, props } = setup(dummyAddress);
        const input = enzymeWrapper.find('TextField');
        const onChange = input.props().onChange;
        if (onChange == null) {
            fail('No change handler attached to TextField');
            return;
        }
        onChange(textChange(dummyChangedString));
        
        expect(props.onChange).toHaveBeenCalledWith(expect.any(Address));
    });

    it('Should call onChange with null if the input is changed to an invalid address', () => {
        const { enzymeWrapper, props } = setup(dummyAddress);
        const input = enzymeWrapper.find('TextField');
        const onChange = input.props().onChange;
        if (onChange == null) {
            fail('No change handler attached to TextField');
            return;
        }
        onChange(textChange('gjhrbgakjsheb'));
        
        expect(props.onChange).toHaveBeenCalledWith(null);
    });
})