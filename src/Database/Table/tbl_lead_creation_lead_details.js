import databaseInstance from "../DatabaseInstance";

const tableName = 'tbl_lead_creation_lead_details';

const insertLeadCreationLeadDetails = (id, leadnumber, branchid, isactive, createdby) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT OR REPLACE INTO ${tableName} (id, lead_number, branch_id, is_active, created_by) VALUES (?, ?, ?, ?, ?)`,
                [id, leadnumber, branchid, isactive, createdby],
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

const updateLeadCreationLeadDetails = (id, leadnumber, branchid, isactive, createdby) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE ${tableName} SET lead_number = ?, branch_id = ?, is_active = ?, created_by = ? WHERE id = ?`,
                [leadnumber, branchid, isactive, createdby, id],
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

const getAllLeadCreationLeadDetails = () => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName}`,
                [],
                (_, result) => {
                    const rows = result.rows;
                    const leadDetails = [];

                    for (let i = 0; i < rows.length; i++) {
                        leadDetails.push(rows.item(i));
                    }

                    resolve(leadDetails);
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};

const getLeadCreationLeadDetailsBasedOnLeadID = (leadid) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName} WHERE id = ?`,
                [leadid],
                (_, result) => {
                    const rows = result.rows;
                    const leadDetails = [];

                    for (let i = 0; i < rows.length; i++) {
                        leadDetails.push(rows.item(i));
                    }

                    resolve(leadDetails);
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};

const deleteAllLeadCreationLeadDetails = async () => {
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
    getAllLeadCreationLeadDetails,
    insertLeadCreationLeadDetails,
    updateLeadCreationLeadDetails,
    deleteAllLeadCreationLeadDetails,
    getLeadCreationLeadDetailsBasedOnLeadID
};
