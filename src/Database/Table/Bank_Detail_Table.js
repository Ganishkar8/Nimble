import databaseInstance from "../DatabaseInstance";

const tableName = 'Bank_Detail_Table';

const insertBankDetail = (bankID, bankURL, isRegistered, bankURL1, bankURL2, configVersion, certificateHash) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO ${tableName} (BankID, BankURL, IsRegistered, BankURL1, BankURL2, ConfigVersion, CertificateHash) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [bankID, bankURL, isRegistered, bankURL1, bankURL2, configVersion, certificateHash],
                (_, result) => {
                    resolve(result);
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

const deleteAllBankRecords = async () => {
    try {

        const db = databaseInstance.getInstance();  // Execute the DELETE query

        const query = `DELETE FROM ${tableName}`;

        const [rowsAffected] = await db.executeSql(query);

        console.log(`${rowsAffected} records deleted`);



    } catch (error) {
        console.error('Error deleting records:', error);
    }
};

export default {
    getAllBankDetails,
    insertBankDetail,
    deleteAllBankRecords,
};
