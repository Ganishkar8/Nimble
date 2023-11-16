/* eslint-disable prettier/prettier */
import databaseInstance from '../DatabaseInstance';

const tableName = 'tbl_system_code';

const insertSystemCodeDetails = (id, masterId, subCodeId, label, source, displayOrder, isDefault, isActive, parentId, createdBy, createdDate, modifiedBy, modifiedDate, active) => {
  const db = databaseInstance.getInstance();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO ${tableName} (id, masterId, subCodeId, label, source, displayOrder,isDefault,isActive,parentId,createdBy,createdDate,modifiedBy,modifiedDate,active) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?)`,
        [id, masterId, subCodeId, label, source, displayOrder, isDefault, isActive, parentId, createdBy, createdDate, modifiedBy, modifiedDate, active],
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

const getSystemCodeDetailsBasedOnID = id => {
  const db = databaseInstance.getInstance();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ${tableName} WHERE masterId = ? ORDER BY DisplayOrder ASC`,
        [id],
        (_, result) => {
          const rows = result.rows;
          const systemCodeDetails = [];

          for (let i = 0; i < rows.length; i++) {
            systemCodeDetails.push(rows.item(i));
          }

          resolve(systemCodeDetails);
        },
        error => {
          reject(error);
        },
      );
    });
  });
};

const getSystemCodeDetailsBasedOnParentID = (id) => {
  const db = databaseInstance.getInstance();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ${tableName} WHERE masterId = ? AND parentId = ? ORDER BY DisplayOrder ASC`,
        [id],
        (_, result) => {
          const rows = result.rows;
          const userCodeDetails = [];

          for (let i = 0; i < rows.length; i++) {
            userCodeDetails.push(rows.item(i));
          }

          resolve(userCodeDetails);
        },
        error => {
          reject(error);
        }
      );
    });
  });
};

const deleteAllSystemCodeDetails = async () => {
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
  insertSystemCodeDetails,
  getSystemCodeDetailsBasedOnID,
  deleteAllSystemCodeDetails,
  getSystemCodeDetailsBasedOnParentID
};
