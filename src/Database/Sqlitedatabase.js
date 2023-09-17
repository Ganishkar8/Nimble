import databaseInstance from './DatabaseInstance';

let db;


const createTables = async () => {

    db = databaseInstance.getInstance()

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
        FieldUIID TEXT PRIMARY KEY,
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



        // Add more CREATE TABLE queries for other tables...
    ];

    const dropqueries = [
        // tbl_SystemMandatoryFields
        `DROP TABLE IF EXISTS tbl_SystemMandatoryFields`,
        ,



        // Add more CREATE TABLE queries for other tables...
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
                }
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
                }
            );
        });
    });
};


export default {
    createTables
};