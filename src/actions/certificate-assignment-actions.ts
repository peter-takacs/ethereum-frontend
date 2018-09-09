import getWeb3 from "../utils/getWeb3";
const CertificatesContract = require('../../build/contracts/Certificates.json');
import * as contract from 'truffle-contract';
import { CertificateAdderState } from "../state/certificate-assignment";
import { ThunkAction } from "../../node_modules/redux-thunk";
import { sha256 } from "../../node_modules/js-sha256";
import { CandidateQuery } from "../state/candidate-query";
import { Address } from '../types/ethereum-address';
import { Assertion } from "../types/assertion";
import { CertificateProps } from "../components/certificates/certificate";

export const REQUEST_ADDITION = 'REQUEST_ADDITION';
export type REQUEST_ADDITION = typeof REQUEST_ADDITION;
export interface RequestAddition {
    type: REQUEST_ADDITION;
    candidate: Address;
    certificate: string;
}
function createRequestAddition(candidate: Address, certificate: string): RequestAddition {
    return {
        type: REQUEST_ADDITION,
        candidate: candidate,
        certificate: certificate || ''
    }
}

export const REQUEST_SENT = 'REQUEST_SENT';
export type REQUEST_SENT = typeof REQUEST_SENT;
export interface RequestSent {
    type: REQUEST_SENT;
}
function requestSent(): RequestSent {
    return {
        type: REQUEST_SENT
    }
}

export const REQUEST_REVOCATION = 'REQUEST_REVOCATION';
export type REQUEST_REVOCATION = typeof REQUEST_REVOCATION;
export interface RequestRevocation {
    type: REQUEST_REVOCATION;
    holder: Address;
    assertion: Assertion;
}

export const CERTIFICATE_REVOKED = 'CERTIFICATE_REVOKED';
export type CERTIFICATE_REVOKED = typeof CERTIFICATE_REVOKED;
export interface CertificateRevoked {
    type: CERTIFICATE_REVOKED;
}
export function certificateRevoked(): CertificateRevoked {
    return {
        type: CERTIFICATE_REVOKED
    }
}

export type Actions = RequestAddition | RequestSent | RequestRevocation | CertificateRevoked;

export function requestRevocation(
        holder: Address, 
        assertion: Assertion
    ): ThunkAction<void, CertificateProps, undefined, Actions> {

    return function(dispatch) {
        return getWeb3.then(({web3}: any) => {
            const currentAccount = web3.eth.accounts[0];
            const certificates = contract(CertificatesContract);
            certificates.setProvider(web3.currentProvider);

            web3.personal.unlockAccount(currentAccount, () => {
                return web3.eth.getAccounts((_: any, accounts: any) => {
                    certificates.deployed().then((instance: any) => {
                        const formattedAssertion = `0x${assertion.certificate.toString()}`;
                        instance.revoke(
                            holder.toString(),
                            web3.toBigNumber(formattedAssertion),
                            {from: currentAccount, gas: 5000000}
                        )
                    }).then(() => {
                        dispatch(certificateRevoked())
                    })
                })
            })
        })
    }
}

export function requestAddition(
        candidate: Address, 
        certificate: string
    ): ThunkAction<void, CertificateAdderState, undefined, Actions> {

    return function(dispatch) {
        dispatch(createRequestAddition(candidate, certificate));

        return getWeb3.then(
            ({web3}: any) => {
                const currentAccount = web3.eth.accounts[0];
                const certificates = contract(CertificatesContract);
                certificates.setProvider(web3.currentProvider);
                
                web3.personal.unlockAccount(currentAccount, () => {
                    return web3.eth.getAccounts((_: any, accounts: any) => {
                        certificates.deployed().then((instance: any) => {
                            const hashedCertificate = `0x${sha256(certificate || '')}`;

                            instance.assign(
                                candidate.toString(),
                                web3.toBigNumber(hashedCertificate),
                                { from: currentAccount, gas: 5000000 }
                            );
                        })
                        .then(() => {
                            dispatch(requestSent());
                        });
                    })
                });

           }
        )
    }
}