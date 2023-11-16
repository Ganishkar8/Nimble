/* eslint-disable prettier/prettier */
import databaseInstance from '../DatabaseInstance';

const tableName = 'leadModule';

const insertLeadModule = (id, subStageId, moduleName, moduleCode, moduleDescription, displayOrder, createdBy, createdDate, modifiedBy, modifiedDate, active, hide, disable) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO ${tableName} (id, subStageId, moduleName, moduleCode, moduleDescription, displayOrder,createdBy,createdDate,modifiedBy,modifiedDate,active,hide,disable) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?)`,
                [id, subStageId, moduleName, moduleCode, moduleDescription, displayOrder, createdBy, createdDate, modifiedBy, modifiedDate, active, hide, disable],
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

const getLeadModuleBasedOnID = id => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName} WHERE id = ? ORDER BY DisplayOrder ASC`,
                [id],
                (_, result) => {
                    const rows = result.rows;
                    const leadModule = [];

                    for (let i = 0; i < rows.length; i++) {
                        leadModule.push(rows.item(i));
                    }

                    resolve(leadModule);
                },
                error => {
                    reject(error);
                },
            );
        });
    });
};


const deleteAllLeadModule = async () => {
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
    insertLeadModule,
    getLeadModuleBasedOnID,
    deleteAllLeadModule,
};
