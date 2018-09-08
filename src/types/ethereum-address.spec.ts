import { Address } from "./ethereum-address";
import { dummyAddress } from "../utils/test/address";

describe('Address validation', () => {
    it('Should not allow empty addresses', () => {
        expect(Address.isValid('')).toBe(false);
    })

    it('Should not allow non-hex addresses', () => {
        expect(Address.isValid('hgerkjghn')).toBe(false);
    })

    it('Should not allow addresses of wrong length', () => {
        expect(Address.isValid('0x00001111222233334444555566667777888899999')).toBe(false);
        expect(Address.isValid('0x000011112222333344445555666677778888999')).toBe(false);
    })

    it('Should not accept addresses without the 0x prefix', () => {
        expect(Address.isValid('0000111122223333444455556666777788889999')).toBe(false);
    })

    it('Should accept correct addresses', () => {
        expect(Address.isValid('0x0000111122223333444455556666777788889999')).toBe(true);
    })

    it('Should work with equality', () => {
        expect(dummyAddress(0).equals(dummyAddress(0))).toBe(true);
        expect(dummyAddress(1).equals(dummyAddress(0))).toBe(false);
    })
});