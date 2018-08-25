import { sha256 } from "js-sha256";
import { Address } from "../../types/ethereum-address";


export function dummyAddress(seed: number) {
    let result = '0x';
    let hashInput = [seed, seed, seed, seed];
    let hash = sha256(hashInput);
    for (let i = 0; i < 40; i++) {
        result = result + hash[i];
    }
    return new Address(result);
}