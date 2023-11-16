/* eslint-disable prettier/prettier */
import databaseInstance from '../DatabaseInstance';

const tableName = 'leadSystemMandatoryField';

const insertLeadSystemMandatoryField = (id, pageId, fieldName, fieldUiid, fieldTabId, fieldDescription, fieldCaptionChange, moduleTypeId, displayOrder, minLength, maxLength, createdBy, createdDate, modifiedBy, modifiedDate, hide, disable, captionChange) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO ${tableName} (id, pageId, fieldName, fieldUiid, fieldTabId,fieldDescription, fieldCaptionChange,moduleTypeId,displayOrder,minLength,maxLength,createdBy,createdDate,modifiedBy,modifiedDate,hide,disable,captionChange) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [id, pageId, fieldName, fieldUiid, fieldTabId, fieldDescription, fieldCaptionChange, moduleTypeId, displayOrder, minLength, maxLength, createdBy, createdDate, modifiedBy, modifiedDate, hide, disable, captionChange],
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

const getLeadSystemMandatoryFieldBasedOnID = id => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName} WHERE id = ? ORDER BY DisplayOrder ASC`,
                [id],
                (_, result) => {
                    const rows = result.rows;
                    const leadSystemMandatoryField = [];

                    for (let i = 0; i < rows.length; i++) {
                        leadSystemMandatoryField.push(rows.item(i));
                    }

                    resolve(leadSystemMandatoryField);
                },
                error => {
                    reject(error);
                },
            );
        });
    });
};


const deleteAllleadSystemMandatoryField = async () => {
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
    insertLeadSystemMandatoryField,
    getLeadSystemMandatoryFieldBasedOnID,
    deleteAllleadSystemMandatoryField,
};
