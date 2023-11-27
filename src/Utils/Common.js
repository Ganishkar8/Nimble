import DeviceInfo from 'react-native-device-info';
import { getManufacturer } from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';
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
  const textRegex = /^[a-zA-Z\s]+$/;

  return textRegex.test(text);
};

const isValidAlphaText = (text) => {
  // Regular expression to validate a mobile number with a country code
  const textRegex = /^[a-zA-Z0-9 ]+$/;

  return textRegex.test(text);
};

const isValidPin = (text) => {
  // Regular expression to validate a pincode
  const sixDigitNumberPattern = /^[0-9]{6}$/;

  return sixDigitNumberPattern.test(text);
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

export function convertDateFormat(inputDate) {
  // Split the input date into year, month, and day
  const parts = inputDate.split('-');

  // Create a new date object using the year, month, and day
  const date = new Date(parts[0], parts[1] - 1, parts[2]); // Month is zero-based

  // Format the date in "dd-mm-yyyy" format
  const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

  return formattedDate;
}

export function convertYearDateFormat(inputDate) {
  // Split the input date into year, month, and day
  const parts = inputDate.split('-');

  // Create a new date object using the year, month, and day
  const date = new Date(parts[2], parts[1] - 1, parts[0]); // Months are 0-based in JavaScript Date objects

  // Format the date in "dd-mm-yyyy" format
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

  return formattedDate;
}

export function isDateGreaterThan(date1, date2) {
  // Create Date objects from the date strings
  const dateObj1 = new Date(date1);
  const dateObj2 = new Date(date2);

  // Compare the two Date objects
  if (dateObj1 > dateObj2) {
    return true; // date1 is greater than date2
  } else if (dateObj1 < dateObj2) {
    return false; // date1 is smaller than date2
  } else {
    return false; // The dates are equal
  }
}

export function getSystemCodeDescription(systemCodeDetail, type, subCodeId) {

  const matchingItem = systemCodeDetail.find((data) => data.masterId === type && data.subCodeId === subCodeId);

  if (matchingItem) {
    return matchingItem.Description;
  } else {
    return ''; // Or any other appropriate value for no match
  }

  // systemCodeDetail.filter((data) => data.masterId === type).map((value, index) => {

  //   if (value.subCodeId === subCodeId) {
  //     console.log('subCodeId::::' + value.subCodeId + ' ' + subCodeId + ' ' + value.label)
  //     return value.label;
  //   }

  // });
}

export function showErrorAlert(title, message, buttontext) {
  Alert.alert(
    title,
    message,
    [
      {
        text: buttontext,
        onPress: () => console.log(`'OK' Pressed`),
      },
    ],
  );
}

export function isValidEmail(email) {
  // Regular expression for validating an Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

export function isValidPAN(panNumber) {
  // Define the PAN number regex pattern
  const panRegex = /[A-Za-z]{5}[0-9]{4}[A-Za-z]/;

  // Test the entered PAN number against the regex pattern
  return panRegex.test(panNumber);
};

const d = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
];

const p = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
];

// Validate Verhoeff algorithm
export function validateVerhoeff(num) {
  let c = 0;
  const myArray = stringToReversedIntArray(num);

  for (let i = 0; i < myArray.length; i++) {
    c = d[c][p[i % 8][myArray[i]]];
  }

  return c === 0;
};

// Converts a string to a reversed integer array
const stringToReversedIntArray = (num) => {
  const myArray = [];

  for (let i = 0; i < num.length; i++) {
    try {
      myArray[i] = parseInt(num.substring(i, i + 1));
    } catch (error) {
      console.error(error);
    }
  }

  return reverse(myArray);
};

// Helper function to reverse an array
const reverse = (array) => array.slice().reverse();


export function calculateAge(birthdate) {
  const today = new Date();
  const parts = birthdate.split('-'); // Assuming the date is in 'DD/MM/YYYY' format
  const birthDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

export default {
  isValidPhoneNumber, isValidText, convertDateFormat, isDateGreaterThan, isValidAlphaText, showErrorAlert, getSystemCodeDescription,
  numberRegex, CS_URL, CS_URL1, integerPattern, formatDate, getCodeDescription, formatTime, hasOnlyOneKey, getCurrentDateTime, getNetworkConnection,
  isValidPin, isValidPAN, validateVerhoeff, isValidEmail, calculateAge, convertYearDateFormat
};
