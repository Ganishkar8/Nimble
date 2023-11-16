/* eslint-disable prettier/prettier */
import databaseInstance from '../DatabaseInstance';

const tableName = 'leadPage';

const insertLeadPage = (id, moduleId, pageName, pageCode, pageDescription, moduleTypeId, displayOrder, createdBy, createdDate, modifiedBy, modifiedDate, active, hide, disable) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO ${tableName} (id, moduleId, pageName, pageCode, pageDescription,moduleTypeId, displayOrder,createdBy,createdDate,modifiedBy,modifiedDate,active,hide,disable) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?)`,
                [id, moduleId, pageName, pageCode, pageDescription, moduleTypeId, displayOrder, createdBy, createdDate, modifiedBy, modifiedDate, active, hide, disable],
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

const getLeadPageBasedOnID = id => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName} WHERE id = ? ORDER BY DisplayOrder ASC`,
                [id],
                (_, result) => {
                    const rows = result.rows;
                    const leadPage = [];

                    for (let i = 0; i < rows.length; i++) {
                        leadPage.push(rows.item(i));
                    }

                    resolve(leadPage);
                },
                error => {
                    reject(error);
                },
            );
        });
    });
};


const deleteAllLeadPage = async () => {
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
    insertLeadPage,
    getLeadPageBasedOnID,
    deleteAllLeadPage,
};
