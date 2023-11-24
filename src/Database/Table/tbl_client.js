/* eslint-disable prettier/prettier */
import databaseInstance from '../DatabaseInstance';

const tableName = 'tbl_client';

const insertClient = (loanApplicationId, clientTypeId, relationTypeId, titleId, firstName, middleName, lastName, dateOfBirth, age, fatherName, spouseName, casteId, religionId, motherTongueId, educationQualificationId, genderId, maritalStatusId, mobileNumber, email, isKycManual, kycTypeId1,
    kycIdValue1,
    expiryDate1,
    kycTypeId2,
    kycIdValue2,
    expiryDate2,
    kycTypeId3,
    kycIdValue3,
    expiryDate3,
    kycTypeId4,
    kycIdValue4,
    expiryDate4,
    isMsme,
    isAadharNumberVerified,
    isPanVerified,
    udyamRegistrationNumber,
    isUdyamRegistrationNumberVerified,
    isMobileNumberVerified,
    isEmailVerified,
    dedupeCheck,
    isDedupePassed,
    dmsId,
    image,
    geoCode,
    isActive,
    clientCreationDate,
    createdBy,
    createdDate,
    modifiedBy,
    modifiedDate,
    supervisedBy,
    supervisedDate,
    lmsClientId,
    lmsCustomerTypeId) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT OR REPLACE INTO ${tableName} ( loanApplicationId, clientTypeId, relationTypeId, titleId,firstName, middleName,lastName,dateOfBirth,age,fatherName,spouseName,casteId,religionId,motherTongueId,educationQualificationId,genderId,maritalStatusId,mobileNumber,email,isKycManual,kycTypeId1,kycIdValue1,expiryDate1,kycTypeId2,kycIdValue2,expiryDate2,kycTypeId3,kycIdValue3,expiryDate3,kycTypeId4,kycIdValue4,expiryDate4,isMsme,isAadharNumberVerified,isPanVerified,udyamRegistrationNumber,isUdyamRegistrationNumberVerified,isMobileNumberVerified,isEmailVerified,dedupeCheck,isDedupePassed,dmsId,image,geoCode,isActive,clientCreationDate,createdBy,createdDate,modifiedBy,modifiedDate,supervisedBy,supervisedDate,lmsClientId,lmsCustomerTypeId) VALUES (?, ?, ?, ?, ?,?,?,?,?,?,?, ?, ?, ?, ?, ?,?,?,?,?,?,?, ?, ?, ?, ?, ?,?,?,?,?,?,?, ?, ?, ?, ?, ?,?,?,?,?,?,?, ?, ?, ?, ?, ?,?,?,?,?,?)`,
                [loanApplicationId, clientTypeId, relationTypeId, titleId, firstName, middleName, lastName, dateOfBirth, age, fatherName, spouseName, casteId, religionId, motherTongueId, educationQualificationId, genderId, maritalStatusId, mobileNumber, email, isKycManual, kycTypeId1, kycIdValue1, expiryDate1, kycTypeId2, kycIdValue2, expiryDate2, kycTypeId3, kycIdValue3, expiryDate3, kycTypeId4, kycIdValue4, expiryDate4, isMsme, isAadharNumberVerified, isPanVerified, udyamRegistrationNumber, isUdyamRegistrationNumberVerified, isMobileNumberVerified, isEmailVerified, dedupeCheck, isDedupePassed, dmsId, image, geoCode, isActive, clientCreationDate, createdBy, createdDate, modifiedBy, modifiedDate, supervisedBy, supervisedDate, lmsClientId, lmsCustomerTypeId],
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

const updateAadharData = (name, dob, age, gender, fatherName, spouseName, imgDmsId, docDmsId, loanApplicationId) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE ${tableName} SET firstName = ?, dateOfBirth = ?, age = ?, genderId = ?, fatherName = ?, spouseName= ?, image = ?, dmsId = ? WHERE loanApplicationId = ?`,
                [name, dob, age, gender, fatherName, spouseName, imgDmsId, docDmsId, loanApplicationId],
                (_, result) => {
                    resolve(result);
                },
                error => {
                    reject(error);
                },
            );
        });
    });
}

const getClientBasedOnID = id => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName} WHERE loanApplicationId = ?`,
                [id],
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


const deleteAllClient = async () => {
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
    insertClient,
    getClientBasedOnID,
    deleteAllClient,
    updateAadharData
};
