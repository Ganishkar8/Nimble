
import databaseInstance from '../DatabaseInstance';

const tableName = 'tbl_loanApplication';

const insertLoanApplication = (id, clientType, loan_application_number, temp_number, branch_id, lead_id, customer_category, customer_subcategory, customer_type, loan_type, loan_purpose,
  product, loan_amount, workflow_id, source_id, consent, is_active, status, application_applied_by, application_creation_date, lms_application_number, is_manual_kyc, manual_kyc_status, manual_kyc_approved_by, manual_kyc_approved_date, created_by,
  created_date, modified_by, modified_date, supervised_by, supervised_date) => {

  const db = databaseInstance.getInstance();

  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      tx.executeSql(
        `INSERT OR REPLACE INTO ${tableName} (id,clientType,loan_application_number,temp_number,branch_id,lead_id,customer_category,customer_subcategory,customer_type,loan_type,loan_purpose,product,loan_amount,workflow_id,source_id,consent,is_active,status,application_applied_by,application_creation_date,lms_application_number,is_manual_kyc,manual_kyc_status,manual_kyc_approved_by,manual_kyc_approved_date,created_by,created_date,modified_by,modified_date,supervised_by,supervised_date) VALUES (?, ?, ?, ?, ?,?,?,?,?,?,?, ?, ?, ?, ?, ?,?,?,?,?,?,?, ?, ?, ?, ?, ?,?,?,?,?)`,
        [id, clientType, loan_application_number, temp_number, branch_id, lead_id, customer_category, customer_subcategory, customer_type, loan_type, loan_purpose, product, loan_amount, workflow_id, source_id, consent, is_active, status, application_applied_by, application_creation_date, lms_application_number, is_manual_kyc, manual_kyc_status, manual_kyc_approved_by, manual_kyc_approved_date, created_by, created_date, modified_by, modified_date, supervised_by, supervised_date],
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


const getLoanAppBasedOnID = (id, clientType) => {
  const db = databaseInstance.getInstance();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ${tableName} WHERE id = ? AND clientType=?`,
        [id, clientType],
        (_, result) => {
          const rows = result.rows;
          const clientData = [];

          for (let i = 0; i < rows.length; i++) {
            clientData.push(rows.item(i));
          }

          resolve(clientData);
        },
        error => {
          reject(error);
        },
      );
    });
  });
};


const deleteAllLoan = async () => {
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
  insertLoanApplication,
  getLoanAppBasedOnID,
  deleteAllLoan,
};
