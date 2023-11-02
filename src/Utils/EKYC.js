import { NativeModules } from 'react-native'
const { EKYC_OTP } = NativeModules

export async function generateRequest(aadhar, Mcc, CA_TID, CA_ID, CA_TA) {
    let myPromise = new Promise(function (resolve, reject) {
        EKYC_OTP.generate(aadhar, Mcc, CA_TID, CA_ID, CA_TA, result => {
            resolve(result)
        })
    });
    return await myPromise;
}

export async function validateOTP(aadhar, otp, stan, transdatetime, localTranstime, localdate, Mcc, CA_TID, CA_ID, CA_TA) {
    let myPromise = new Promise(function (resolve, reject) {
        EKYC_OTP.validateotp(aadhar, otp, stan, transdatetime, localTranstime, localdate, Mcc, CA_TID, CA_ID, CA_TA, result => {
            resolve(result)
        })
    });
    return await myPromise;
}

