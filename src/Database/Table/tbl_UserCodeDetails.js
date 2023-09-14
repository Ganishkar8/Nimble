import databaseInstance from "../DatabaseInstance";

const tableName = 'tbl_UserCodeDetails';

const insertUserCodeDetails = (identity, id , subCodeID , label , displayOrder , isDefault ) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO ${tableName} (Identity, Id, SubCodeID, Label, DisplayOrder, IsDefault) VALUES (?, ?, ?, ?, ?, ?)`,
                [identity, id, subCodeID, label, displayOrder, isDefault],
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



const getUserCodeDetailsBasedOnID = (id) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName} WHERE identity = ? ORDER BY DisplayOrder ASC`,
                [id],
                (_, result) => {
                    const rows = result.rows;
                    const userCodeDetails = [];

                    for (let i = 0; i < rows.length; i++) {
                        userCodeDetails.push(rows.item(i));
                    }

                    resolve(userCodeDetails);
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};

const deleteAllUserCodeDetails = async () => {
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
    insertUserCodeDetails,
    getUserCodeDetailsBasedOnID,
    deleteAllUserCodeDetails,
};
