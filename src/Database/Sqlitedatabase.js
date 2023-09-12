import databaseInstance from './DatabaseInstance';

let db;


const createTables = async () => {

    db = databaseInstance.getInstance()

    const queries = [
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
        IsHide TEXT,
        MinLength TEXT,
        MaxLength TEXT
      )`,

       

        // Add more CREATE TABLE queries for other tables...
    ];

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