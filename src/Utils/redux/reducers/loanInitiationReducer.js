import { ADDLOANINITIATION_DETAIL, UPDATELOANINITIATION_DETAIL, DELETELOANINITIATION_DETAIL, DELETE_CLIENT_DETAIL, UPDATE_CLIENT_DETAIL, UPDATENESTED_CLIENT_DETAIL, DELETENESTED_CLIENT_DETAIL, DELETEADDRESSNESTED_CLIENT_DETAIL } from "../actions/loanInitiationActionType"

const initialState = {
    loanInitiationDetails: [],
};

const loanInitiationReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADDLOANINITIATION_DETAIL:
            return { ...state, loanInitiationDetails: [...state.loanInitiationDetails, action.payload.data] };


        case UPDATELOANINITIATION_DETAIL:
            const loanData = action.payload.loanData;

            const existingItemIndex = state.loanInitiationDetails.findIndex(
                item => item.id === action.payload.loanApplicationId
            );

            if (existingItemIndex !== -1) {
                // Update existing item
                return {
                    ...state,
                    loanInitiationDetails: state.loanInitiationDetails.map((item, index) =>
                        index === existingItemIndex
                            ? {
                                ...item,
                                [action.payload.key]: Array.isArray(item[action.payload.key])
                                    ? item[action.payload.key].map(clientDetail =>
                                        clientDetail.id === action.payload.clientId
                                            ? {
                                                ...clientDetail,
                                                ...action.payload.data,
                                            }
                                            : clientDetail
                                    )
                                    : item[action.payload.key],
                            }
                            : item
                    ),
                };
            } else {
                // Add new item
                return {
                    ...state,
                    loanInitiationDetails: [...state.loanInitiationDetails, { id: action.payload.loanApplicationId, loanApplicationNumber: loanData.loanApplicationNumber, tempNumber: loanData.tempNumber, branchId: loanData.branchId, customerCategory: loanData.customerCategory, customerSubcategory: loanData.customerSubcategory, loanType: loanData.loanType, loanPurpose: loanData.loanPurpose, product: loanData.product, loanAmount: loanData.loanAmount, workflowId: loanData.workflowId, consent: loanData.consent, finalConsent: loanData.finalConsent, applicationAppliedBy: loanData.applicationAppliedBy, applicationCreationDate: loanData.applicationCreationDate, lmsApplicationNumber: loanData.lmsApplicationNumber, isKycManual: loanData.isKycManual, manualKycStatus: loanData.manualKycStatus, manualKycApprovedBy: loanData.manualKycApprovedBy, manualKycApprovedDate: loanData.manualKycApprovedDate, [action.payload.key]: action.payload.data }],
                };
            }

        // ... (previous code)

        case UPDATE_CLIENT_DETAIL: {
            const { loanApplicationId, clientId, key, data } = action.payload;

            console.log('Action Payload:', loanApplicationId, clientId, key, data);

            return {
                ...state,
                loanInitiationDetails: state.loanInitiationDetails.map((item) => {
                    if (item.id === parseInt(loanApplicationId)) {
                        const isExistingId = item[key] && item[key].some(
                            (clientDetail) => clientDetail.id === parseInt(clientId)
                        );

                        if (key == 'applicantSalesDetail') {
                            return {
                                ...item,
                                [key]: isExistingId
                                    ? { ...item[key], ...data } // Update existing data
                                    : data, // Assign new data
                            };
                        } else {
                            return {
                                ...item,
                                [key]: isExistingId
                                    ? item[key].map((clientDetail) =>
                                        clientDetail.id === data.id
                                            ? { ...clientDetail, ...data } // Update existing data
                                            : clientDetail
                                    )
                                    : [...item[key], data], // Add new data
                            };
                        }


                    }
                    return item;
                })
            };

        }


        case UPDATENESTED_CLIENT_DETAIL:
            const { loanApplicationId, clientId, key, nestedKey, data } = action.payload;

            console.log('Action Payload:', loanApplicationId, clientId, key, nestedKey, data);

            return {
                ...state,
                loanInitiationDetails: state.loanInitiationDetails.map((item) => {
                    if (item.id === parseInt(loanApplicationId)) {
                        return {
                            ...item,
                            [key]: item[key].map((clientDetail) => {
                                if (clientDetail.id === parseInt(clientId)) {

                                    if (!clientDetail[nestedKey]) {
                                        // If nestedKey is not present, add it with the new data
                                        return {
                                            ...clientDetail,
                                            [nestedKey]: [data],
                                        };
                                    }

                                    const isExistingId = clientDetail[nestedKey].some(link => link.id === data.id);

                                    return {
                                        ...clientDetail,
                                        [nestedKey]: clientDetail[nestedKey].length
                                            ? isExistingId
                                                ? clientDetail[nestedKey].map((link) =>
                                                    link.id === data.id ? { ...link, ...data } : link
                                                )
                                                : [...clientDetail[nestedKey], data]
                                            : [data],
                                    };
                                }
                                return clientDetail;
                            }),
                        };
                    }
                    return item;
                })
            };


        case DELETENESTED_CLIENT_DETAIL: {
            const { loanApplicationId, clientId, key, nestedKey, id } = action.payload;

            return {
                ...state,
                loanInitiationDetails: state.loanInitiationDetails.map((item) => {
                    if (item.id === parseInt(loanApplicationId)) {
                        return {
                            ...item,
                            [key]: item[key].map((clientDetail) => {
                                if (clientDetail.id === parseInt(clientId)) {
                                    // If data is an object with an 'id' property, find and remove the item with that id
                                    if (id !== undefined) {
                                        return {
                                            ...clientDetail,
                                            [nestedKey]: clientDetail[nestedKey].filter((link) => link.id !== parseInt(id)),
                                        };
                                    }
                                }
                                return clientDetail;
                            }),
                        };
                    }
                    return item;
                }),
            };
        }

        case DELETEADDRESSNESTED_CLIENT_DETAIL: {
            const { loanApplicationId, clientId, key, nestedKey, type } = action.payload;

            return {
                ...state,
                loanInitiationDetails: state.loanInitiationDetails.map((item) => {
                    if (item.id === parseInt(loanApplicationId)) {
                        return {
                            ...item,
                            [key]: item[key].map((clientDetail) => {
                                if (clientDetail.id === parseInt(clientId)) {
                                    // If data is an object with an 'id' property, find and remove the item with that id
                                    if (type !== undefined) {
                                        return {
                                            ...clientDetail,
                                            [nestedKey]: clientDetail[nestedKey].filter((link) => link.addressType !== type),
                                        };
                                    }
                                }
                                return clientDetail;
                            }),
                        };
                    }
                    return item;
                }),
            };
        }

        case DELETELOANINITIATION_DETAIL:
            return {
                ...state,
                loanInitiationDetails: state.loanInitiationDetails.filter(item =>
                    item.id !== action.payload.loanApplicationId
                ),
            };

        case DELETE_CLIENT_DETAIL: {
            const { loanApplicationId, clientId, key } = action.payload;

            return {
                ...state,
                loanInitiationDetails: state.loanInitiationDetails.map((item) => {
                    if (item.id === parseInt(loanApplicationId)) {
                        // Use filter and reassign the result to item[key]
                        item[key] = item[key].filter(
                            (clientDetail) => clientDetail.id !== parseInt(clientId)
                        );
                    }
                    return item;
                }),
            };
        }



        default:
            return state;
    }
};

export default loanInitiationReducer;
