import databaseInstance from "../DatabaseInstance";

const tableName = 'tbl_lead_creation_business_details';

const insertLeadCreationBusinessDetails = (lead_id, industry_type_id, business_name, business_vintage_year, business_vintage_month, income_business_turnover, created_by) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT OR REPLACE INTO ${tableName} (lead_id, industry_type_id, business_name, business_vintage_year, business_vintage_month, income_business_turnover, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [lead_id, industry_type_id, business_name, business_vintage_year, business_vintage_month, income_business_turnover, created_by],
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

const getAllLeadCreationBusinessDetails = () => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName}`,
                [],
                (_, result) => {
                    const rows = result.rows;
                    const leadCreationBusinessDetails = [];

                    for (let i = 0; i < rows.length; i++) {
                        leadCreationBusinessDetails.push(rows.item(i));
                    }

                    resolve(leadCreationBusinessDetails);
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};

const getLeadCreationBusinessDetailsBasedOnLeadID = (leadid) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName} WHERE lead_id = ?`,
                [leadid],
                (_, result) => {
                    const rows = result.rows;
                    const leadCreationBusinessDetails = [];

                    for (let i = 0; i < rows.length; i++) {
                        leadCreationBusinessDetails.push(rows.item(i));
                    }

                    resolve(leadCreationBusinessDetails);
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};

const deleteAllLeadCreationBusinessDetails = async () => {
    try {

        const db = databaseInstance.getInstance();  // Execute the DELETE query

        const query = `DELETE FROM ${tableName}`;

        const [rowsAffected] = await db.executeSql(query);

        console.log(`${rowsAffected} records deleted`);



    } catch (error) {
        console.error('Error deleting records:', error);
    }
};

const deleteLeadCreationBusinessDetailsBasedOnID = async (leadid) => {
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
    getAllLeadCreationBusinessDetails,
    insertLeadCreationBusinessDetails,
    deleteAllLeadCreationBusinessDetails,
    getLeadCreationBusinessDetailsBasedOnLeadID,
    deleteLeadCreationBusinessDetailsBasedOnID
};
