import databaseInstance from "../DatabaseInstance";

const tableName = 'tbl_lead_creation_basic_details';

const insertLeadCreationBasicDetails = (lead_id, customer_category_id, title_id, first_name, middle_name, last_name, gender_id, mobile_number, created_by) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT OR REPLACE INTO ${tableName} ( lead_id, customer_category_id, title_id, first_name, middle_name, last_name, gender_id, mobile_number , created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [lead_id, customer_category_id, title_id, first_name, middle_name, last_name, gender_id, mobile_number, created_by],
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

const getAllLeadCreationBasicDetails = () => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName}`,
                [],
                (_, result) => {
                    const rows = result.rows;
                    const leadCreationBasicDetails = [];

                    for (let i = 0; i < rows.length; i++) {
                        leadCreationBasicDetails.push(rows.item(i));
                    }

                    resolve(leadCreationBasicDetails);
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};

const getLeadCreationBasicDetailsBasedOnLeadID = (leadid) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName} WHERE lead_id = ?`,
                [leadid],
                (_, result) => {
                    const rows = result.rows;
                    const leadCreationBasicDetails = [];

                    for (let i = 0; i < rows.length; i++) {
                        leadCreationBasicDetails.push(rows.item(i));
                    }

                    resolve(leadCreationBasicDetails);
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};

const deleteAllLeadCreationBasicDetails = async () => {
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
    getAllLeadCreationBasicDetails,
    insertLeadCreationBasicDetails,
    deleteAllLeadCreationBasicDetails,
    getLeadCreationBasicDetailsBasedOnLeadID
};
