/* eslint-disable prettier/prettier */
import databaseInstance from '../DatabaseInstance';

const tableName = 'tbl_SystemMandatoryFields';

const insertSystemMandatoryFields = (
  id,
  loanApplicationNumber,
  tempNumber,
  branchId,
  leadId,
  customerCategoryId,
  customerSubcategoryId,
  customerTypeId,
  loanTypeId,
  loanPurposeId,
  productId,
  loanAmount,
  workflowId,
  sourceId,
  consent,
  isActive,
  status,
  applicationAppliedBy,
  applicationCreationDate,
  lmsApplicationNumber,
  createdBy,
  createdDate,
  modifiedBy,
  modifiedDate,
  supervisedBy,
  supervisedDate
) => {
  const db = databaseInstance.getInstance();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO ${tableName} (
          id,
          loanApplicationNumber,
          tempNumber,
          branchId,
          leadId,
          customerCategoryId,
          customerSubcategoryId,
          customerTypeId,
          loanTypeId,
          loanPurposeId,
          productId,
          loanAmount,
          workflowId,
          sourceId,
          consent,
          isActive,
          status,
          applicationAppliedBy,
          applicationCreationDate,
          lmsApplicationNumber,
          createdBy,
          createdDate,
          modifiedBy,
          modifiedDate,
          supervisedBy,
          supervisedDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
        [
          id,
          loanApplicationNumber,
          tempNumber,
          branchId,
          leadId,
          customerCategoryId,
          customerSubcategoryId,
          customerTypeId,
          loanTypeId,
          loanPurposeId,
          productId,
          loanAmount,
          workflowId,
          sourceId,
          consent,
          isActive,
          status,
          applicationAppliedBy,
          applicationCreationDate,
          lmsApplicationNumber,
          createdBy,
          createdDate,
          modifiedBy,
          modifiedDate,
          supervisedBy,
          supervisedDate,
        ],
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
        },
      );
    });
  });
};

const getSystemMandatoryFieldsBasedOnFieldUIID = fielduiid => {
  const db = databaseInstance.getInstance();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ${tableName} WHERE FieldUIID = ?`,
        [fielduiid],
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
        },
      );
    });
  });
};

const getSystemMandatoryFieldsBasedOnFieldUIIDModuleID = (
  fielduiid,
  moduleID,
) => {
  const db = databaseInstance.getInstance();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ${tableName} WHERE FieldUIID = ? AND moduleID = ?`,
        [fielduiid, moduleID],
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
        },
      );
    });
  });
};

const deleteAllSystemMandatoryFields = async () => {
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
  getAllSystemMandatoryFields,
  insertSystemMandatoryFields,
  deleteAllSystemMandatoryFields,
  getSystemMandatoryFieldsBasedOnFieldUIID,
  getSystemMandatoryFieldsBasedOnFieldUIIDModuleID,
};
