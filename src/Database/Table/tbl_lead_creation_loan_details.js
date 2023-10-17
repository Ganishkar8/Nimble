import databaseInstance from "../DatabaseInstance";

const tableName = 'tbl_lead_creation_loan_details';

const insertLeadCreationLoanDetails = (lead_id, loan_type_id, loan_product_id, loan_purpose_id, loan_amount, lead_type_id, created_by) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT OR REPLACE INTO ${tableName} (lead_id, loan_type_id, loan_product_id, loan_purpose_id,loan_amount, lead_type_id, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [lead_id, loan_type_id, loan_product_id, loan_purpose_id, loan_amount, lead_type_id, created_by],
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

const getAllLeadCreationLoanDetails = () => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName}`,
                [],
                (_, result) => {
                    const rows = result.rows;
                    const leadCreationLoanDetails = [];

                    for (let i = 0; i < rows.length; i++) {
                        leadCreationLoanDetails.push(rows.item(i));
                    }

                    resolve(leadCreationLoanDetails);
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};

const getLeadCreationLoanDetailsBasedOnLeadID = (leadid) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName} WHERE lead_id = ?`,
                [leadid],
                (_, result) => {
                    const rows = result.rows;
                    const leadCreationLoanDetails = [];

                    for (let i = 0; i < rows.length; i++) {
                        leadCreationLoanDetails.push(rows.item(i));
                    }

                    resolve(leadCreationLoanDetails);
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};

const deleteAllLeadCreationLoanDetails = async () => {
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
    getAllLeadCreationLoanDetails,
    insertLeadCreationLoanDetails,
    deleteAllLeadCreationLoanDetails,
    getLeadCreationLoanDetailsBasedOnLeadID
};
