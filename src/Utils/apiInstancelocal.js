import axios from 'axios';
import RNFS from 'react-native-fs';

const apiInstancelocal = baseURL => {
  const baseURLFinal = global.BASEURL + baseURL;
  const instance = axios.create({
    baseURL: baseURLFinal,
    timeout: 500000, // Set your desired timeout
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    config => {

      if (global.DEBUG_MODE) {
        console.log('MobileRequest::' + JSON.stringify(config));
        console.log('MobileRequestHeader::' + config.headers);
        console.log('MobileRequestData::' + JSON.stringify(config.data));
        console.log('MobileRequestbaseUrl::' + config.baseURL);
        const logTime = `------------------------------Date: ${new Date()} --------------------------------------------------------------------\n\n`;
        const logBaseUrl = `Request Url: ${JSON.stringify(config.data)}\n`;
        const logHeader = `Request Headers: ${JSON.stringify(config.headers)}\n`;
        if (config.data != undefined) {
          var logData = `Request Data: ${JSON.stringify(config.data)}\n\n`;
        }
        const logcontent = logTime + logBaseUrl + logHeader + logData;
        writeToFile(logcontent);
      }
      // Modify the request config before it is sent
      // For example, you can add headers or perform other tasks
      // before the request is sent to the server
      return config;
    },
    error => {
      // Handle request error
      return Promise.reject(error);
    },
  );
  // Interceptor for response

  // Response interceptor
  instance.interceptors.response.use(
    async (response) => {

      if (global.DEBUG_MODE) {
        console.log("ResponseData:", response.data);
        writeToFile(`Response Data Data: ${JSON.stringify(response.data)}\n\n`);
      }
      return response;

      // Modify the response data before it is returned to your code
      // For example, you can preprocess data or perform other tasks
      // on the response data before it reaches your code
    },
    error => {
      // Handle response error
      console.log('ResponseError:', error);
      return Promise.reject(error);
    },
  );

  return instance;
};

const writeToFile = async (content) => {
  try {
    const logFileName = 'app_logs.txt';
    const documentDirectoryPath = RNFS.ExternalDirectoryPath;
    const logFilePath = `${documentDirectoryPath}/${logFileName}`;

    // Write the content to the file
    await RNFS.appendFile(logFilePath, content, 'utf8');

    console.log('Log written successfully to:', logFilePath);
  } catch (error) {
    console.error('Error writing to log file:', error);
  }
};

export default apiInstancelocal;
