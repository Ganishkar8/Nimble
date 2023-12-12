/* eslint-disable prettier/prettier */
import databaseInstance from '../DatabaseInstance';

const tableName = 'tbl_nomineeDetails';

const insertNomineeDetails = (
    loanApplicationId,
    client_type,
    id,
    isNomineeId,
    relstatuswithBorrower,
    titleId,
    fullName,
    aadharId,
    dateOfBirth,
    age,
    genderId,
    mobileNum,
    nomineePercent,
    nomineeBankAccNo,
    nomineeIfsc,
    nomineeBankName,
    nomineeBankBranch,
    nomineeNameInBank) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT OR REPLACE INTO ${tableName} (loanApplicationId,client_type,id,isNomineeId,relstatuswithBorrower,titleId,fullName,aadharId,dateOfBirth,age,genderId,mobileNum,nomineePercent,nomineeBankAccNo,nomineeIfsc,nomineeBankName,nomineeBankBranch,nomineeNameInBank) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [loanApplicationId, client_type, id, isNomineeId, relstatuswithBorrower, titleId, fullName, aadharId, dateOfBirth, age, genderId, mobileNum, nomineePercent, nomineeBankAccNo, nomineeIfsc, nomineeBankName, nomineeBankBranch, nomineeNameInBank],
                (_, result) => {
                    //alert(JSON.stringify(result))
                    resolve(result);
                },
                error => {
                    reject(error);
                },
            );
        });
    });
};


const getAllNomineeDetails = (id) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName} WHERE loanApplicationId = ?`,
                [id],
                (_, result) => {
                    const rows = result.rows;
                    const clientData = [];

                    for (let i = 0; i < rows.length; i++) {
                        clientData.push(rows.item(i));
                    }

                    resolve(clientData);
                },
                error => {
                    reject(error);
                },
            );
        });
    });
};

const getNomineeDetailsOnID = (loanId, id) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName} WHERE loanApplicationId = ? AND id = ?`,
                [loanId, id],
                (_, result) => {
                    const rows = result.rows;
                    const clientData = [];

                    for (let i = 0; i < rows.length; i++) {
                        clientData.push(rows.item(i));
                    }

                    resolve(clientData);
                },
                error => {
                    reject(error);
                },
            );
        });
    });
};

const getMaxId = (loanApplicationId, client_type) => {
    const db = databaseInstance.getInstance();
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT MAX(id) AS max_value FROM ${tableName} WHERE loanApplicationId = ? AND client_type = ?`,
                [loanApplicationId, client_type],
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

const deleteNomineeDetailsBasedID = (loanApplicationId, id) => {
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

const deleteAllNomineeDetails = async () => {
    try {
        const db = databaseInstance.getInstance(); // Execute the DELETE query

        const query = `DELETE FROM ${tableName}`;

        const [rowsAffected] = await db.executeSql(query);

        console.log(`${rowsAffected} records deleted`);
    } catch (error) {
        console.error('Error deleting records:', error);
    }
};

export default {
    insertNomineeDetails,
    getAllNomineeDetails,
    getNomineeDetailsOnID,
    getMaxId,
    deleteNomineeDetailsBasedID,
    deleteAllNomineeDetails
};
