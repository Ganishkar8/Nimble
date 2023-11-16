import databaseInstance from "../DatabaseInstance";

const tableName = 'tbl_user_code';

const insertUserCodeDetails = (id, masterId, subCodeId, label, source, platformRestriction, display_order, is_default, is_active, parent_id, createdBy, createdDate, modifiedBy, modifiedDate, _active) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO ${tableName} (id, masterId, subCodeId, label, source, platformRestriction,display_order,is_default,is_active,parent_id,createdBy,createdDate,modifiedBy,modifiedDate,_active) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?)`,
                [id, masterId, subCodeId, label, source, platformRestriction, display_order, is_default, is_active, parent_id, createdBy, createdDate, modifiedBy, modifiedDate, _active],
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
                `SELECT * FROM ${tableName} WHERE masterId = ? ORDER BY DisplayOrder ASC`,
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

const getUserCodeDetailsBasedOnParentID = (id) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName} WHERE masterId = ? AND parent_id = ? ORDER BY DisplayOrder ASC`,
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
    getUserCodeDetailsBasedOnParentID
};
