export class Address {
    private readonly address: string;

    public static isValid(address: string) {
        return /^0x[a-fA-F0-9]{40}$/.test(address);
    }

    public static fromBytes(bytes: Uint8Array): Address {
        if (bytes.length !== 20) {
            throw new Error(`Invalid amount of bytes supplied to ethereum address.`)
        }
        let address = '0x';
        for (const byte of bytes) {
            address = address + byte.toString(16);
        }
        return new Address(address);
    }

    constructor (address: string) {
        if (!Address.isValid(address)) {
            throw new Error(`Invalid address "${address}" supplied to ethereum address constructor.`)
        }
        this.address = address;
    }

    public toString() {
        return this.address;
    }

    public equals(other: Address) {
        return this.address === other.address;
    }
}