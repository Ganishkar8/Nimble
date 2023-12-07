import databaseInstance from '../DatabaseInstance';

const tableName = 'tbl_finexpdetails';

const insertIncExpDetails = (loanApplicationId, client_id, client_type, id, usercode, incomeLabel,
    Amount) => {
    const db = databaseInstance.getInstance();
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT OR REPLACE INTO ${tableName} ( loanApplicationId, client_id, client_type, id,usercode, incomeLabel,Amount) VALUES (?,?,?,?,?,?,?)`,
                [loanApplicationId, client_id, client_type, id, usercode, incomeLabel,
                    Amount],
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

const getMaxId = (loanApplicationId, client_id, client_type) => {
    const db = databaseInstance.getInstance();
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT MAX(id) AS max_value FROM ${tableName} WHERE loanApplicationId = ? AND client_id = ? AND client_type = ?`,
                [loanApplicationId, client_id, client_type],
                (_, result) => {
                    const { max_value } = result.rows.item(0);
                    resolve(max_value);
                },
                error => {
                    reject(error);
                }
            );
        });
    });
}

const getFinExpDetails = (loanApplicationId, client_id, client_type, usercode) => {
    const db = databaseInstance.getInstance();
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName} WHERE loanApplicationId = ? AND client_id = ? AND client_type = ? AND usercode = ?`,
                [loanApplicationId, client_id, client_type, usercode],
                (_, result) => {
                    const rows = result.rows;
                    const expDetails = [];

                    for (let i = 0; i < rows.length; i++) {
                        expDetails.push(rows.item(i));
                    }

                    resolve(expDetails);
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};

const getFinExpDetailsAll = (loanApplicationId, client_id, client_type) => {
    const db = databaseInstance.getInstance();
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName}`,
                [],
                (_, result) => {
                    const rows = result.rows;
                    const expDetails = [];

                    for (let i = 0; i < rows.length; i++) {
                        expDetails.push(rows.item(i));
                    }

                    resolve(expDetails);
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};

const deleteFinExpDetails = (loanApplicationId, client_id, client_type, usercode,incomeLabel) => {
    const db = databaseInstance.getInstance();
    db.transaction((tx) => {
        tx.executeSql(`DELETE FROM ${tableName} WHERE loanApplicationId = ? AND client_id = ? AND client_type = ? 
        AND usercode = ? AND incomeLabel = ?`,
            [loanApplicationId, client_id, client_type, usercode,incomeLabel],
            (tx, results) => {
                console.log('Rows affected:', results.rowsAffected);
            }, (error) => {
                console.error('Error executing SQL:', error);
            });
    });
};


export default {
    insertIncExpDetails,
    getMaxId,
    getFinExpDetails,
    deleteFinExpDetails,
    getFinExpDetailsAll
};