import databaseInstance from '../DatabaseInstance';

const tableName = 'tbl_loanaddressinfo';

const insertLoanAddress = (loanApplicationId, id, client_id, client_type, address_type, address_line_1, address_line_2,
    landmark, pincode, city, district, state, country, mobile_or_land_line_number, email_id, address_ownership, owner_details,
    owner_name, is_active, isKyc) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT OR REPLACE INTO ${tableName} ( loanApplicationId,id, client_id, client_type, address_type,address_line_1, address_line_2,landmark,pincode,city,district,state,country,mobile_or_land_line_number,email_id,address_ownership,owner_details,owner_name,is_active,isKyc) VALUES (?, ?, ?, ?, ?,?,?,?,?,?,?, ?, ?, ?, ?, ?,?,?,?,?)`,
                [loanApplicationId, id, client_id, client_type, address_type, address_line_1, address_line_2,
                    landmark, pincode, city, district, state, country, mobile_or_land_line_number, email_id, address_ownership, owner_details,
                    owner_name, is_active, isKyc],
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

const getAllLoanAddressDetailsForLoanID = (loanApplicationId, client_type) => {
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

const getAllLoanAddressDetailsForLoanIDAndID = (loanApplicationId, id) => {
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


const getAllLoanAddressDetails = () => {
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

const deleteLoanDataBasedOnLoanIDAndID = (loanApplicationId, id) => {
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

const deleteLoanDataBasedOnAddressAndClient = (loanApplicationId, addresstype, client_type) => {
    const db = databaseInstance.getInstance();
    db.transaction((tx) => {
        tx.executeSql(`DELETE FROM ${tableName} WHERE loanApplicationId = ? AND address_type = ? AND client_type = ?`,
            [loanApplicationId, addresstype, client_type],
            (tx, results) => {
                console.log('Rows affected:', results.rowsAffected);
            }, (error) => {
                console.error('Error executing SQL:', error);
            });
    });
};

const deleteAllLoanAddress = () => {
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
    insertLoanAddress,
    getAllLoanAddressDetailsForLoanID,
    getAllLoanAddressDetailsForLoanIDAndID,
    deleteLoanDataBasedOnLoanIDAndID,
    getAllLoanAddressDetails,
    deleteAllLoanAddress,
    deleteLoanDataBasedOnAddressAndClient
};