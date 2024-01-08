import databaseInstance from '../DatabaseInstance';

const tableName = 'tbl_clientaddressinfo';

const insertClientAddress = (loanApplicationId, id, client_id, client_type, address_type, address_line_1, address_line_2,
    landmark, pincode, city, district, state, country, mobile_or_land_line_number, email_id, address_ownership, owner_details,
    owner_name, geo_classification, years_at_residence, years_in_current_city_or_town, is_active, created_by, created_date,
    modified_by, modified_date, supervised_by, supervised_date, isKyc) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT OR REPLACE INTO ${tableName} ( loanApplicationId,id, client_id, client_type, address_type,address_line_1, address_line_2,landmark,pincode,city,district,state,country,mobile_or_land_line_number,email_id,address_ownership,owner_details,owner_name,geo_classification,years_at_residence,years_in_current_city_or_town,is_active,created_by,created_date,modified_by,modified_date,supervised_by,supervised_date,isKyc) VALUES (?, ?, ?, ?, ?,?,?,?,?,?,?, ?, ?, ?, ?, ?,?,?,?,?,?,?, ?, ?, ?, ?, ?,?,?)`,
                [loanApplicationId, id, client_id, client_type, address_type, address_line_1, address_line_2,
                    landmark, pincode, city, district, state, country, mobile_or_land_line_number, email_id, address_ownership, owner_details,
                    owner_name, geo_classification, years_at_residence, years_in_current_city_or_town, is_active, created_by, created_date,
                    modified_by, modified_date, supervised_by, supervised_date, isKyc],
                (_, result) => {
                    resolve(result);
                },
                error => {
                    reject(error);
                },
            );
        });
    });
};

const getAllAddressDetailsForLoanID = (loanApplicationId, client_type) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName} WHERE loanApplicationId = ? AND client_type = ?`,
                [loanApplicationId, client_type],
                (_, result) => {
                    const rows = result.rows;
                    const addressDetails = [];

                    for (let i = 0; i < rows.length; i++) {
                        addressDetails.push(rows.item(i));
                    }

                    resolve(addressDetails);
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};

const getPermanentAddress = (loanApplicationId, client_type) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName} WHERE loanApplicationId = ? AND client_type = ? AND address_type=?`,
                [loanApplicationId, client_type, 'P'],
                (_, result) => {
                    const rows = result.rows;
                    const addressDetails = [];

                    for (let i = 0; i < rows.length; i++) {
                        addressDetails.push(rows.item(i));
                    }

                    resolve(addressDetails);
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};

const getAllAddressDetailsForLoanIDAndID = (loanApplicationId, id) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName} WHERE loanApplicationId = ? AND id = ?`,
                [loanApplicationId, id],
                (_, result) => {
                    const rows = result.rows;
                    const addressDetails = [];

                    for (let i = 0; i < rows.length; i++) {
                        addressDetails.push(rows.item(i));
                    }

                    resolve(addressDetails);
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};


const getAllAddressDetails = () => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName}`,
                [],
                (_, result) => {
                    const rows = result.rows;
                    const addressDetails = [];

                    for (let i = 0; i < rows.length; i++) {
                        addressDetails.push(rows.item(i));
                    }

                    resolve(addressDetails);
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};

const deleteDataBasedOnLoanIDAndID = (loanApplicationId, id) => {
    const db = databaseInstance.getInstance();
    db.transaction((tx) => {
        tx.executeSql(`DELETE FROM ${tableName} WHERE loanApplicationId = ? AND id = ?`,
            [loanApplicationId, id],
            (tx, results) => {
                console.log('Rows affected:', results.rowsAffected);
            }, (error) => {
                console.error('Error executing SQL:', error);
            });
    });
};

const deleteDataBasedOnType = (loanApplicationId, clentType, addresstype) => {
    const db = databaseInstance.getInstance();
    db.transaction((tx) => {
        tx.executeSql(`DELETE FROM ${tableName} WHERE loanApplicationId = ? AND client_type = ? AND address_type=?`,
            [loanApplicationId, clentType, addresstype],
            (tx, results) => {
                console.log('Rows affected:', results.rowsAffected);
            }, (error) => {
                console.error('Error executing SQL:', error);
            });
    });
};

const deleteAllAddress = () => {
    const db = databaseInstance.getInstance();
    db.transaction((tx) => {
        tx.executeSql(`DELETE FROM ${tableName}`,
            [],
            (tx, results) => {
                console.log('Rows affected:', results.rowsAffected);
            }, (error) => {
                console.error('Error executing SQL:', error);
            });
    });
};

export default {
    insertClientAddress,
    getAllAddressDetailsForLoanID,
    getAllAddressDetailsForLoanIDAndID,
    deleteDataBasedOnLoanIDAndID,
    getAllAddressDetails,
    getPermanentAddress,
    deleteAllAddress,
    deleteDataBasedOnType
};