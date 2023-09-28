import DeviceInfo from 'react-native-device-info';
import { getManufacturer } from 'react-native-device-info';
const numberRegex = /^(\d+)?$/;
const integerPattern = /^[0-9]+$/;
const CS_URL = "https://mbsreg.brnetsaas.com/MBSConnectREG/frmmbs.aspx";
const CS_URL1 = "https://mbsreg1.brnetsaas.com/MBSConnectREG/frmmbs.aspx";
const isValidPhoneNumber = (phoneNumber) => {
  // Regular expression to validate a mobile number with a country code
  const phoneRegex = /^(\+\d{1,3})?(\d{10})$/;

  return phoneRegex.test(phoneNumber);
};


export async function getDeviceName() {
  var manufacturer = await getManufacturer();
  var model = DeviceInfo.getModel();

  if (model.startsWith(manufacturer)) {
    return model.toUpperCase();
  } else {
    return manufacturer.toUpperCase() + " " + model.toUpperCase();
  }

}

export async function getDeviceID() {
  return await DeviceInfo.getAndroidId();
}

export default {
  isValidPhoneNumber,
  numberRegex, CS_URL, CS_URL1, integerPattern
};
