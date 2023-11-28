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
    `CREATE TABLE IF NOT EXISTS tbl_system_code (
        id TEXT,
        masterId TEXT,
        subCodeId TEXT,
        label TEXT,
        source TEXT,
        displayOrder TEXT,
        isDefault TEXT,
        isActive TEXT,
        parentId TEXT,
        createdBy TEXT,
        createdDate TEXT,
        modifiedBy TEXT,
        modifiedDate TEXT,
        active TEXT
      )`,
    `CREATE TABLE IF NOT EXISTS tbl_user_code (
        id TEXT,
        masterId TEXT,
        subCodeId TEXT,
        label TEXT,
        source TEXT,
        platformRestriction TEXT,
        display_order TEXT,
        is_default TEXT,
        is_active TEXT,
        parent_id TEXT,
        createdBy TEXT,
        createdDate TEXT,
        modifiedBy TEXT,
        modifiedDate TEXT,
        _active TEXT
      )`,
    //tbl_lead_creation_lead_details
    `CREATE TABLE IF NOT EXISTS tbl_lead_creation_lead_details (
        id TEXT PRIMARY KEY NOT NULL,
        lead_number TEXT,
        branch_id TEXT,
        is_active TEXT,
        created_by TEXT,
        created_date TEXT
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
        created_by TEXT,
        created_On TEXT
      );`,
    //tbl_lead_image
    `CREATE TABLE IF NOT EXISTS tbl_lead_image (
      lead_id TEXT PRIMARY KEY NOT NULL,
      dms_id TEXT,
      image TEXT,
      created_by TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS leadStage (
      id TEXT,
      stageCode TEXT,
      stageName TEXT,
      stageOrder TEXT,
      stageDescription TEXT,
      createdBy TEXT,
      createdDate TEXT,
      modifiedBy TEXT,
      modifiedDate TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS leadSubStage (
      id TEXT,
      stageId TEXT,
      subStageCode TEXT,
      subStageName TEXT,
      subStageDescription TEXT,
      displayOrder TEXT,
      createdBy TEXT,
      createdDate TEXT,
      modifiedBy TEXT,
      modifiedDate TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS leadModule (
      id TEXT,
      subStageId TEXT,
      moduleName TEXT,
      moduleCode TEXT,
      moduleDescription TEXT,
      displayOrder TEXT,
      createdBy TEXT,
      createdDate TEXT,
      modifiedBy TEXT,
      modifiedDate TEXT,
      active TEXT,
      hide TEXT,   
      disable TEXT  
    )`,
    `CREATE TABLE IF NOT EXISTS leadPage (
      id TEXT,
      moduleId TEXT,
      pageName TEXT,
      pageCode TEXT,
      pageDescription TEXT,
      displayOrder TEXT,
      moduleTypeId TEXT,
      createdBy TEXT,
      createdDate TEXT,
      modifiedBy TEXT,
      modifiedDate TEXT,
      active TEXT,
      hide TEXT,
      disable TEXT 
    )`,
    `CREATE TABLE IF NOT EXISTS leadSystemMandatoryField (
      id TEXT,
      pageId TEXT,
      fieldName TEXT,
      fieldUiid TEXT,
      fieldTabId TEXT,
      fieldDescription TEXT,
      fieldCaptionChange TEXT,
      moduleTypeId TEXT,
      displayOrder TEXT,
      minLength TEXT,
      maxLength TEXT,
      createdBy TEXT,
      createdDate TEXT,
      modifiedBy TEXT,
      modifiedDate TEXT,
      hide TEXT,
      disable TEXT,
      captionChange TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS tbl_client (
      id TEXT,
      loanApplicationId TEXT,
      clientTypeId TEXT,
      relationTypeId TEXT,
      titleId TEXT,
      firstName TEXT,
      middleName TEXT,
      lastName TEXT,
      dateOfBirth TEXT,
      age TEXT,
      fatherName TEXT,
      spouseName TEXT,
      casteId TEXT,
      religionId TEXT,
      motherTongueId TEXT,
      educationQualificationId TEXT,
      genderId TEXT,
      maritalStatusId TEXT,
      mobileNumber TEXT,
      email TEXT,
      isKycManual TEXT,
      kycTypeId1 TEXT,
      kycIdValue1 TEXT,
      expiryDate1 TEXT,
      kycTypeId2 TEXT,
      kycIdValue2 TEXT,
      expiryDate2 TEXT,
      kycTypeId3 TEXT,
      kycIdValue3 TEXT,
      expiryDate3 TEXT,
      kycTypeId4 TEXT,
      kycIdValue4 TEXT,
      expiryDate4 TEXT,
      isMsme TEXT,
      isAadharNumberVerified TEXT,
      isPanVerified TEXT,
      udyamRegistrationNumber TEXT,
      isUdyamRegistrationNumberVerified TEXT,
      isMobileNumberVerified TEXT,
      isEmailVerified TEXT,
      dedupeCheck TEXT,
      isDedupePassed TEXT,
      dmsId TEXT,
      image TEXT,
      geoCode TEXT,
      isActive TEXT,
      clientCreationDate TEXT,
      createdBy TEXT,
      createdDate TEXT,
      modifiedBy TEXT,
      modifiedDate TEXT,
      supervisedBy TEXT,
      supervisedDate TEXT,
      lmsClientId TEXT,
      lmsCustomerTypeId TEXT,
      PRIMARY KEY (loanApplicationId, clientTypeId)
    )`,
    `CREATE TABLE IF NOT EXISTS tbl_loanApplication (
      id TEXT,
      clientType TEXT,
      loan_application_number TEXT,
      temp_number TEXT,
      branch_id TEXT,
      lead_id TEXT,
      customer_category TEXT,
      customer_subcategory TEXT,
      customer_type TEXT,
      loan_type TEXT,
      loan_purpose TEXT,
      product TEXT,
      loan_amount TEXT,
      workflow_id TEXT,
      source_id TEXT,
      consent TEXT,
      is_active TEXT,
      status TEXT,
      application_applied_by TEXT,
      application_creation_date TEXT,
      lms_application_number TEXT,
      is_manual_kyc TEXT,
      manual_kyc_status TEXT,
      manual_kyc_approved_by TEXT,
      manual_kyc_approved_date TEXT,
      created_by TEXT,
      created_date TEXT,
      modified_by TEXT,
      modified_date TEXT,
      supervised_by TEXT,
      supervised_date TEXT,
      PRIMARY KEY (loan_application_number, clientType)
    )`,
    `CREATE TABLE IF NOT EXISTS tbl_clientaddressinfo (
      loanApplicationId TEXT,
      id TEXT,
      client_id TEXT,
      client_type TEXT,
      address_type TEXT,
      address_line_1 TEXT,
      address_line_2 TEXT,
      landmark TEXT,
      pincode TEXT,
      city TEXT,
      district TEXT,
      state TEXT,
      country TEXT,
      mobile_or_land_line_number TEXT,
      email_id TEXT,
      address_ownership TEXT,
      owner_details TEXT,
      owner_name TEXT,
      geo_classification TEXT,
      years_at_residence TEXT,
      years_in_current_city_or_town TEXT,
      is_active TEXT,
      created_by TEXT,
      created_date TEXT,
      modified_by TEXT,
      modified_date TEXT,
      supervised_by TEXT,
      supervised_date TEXT,
      isKyc TEXT,
      PRIMARY KEY (loanApplicationId, address_type)
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
        },
      );
    });
  });
};

export default {
  createTables,
};
