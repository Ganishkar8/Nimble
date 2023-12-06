/* eslint-disable prettier/prettier */
import databaseInstance from '../DatabaseInstance';

const tableName = 'tbl_client';

const insertClient = (id, loanApplicationId, clientTypeId, relationTypeId, titleId, firstName, middleName, lastName, dateOfBirth, age, fatherName, spouseName, casteId, religionId, motherTongueId, educationQualificationId, genderId, maritalStatusId, mobileNumber, email, isKycManual, kycTypeId1,
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
                `INSERT OR REPLACE INTO ${tableName} (id,loanApplicationId, clientTypeId, relationTypeId, titleId,firstName, middleName,lastName,dateOfBirth,age,fatherName,spouseName,casteId,religionId,motherTongueId,educationQualificationId,genderId,maritalStatusId,mobileNumber,email,isKycManual,kycTypeId1,kycIdValue1,expiryDate1,kycTypeId2,kycIdValue2,expiryDate2,kycTypeId3,kycIdValue3,expiryDate3,kycTypeId4,kycIdValue4,expiryDate4,isMsme,isAadharNumberVerified,isPanVerified,udyamRegistrationNumber,isUdyamRegistrationNumberVerified,isMobileNumberVerified,isEmailVerified,dedupeCheck,isDedupePassed,dmsId,image,geoCode,isActive,clientCreationDate,createdBy,createdDate,modifiedBy,modifiedDate,supervisedBy,supervisedDate,lmsClientId,lmsCustomerTypeId) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?,?,?, ?, ?, ?, ?, ?,?,?,?,?,?,?, ?, ?, ?, ?, ?,?,?,?,?,?,?, ?, ?, ?, ?, ?,?,?,?,?,?,?, ?, ?, ?, ?, ?,?,?,?,?,?)`,
                [id, loanApplicationId, clientTypeId, relationTypeId, titleId, firstName, middleName, lastName, dateOfBirth, age, fatherName, spouseName, casteId, religionId, motherTongueId, educationQualificationId, genderId, maritalStatusId, mobileNumber, email, isKycManual, kycTypeId1, kycIdValue1, expiryDate1, kycTypeId2, kycIdValue2, expiryDate2, kycTypeId3, kycIdValue3, expiryDate3, kycTypeId4, kycIdValue4, expiryDate4, isMsme, isAadharNumberVerified, isPanVerified, udyamRegistrationNumber, isUdyamRegistrationNumberVerified, isMobileNumberVerified, isEmailVerified, dedupeCheck, isDedupePassed, dmsId, image, geoCode, isActive, clientCreationDate, createdBy, createdDate, modifiedBy, modifiedDate, supervisedBy, supervisedDate, lmsClientId, lmsCustomerTypeId],
                (_, result) => {
                    //alert(JSON.stringify(result))
                    resolve(result);
                },
                error => {
                    alert(JSON.stringify(error))
                    reject(error);
                },
            );
        });
    });
};

const updateAadharData = (name, dob, age, gender, fatherName, spouseName, imgDmsId, docDmsId, loanApplicationId, clientTypeId) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE ${tableName} SET firstName = ?, dateOfBirth = ?, age = ?, genderId = ?, fatherName = ?, spouseName= ?, image = ?, dmsId = ?,isAadharNumberVerified=? WHERE loanApplicationId = ? AND clientTypeId = ?`,
                [name, dob, age, gender, fatherName, spouseName, imgDmsId, docDmsId, loanApplicationId, clientTypeId, '1'],
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

const updatePersonalDetails = (title, firstName, middleName, lastName, dob, age, gender, fatherName, spouseName, caste, religion, mothetTongue, eduQualification, geoCode, imgDmsId, loanApplicationId, clientTypeId) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE ${tableName} SET titleId = ?,firstName = ?,middleName = ?,lastName = ?, dateOfBirth = ?, age = ?, genderId = ?, fatherName = ?, spouseName= ?,casteId= ?,religionId= ?,motherTongueId= ?,educationQualificationId= ?,geoCode= ?, image = ? WHERE loanApplicationId = ? AND clientTypeId = ?`,
                [title, firstName, middleName, lastName, dob, age, gender, fatherName, spouseName, caste, religion, mothetTongue, eduQualification, geoCode, imgDmsId, loanApplicationId, clientTypeId],
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

const updateKYCManual = (kycmanual, loanApplicationId, clientTypeId) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE ${tableName} SET isKycManual = ? WHERE loanApplicationId = ? AND clientTypeId = ?`,
                [kycmanual, loanApplicationId, clientTypeId],
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

const getClientBasedOnID = (id, clientType) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT id,loanApplicationId,clientTypeId, relationTypeId, titleId,firstName, middleName,lastName,dateOfBirth,age,fatherName,spouseName,casteId,religionId,motherTongueId,educationQualificationId,genderId,maritalStatusId,mobileNumber,email,isKycManual,kycTypeId1,kycIdValue1,expiryDate1,kycTypeId2,kycIdValue2,expiryDate2,kycTypeId3,kycIdValue3,expiryDate3,kycTypeId4,kycIdValue4,expiryDate4,isMsme,isAadharNumberVerified,isPanVerified,udyamRegistrationNumber,isUdyamRegistrationNumberVerified,isMobileNumberVerified,isEmailVerified,dedupeCheck,isDedupePassed,dmsId,image,geoCode,lmsClientId,lmsCustomerTypeId FROM ${tableName} WHERE loanApplicationId = ? AND clientTypeId=?`,
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

const getOnlyClientBasedOnID = (id, clientType) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT id,isAadharNumberVerified FROM ${tableName} WHERE loanApplicationId = ? AND clientTypeId=?`,
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
    updateAadharData,
    updatePersonalDetails,
    getOnlyClientBasedOnID,
    updateKYCManual
};
