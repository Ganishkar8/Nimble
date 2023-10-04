import axios from 'axios';

const apiInstance = (baseURL, authToken) => {

    const baseURLFinal = global.BASEURL + baseURL
    const instance = axios.create({
        baseURL: baseURLFinal,
        timeout: 500000, // Set your desired timeout
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken
        },
    });



    // Request interceptor
    instance.interceptors.request.use(
        (config) => {
            console.log('MobileRequestHeader::' + config.headers)
            console.log('MobileRequestData::' + JSON.stringify(config.data))
            console.log('MobileRequestbaseUrl::' + config.baseURL)
            // Modify the request config before it is sent
            // For example, you can add headers or perform other tasks
            // before the request is sent to the server
            return config;
        },
        (error) => {
            // Handle request error
            return Promise.reject(error);
        }
    );
    // Interceptor for response

    // Response interceptor
    instance.interceptors.response.use(
        async (response) => {
            console.log("ResponseData:", response.data);

            return response;

            // Modify the response data before it is returned to your code
            // For example, you can preprocess data or perform other tasks
            // on the response data before it reaches your code

        },
        (error) => {
            // Handle response error
            return Promise.reject(error);
        }
    );

    return instance;

};




export default apiInstance;