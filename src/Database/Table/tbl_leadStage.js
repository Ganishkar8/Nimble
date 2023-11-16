/* eslint-disable prettier/prettier */
import databaseInstance from '../DatabaseInstance';

const tableName = 'leadStage';

const insertLeadStage = (id, stageCode, stageName, stageOrder, stageDescription, createdBy, createdDate, modifiedBy, modifiedDate) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO ${tableName} (id, stageCode, stageName, stageOrder, stageDescription, createdBy,createdDate,modifiedBy,modifiedDate) VALUES (?, ?, ?, ?, ?, ?,?,?,?)`,
                [id, stageCode, stageName, stageOrder, stageDescription, createdBy, createdDate, modifiedBy, modifiedDate],
                (_, result) => {
                    resolve(result);
                },
                error => {
                    reject(error);
                },
            );
        });
    });
};

const getLeadStageBasedOnID = id => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName} WHERE id = ? ORDER BY DisplayOrder ASC`,
                [id],
                (_, result) => {
                    const rows = result.rows;
                    const leadStageDetails = [];

                    for (let i = 0; i < rows.length; i++) {
                        leadStageDetails.push(rows.item(i));
                    }

                    resolve(leadStageDetails);
                },
                error => {
                    reject(error);
                },
            );
        });
    });
};

const deleteAllLeadStage = async () => {
    try {
        const db = databaseInstance.getInstance(); // Execute the DELETE query

        const query = `DELETE FROM ${tableName}`;

        const [rowsAffected] = await db.executeSql(query);

        console.log(`${rowsAffected} records deleted`);
    } catch (error) {
        console.error('Error deleting records:', error);
    }
};

export default {
    insertLeadStage,
    getLeadStageBasedOnID,
    deleteAllLeadStage
};
