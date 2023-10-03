/* eslint-disable prettier/prettier */
import databaseInstance from '../DatabaseInstance';

const tableName = 'tbl_SystemCodeDetails';

const insertSystemCodeDetails = (
  identity,
  id,
  subCodeID,
  label,
  displayOrder,
  isDefault,
) => {
  const db = databaseInstance.getInstance();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO ${tableName} (Identity, Id, SubCodeID, Label, DisplayOrder, IsDefault) VALUES (?, ?, ?, ?, ?, ?)`,
        [identity, id, subCodeID, label, displayOrder, isDefault],
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
        `SELECT * FROM ${tableName} WHERE identity = ? ORDER BY DisplayOrder ASC`,
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
};
