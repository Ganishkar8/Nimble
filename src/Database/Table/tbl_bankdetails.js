import databaseInstance from '../DatabaseInstance';

const tableName = 'tbl_loanbankdetails';

const insertBankDetails = (id, loanApplicationId, client_id, client_type, account_type, account_holder_name, ifsc_code,
    bank_name, branch_name, account_number, mobile_number, upi_id, dmsId, accountUsedFor, verificationStatus) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT OR REPLACE INTO ${tableName} (id, loanApplicationId, client_id, client_type, account_type,account_holder_name, ifsc_code,bank_name,branch_name,account_number,mobile_number,upi_id,dmsId,accountUsedFor,verificationStatus) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [id, loanApplicationId, client_id, client_type, account_type, account_holder_name, ifsc_code,
                    bank_name, branch_name, account_number, mobile_number, upi_id, dmsId, accountUsedFor, verificationStatus],
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

const getAllBankDetailsDetailsForLoanID = (loanApplicationId, client_type) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName} WHERE loanApplicationId = ? AND client_type = ?`,
                [loanApplicationId, client_type],
                (_, result) => {
                    const rows = result.rows;
                    const bankDetails = [];

                    for (let i = 0; i < rows.length; i++) {
                        bankDetails.push(rows.item(i));
                    }

                    resolve(bankDetails);
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};



const getAllBankDetails = () => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName}`,
                [],
                (_, result) => {
                    const rows = result.rows;
                    const bankDetails = [];

                    for (let i = 0; i < rows.length; i++) {
                        bankDetails.push(rows.item(i));
                    }

                    resolve(bankDetails);
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};

const deleteBankDataBasedOnLoanIDAndType = (loanApplicationId, client_type, id) => {
    const db = databaseInstance.getInstance();
    db.transaction((tx) => {
        tx.executeSql(`DELETE FROM ${tableName} WHERE loanApplicationId = ? AND client_type = ? AND id = ?`,
            [loanApplicationId, client_type, id],
            (tx, results) => {
                console.log('Rows affected:', results.rowsAffected);
            }, (error) => {
                console.error('Error executing SQL:', error);
            });
    });
};

const deleteAllBankDetails = () => {
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
    insertBankDetails,
    getAllBankDetailsDetailsForLoanID,
    deleteBankDataBasedOnLoanIDAndType,
    getAllBankDetails,
    deleteAllBankDetails
};