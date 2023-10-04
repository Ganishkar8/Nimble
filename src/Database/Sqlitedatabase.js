import databaseInstance from './DatabaseInstance';

let db;

const createTables = async () => {
  db = databaseInstance.getInstance();

  const queries = [
    // Bank_Detail_Table
    `CREATE TABLE IF NOT EXISTS Bank_Detail_Table (
            BankID TEXT NOT NULL,
            BankURL TEXT,
            IsRegistered TEXT,
            BankURL1 TEXT,
            BankURL2 TEXT,
            ConfigVersion TEXT,
            CertificateHash TEXT,
            PRIMARY KEY(BankID)
          )`,
    // tbl_SystemMandatoryFields
    `CREATE TABLE IF NOT EXISTS tbl_SystemMandatoryFields (
        ModuleID TEXT,
        FieldName TEXT,
        IsMandatory TEXT,
        FieldUIID TEXT ,
        FieldTabID TEXT,
        ModuleTypeID TEXT,
        IsDisable TEXT,
        IsCaptionChange TEXT,
        FieldCaptionChange TEXT,
        IsHide TEXT,
        MinLength TEXT,
        MaxLength TEXT
      )`,
    `CREATE TABLE IF NOT EXISTS tbl_SystemCodeDetails (
        Identity TEXT,
        Id TEXT,
        SubCodeID TEXT,
        Label TEXT,
        DisplayOrder TEXT,
        IsDefault TEXT
      )`,
    `CREATE TABLE IF NOT EXISTS tbl_UserCodeDetails (
        Identity TEXT,
        Id TEXT,
        SubCodeID TEXT,
        Label TEXT,
        DisplayOrder TEXT,
        IsDefault TEXT
      )`,
    //tbl_lead_creation_lead_details
    `CREATE TABLE IF NOT EXISTS tbl_lead_creation_lead_details (
        id TEXT PRIMARY KEY NOT NULL,
        lead_number TEXT,
        branch_id TEXT,
        is_active TEXT,
        created_by TEXT
      )`,
    //tbl_lead_creation_basic_details
    `CREATE TABLE IF NOT EXISTS tbl_lead_creation_basic_details (
        lead_id TEXT PRIMARY KEY NOT NULL,
        customer_category_id TEXT,
        title_id TEXT,
        first_name TEXT,
        middle_name TEXT,
        last_name TEXT,
        gender_id TEXT,
        mobile_number TEXT,
        created_by TEXT
      )`,
    //tbl_lead_creation_business_details
    `CREATE TABLE IF NOT EXISTS tbl_lead_creation_business_details (
        lead_id TEXT PRIMARY KEY NOT NULL,
        industry_type_id TEXT,
        business_name TEXT,
        business_vintage_year TEXT,
        business_vintage_month TEXT,
        income_business_turnover TEXT,
        created_by TEXT
      );`,
    // tbl_lead_creation_loan_details
    `CREATE TABLE IF NOT EXISTS tbl_lead_creation_loan_details (
        lead_id TEXT PRIMARY KEY NOT NULL,
        loan_type_id TEXT,
        loan_product_id TEXT,
        loan_purpose_id TEXT,
        loan_amount TEXT,
        lead_type_id TEXT,
        created_by TEXT
      )`,
    //tbl_lead_creation_dms
    `CREATE TABLE IF NOT EXISTS tbl_lead_creation_dms (
        lead_id TEXT PRIMARY KEY NOT NULL,
        dms_id TEXT,
        file_name TEXT,
        file_info TEXT,
        file_type TEXT,
        geo_location TEXT,
        comments TEXT,
        created_by TEXT
      );`,
    //tbl_lead_image
    `CREATE TABLE IF NOT EXISTS tbl_lead_image (
      lead_id TEXT PRIMARY KEY NOT NULL,
      dms_id TEXT,
      image TEXT,
      created_by TEXT
    );`,

    // Add more CREATE TABLE queries for other tables...
  ];

  const dropqueries = [
    // tbl_SystemMandatoryFields
    `DROP TABLE IF EXISTS tbl_SystemMandatoryFields`,

    // Add more CREATE TABLE queries for other tables...

    ,
  ];

  await db.transaction(tx => {
    dropqueries.forEach(query => {
      tx.executeSql(
        query,
        [],
        () => {
          console.log('Table droped successfully');
        },
        error => {
          console.error('Error dropping table:', error);
        },
      );
    });
  });

  await db.transaction(tx => {
    queries.forEach(query => {
      tx.executeSql(
        query,
        [],
        () => {
          console.log('Table created successfully');
        },
        error => {
          console.error('Error creating table:', error);
        },
      );
    });
  });
};

export default {
  createTables,
};
