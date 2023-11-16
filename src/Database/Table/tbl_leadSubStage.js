/* eslint-disable prettier/prettier */
import databaseInstance from '../DatabaseInstance';

const tableName = 'leadSubStage';

const insertLeadSubStage = (id, stageId, subStageCode, subStageName, subStageDescription, displayOrder, createdBy, createdDate, modifiedBy, modifiedDate) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO ${tableName} (id, stageId, subStageCode, subStageName, subStageDescription,displayOrder, createdBy,createdDate,modifiedBy,modifiedDate) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?)`,
                [id, stageId, subStageCode, subStageName, subStageDescription, displayOrder, createdBy, createdDate, modifiedBy, modifiedDate],
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

const getLeadSubStageBasedOnID = id => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName} WHERE id = ? ORDER BY DisplayOrder ASC`,
                [id],
                (_, result) => {
                    const rows = result.rows;
                    const leadSubStageDetails = [];

                    for (let i = 0; i < rows.length; i++) {
                        leadSubStageDetails.push(rows.item(i));
                    }

                    resolve(leadSubStageDetails);
                },
                error => {
                    reject(error);
                },
            );
        });
    });
};

const deleteAllLeadSubStage = async () => {
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
    insertLeadSubStage,
    getLeadSubStageBasedOnID,
    deleteAllLeadSubStage
};
