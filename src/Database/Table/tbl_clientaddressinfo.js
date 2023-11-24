import databaseInstance from '../DatabaseInstance';

const tableName = 'tbl_clientaddressinfo';

const insertClientAddress = (loanApplicationId, client_id, client_type, address_type, address_line_1, address_line_2,
    landmark, pincode, city, district, state, country, mobile_or_land_line_number, email_id, address_ownership, owner_details,
    owner_name, geo_classification, years_at_residence, years_in_current_city_or_town, is_active, created_by, created_date,
    modified_by, modified_date, supervised_by, supervised_date,isKyc) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT OR REPLACE INTO ${tableName} ( loanApplicationId, client_id, client_type, address_type,address_line_1, address_line_2,landmark,pincode,city,district,state,country,mobile_or_land_line_number,email_id,address_ownership,owner_details,owner_name,geo_classification,years_at_residence,years_in_current_city_or_town,is_active,created_by,created_date,modified_by,modified_date,supervised_by,supervised_date,isKyc) VALUES (?, ?, ?, ?, ?,?,?,?,?,?,?, ?, ?, ?, ?, ?,?,?,?,?,?,?, ?, ?, ?, ?, ?,?)`,
                [loanApplicationId, client_id, client_type, address_type, address_line_1, address_line_2,
                    landmark, pincode, city, district, state, country, mobile_or_land_line_number, email_id, address_ownership, owner_details,
                    owner_name, geo_classification, years_at_residence, years_in_current_city_or_town, is_active, created_by, created_date,
                    modified_by, modified_date, supervised_by, supervised_date,isKyc],
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

const getAllAddressDetailsForLoanID = (loanApplicationId) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName} WHERE loanApplicationId = ${loanApplicationId}`,
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

const getAllAddressDetailsForLoanIDAndAddressType = (loanApplicationId, addressType) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName} WHERE loanApplicationId = ? AND address_type = ?`,
                [loanApplicationId, addressType],
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

const deleteDataBasedOnLoanIDAndAddressType = (loanApplicationId, addressType) => {
    const db = databaseInstance.getInstance();
    db.transaction((tx) => {
        tx.executeSql(`DELETE FROM ${tableName} WHERE loanApplicationId = ? AND address_type = ?`,
            [loanApplicationId, addressType],
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
    getAllAddressDetailsForLoanIDAndAddressType,
    deleteDataBasedOnLoanIDAndAddressType
};