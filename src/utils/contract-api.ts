const EducatorNetworkContract = require('../../build/contracts/EducatorNetwork.json');
const CertificatesContract = require('../../build/contracts/Certificates.json');
import getWeb3 from "../utils/getWeb3";
import * as contract from 'truffle-contract';
import { Address } from '../types/ethereum-address';

export interface Environment {
    educatorNetwork: any;
    certificates: any;
    currentAccount: Address;
}

export async function getDeployedContracts(): Promise<Environment> {
    const { web3 }: any = await getWeb3;
    const accounts = await web3.eth.getAccounts();
    const currentAccount = new Address(accounts[0]);

    const educatorNetwork = contract(EducatorNetworkContract);
    educatorNetwork.setProvider(web3.currentProvider);
    const educatorNetworkInstance = await educatorNetwork.deployed();

    const certificates = contract(CertificatesContract);
    certificates.setProvider(web3.currentProvider);
    const certificatesInstance = await certificates.deployed();

    return {
        educatorNetwork: educatorNetworkInstance,
        certificates: certificatesInstance,
        currentAccount
    }
}