import DeviceInfo from 'react-native-device-info';
import { getManufacturer } from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';

const numberRegex = /^(\d+)?$/;
const integerPattern = /^[0-9]+$/;
const CS_URL = "https://mbsreg.brnetsaas.com/MBSConnectREG/frmmbs.aspx";
const CS_URL1 = "https://mbsreg1.brnetsaas.com/MBSConnectREG/frmmbs.aspx";
const isValidPhoneNumber = (phoneNumber) => {
  // Regular expression to validate a mobile number with a country code
  const phoneRegex = /^(\+\d{1,3})?(\d{10})$/;

  return phoneRegex.test(phoneNumber);
};

const isValidText = (text) => {
  // Regular expression to validate a mobile number with a country code
  const textRegex = /^[a-zA-Z]+$/;

  return textRegex.test(text);
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

export async function getNetworkConnection() {
  return await NetInfo.fetch();
}

export function getCodeDescription(data, id) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].SubCodeID == id) {
      return data[i].Label;
    }
  }
}

export function formatDate(inputDate) {
  const date = new Date(inputDate);

  // Define month names in abbreviated form (e.g., Jan, Feb, Mar).
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Get day, month, and year components from the date object.
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // Format the date in "dd-mmm-yyyy" format.
  const formattedDate = `${day}-${monthNames[monthIndex]}-${year}`;

  return formattedDate;
}

function getCurrentDateTime() {
  const now = new Date();

  // Format the date and time components
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-based
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

  // Combine the components to create the desired format
  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;

  return formattedDateTime;
};

function hasOnlyOneKey(obj) {
  // Get the keys of the object
  const keys = Object.keys(obj);

  // Check if there is only one key
  return keys.length === 1;
}

export function formatTime(inputDate) {
  const date = new Date(inputDate);
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const [hour, minute] = time.split(':');
  let amPm = 'AM';
  let hour12 = parseInt(hour, 10);

  if (hour12 >= 12) {
    amPm = 'PM';
    if (hour12 > 12) {
      hour12 -= 12;
    }
  }

  return `${hour12}:${minute} ${amPm}`;
}

export default {
  isValidPhoneNumber, isValidText,
  numberRegex, CS_URL, CS_URL1, integerPattern, formatDate, getCodeDescription, formatTime, hasOnlyOneKey, getCurrentDateTime, getNetworkConnection
};
