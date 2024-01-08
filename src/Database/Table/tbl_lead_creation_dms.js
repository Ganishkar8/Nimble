import databaseInstance from "../DatabaseInstance";

const tableName = 'tbl_lead_creation_dms';

const insertLeadCreationDmsDetails = (lead_id, dms_id, file_name, file_info, file_type, geo_location, comments, created_by, created_On) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            comments
            tx.executeSql(
                `INSERT OR REPLACE INTO ${tableName} (lead_id, dms_id, file_name, file_info, file_type, geo_location,comments, created_by,created_On) VALUES (?, ?, ?, ?, ?, ?, ?,?,?)`,
                [lead_id, dms_id, file_name, file_info, file_type, geo_location, comments, created_by, created_On],
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

const getAllLeadCreationDmsDetails = () => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName}`,
                [],
                (_, result) => {
                    const rows = result.rows;
                    const leadCreationDmsDetails = [];

                    for (let i = 0; i < rows.length; i++) {
                        leadCreationDmsDetails.push(rows.item(i));
                    }

                    resolve(leadCreationDmsDetails);
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};

const getLeadCreationDmsDetailsBasedOnLeadID = (leadid) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName} WHERE lead_id = ?`,
                [leadid],
                (_, result) => {
                    const rows = result.rows;
                    const leadCreationDmsDetails = [];

                    for (let i = 0; i < rows.length; i++) {
                        leadCreationDmsDetails.push(rows.item(i));
                    }

                    resolve(leadCreationDmsDetails);
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};

const deleteAllLeadCreationDmsDetails = async () => {
    try {

        const db = databaseInstance.getInstance();  // Execute the DELETE query

        const query = `DELETE FROM ${tableName}`;

        const [rowsAffected] = await db.executeSql(query);

        console.log(`${rowsAffected} records deleted`);



    } catch (error) {
        console.error('Error deleting records:', error);
    }
};

const deleteLeadCreationDmsDetailsBasedOnID = async (leadid) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM ${tableName} WHERE lead_id = ?`,
                [leadid],
                (_, result) => {
                    resolve('record Deleted');
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};

export default {
    getAllLeadCreationDmsDetails,
    insertLeadCreationDmsDetails,
    deleteAllLeadCreationDmsDetails,
    getLeadCreationDmsDetailsBasedOnLeadID,
    deleteLeadCreationDmsDetailsBasedOnID
};
