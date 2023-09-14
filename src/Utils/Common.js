

const numberRegex = /^(\d+)?$/;

const isValidPhoneNumber = (phoneNumber) => {
    // Regular expression to validate a mobile number with a country code
    const phoneRegex = /^(\+\d{1,3})?(\d{10})$/;
  
    return phoneRegex.test(phoneNumber);
  };

export default {
    isValidPhoneNumber,
    numberRegex
};
