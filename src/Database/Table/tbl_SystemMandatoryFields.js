import databaseInstance from "../DatabaseInstance";

const tableName = 'tbl_SystemMandatoryFields';

const insertSystemMandatoryFields = (moduleID, fieldName , isMandatory , fieldUIID , fieldTabID , moduleTypeID , isDisable ,isCaptionChange, isHide, minLength, maxLength ) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO ${tableName} (ModuleID, FieldName, IsMandatory, FieldUIID, FieldTabID, ModuleTypeID, IsDisable, IsCaptionChange, IsHide, MinLength, MaxLength) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [moduleID, fieldName, isMandatory, fieldUIID, fieldTabID, moduleTypeID, isDisable, isCaptionChange, isHide, minLength, maxLength],
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

const getAllSystemMandatoryFields = () => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName}`,
                [],
                (_, result) => {
                    const rows = result.rows;
                    const systemMandatoryFields = [];

                    for (let i = 0; i < rows.length; i++) {
                        systemMandatoryFields.push(rows.item(i));
                    }

                    resolve(systemMandatoryFields);
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};

const deleteAllSystemMandatoryFields = async () => {
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
    getAllSystemMandatoryFields,
    insertSystemMandatoryFields,
    deleteAllSystemMandatoryFields,
};
