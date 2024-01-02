import databaseInstance from "../DatabaseInstance";

const tableName = 'tbl_lead_image';

const insertLeadImage = (lead_id, dms_id, image, created_by) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT OR REPLACE INTO ${tableName} (lead_id, dms_id, image, created_by) VALUES (?, ?, ?, ?)`,
                [lead_id, dms_id, image, created_by],
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



const getAllLeadImage = () => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName}`,
                [],
                (_, result) => {
                    const rows = result.rows;
                    const leadImage = [];

                    for (let i = 0; i < rows.length; i++) {
                        leadImage.push(rows.item(i));
                    }

                    resolve(leadImage);
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};

const getLeadImageBasedOnLeadID = (leadid) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName} WHERE lead_id = ?`,
                [leadid],
                (_, result) => {
                    const rows = result.rows;
                    const leadImage = [];

                    for (let i = 0; i < rows.length; i++) {
                        leadImage.push(rows.item(i));
                    }

                    resolve(leadImage);
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};

const deleteAllLeadImageDetails = async () => {
    try {

        const db = databaseInstance.getInstance();  // Execute the DELETE query

        const query = `DELETE FROM ${tableName}`;

        const [rowsAffected] = await db.executeSql(query);

        console.log(`${rowsAffected} records deleted`);



    } catch (error) {
        console.error('Error deleting records:', error);
    }
};

const deleteLeadImageDetailsBasedOnID = async (leadid) => {
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
    getAllLeadImage,
    insertLeadImage,
    deleteAllLeadImageDetails,
    getLeadImageBasedOnLeadID,
    deleteLeadImageDetailsBasedOnID
};
