import databaseInstance from "../DatabaseInstance";

const tableName = 'tbl_lead_creation_lead_details';
const tableName1 = 'tbl_lead_creation_basic_details';
const tableName2 = 'tbl_lead_creation_business_details';
const tableName3 = 'tbl_lead_creation_loan_details';

const insertLeadCreationLeadDetails = (id, leadnumber, branchid, isactive, createdby, created_date) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT OR REPLACE INTO ${tableName} (id, lead_number, branch_id, is_active, created_by,created_date) VALUES (?, ?, ?, ?, ?,?)`,
                [id, leadnumber, branchid, isactive, createdby, created_date],
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


const getLeadDraftDetail = (leadid) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT
                p.lead_number,
                p.created_date,
                c1.first_name,
                c1.middle_name,
                c1.last_name,
                c1.last_name,
                c3.lead_type_id
            FROM
            ${tableName} AS p
            LEFT JOIN
            ${tableName1} AS c1 ON p.id = c1.lead_id
            LEFT JOIN
            ${tableName3} AS c3 ON p.id = c3.lead_id
            WHERE
                p.id = ?
            `,
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

export default {
    getAllLeadCreationLeadDetails,
    insertLeadCreationLeadDetails,
    updateLeadCreationLeadDetails,
    deleteAllLeadCreationLeadDetails,
    getLeadCreationLeadDetailsBasedOnLeadID,
    getLeadDraftDetail
};
