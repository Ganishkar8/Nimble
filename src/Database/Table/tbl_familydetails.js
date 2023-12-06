/* eslint-disable prettier/prettier */
import databaseInstance from '../DatabaseInstance';

const tableName = 'tbl_familydetails';

const insertFamilyDetails = (id, loanApplicationId, clientTypeId, relationTypeId, titleId, firstName, middleName, lastName, dateOfBirth, age, genderId, mobileNumber, kycTypeId1,
    kycIdValue1,
    expiryDate1,
    kycTypeId2,
    kycIdValue2,
    expiryDate2,
    kycTypeId3,
    kycIdValue3,
    expiryDate3,
    kycTypeId4,
    kycIdValue4,
    expiryDate4,
    isMobileNumberVerified, relationWithCOAPPL, relationWithGRNTR) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT OR REPLACE INTO ${tableName} (id,loanApplicationId, clientTypeId, relationTypeId, titleId,firstName, middleName,lastName,dateOfBirth,age,genderId,mobileNumber,kycTypeId1,kycIdValue1,expiryDate1,kycTypeId2,kycIdValue2,expiryDate2,kycTypeId3,kycIdValue3,expiryDate3,kycTypeId4,kycIdValue4,expiryDate4,isMobileNumberVerified,relationWithCOAPPL,relationWithGRNTR) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [id, loanApplicationId, clientTypeId, relationTypeId, titleId, firstName, middleName, lastName, dateOfBirth, age, genderId, mobileNumber, kycTypeId1, kycIdValue1, expiryDate1, kycTypeId2, kycIdValue2, expiryDate2, kycTypeId3, kycIdValue3, expiryDate3, kycTypeId4, kycIdValue4, expiryDate4, isMobileNumberVerified, relationWithCOAPPL, relationWithGRNTR],
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


const getAllFamilyDetails = (id) => {
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

const getFamilyDetailsOnID = (id, clientType, relationTypeId) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName} WHERE loanApplicationId = ? AND clientTypeId=? AND id = ?`,
                [id, clientType, relationTypeId],
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


const deleteFamilyDetailsBasedID = (loanApplicationId, relationTypeId) => {
    const db = databaseInstance.getInstance();
    db.transaction((tx) => {
        tx.executeSql(`DELETE FROM ${tableName} WHERE loanApplicationId = ? AND relationTypeId = ?`,
            [loanApplicationId, relationTypeId],
            (tx, results) => {
                console.log('Rows affected:', results.rowsAffected);
            }, (error) => {
                console.error('Error executing SQL:', error);
            });
    });
};

const deleteAllFamilyDetails = async () => {
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
    insertFamilyDetails,
    getFamilyDetailsOnID,
    deleteAllFamilyDetails,
    deleteFamilyDetailsBasedID,
    getAllFamilyDetails
};
