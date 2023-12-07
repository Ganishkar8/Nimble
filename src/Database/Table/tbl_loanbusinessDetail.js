/* eslint-disable prettier/prettier */
import databaseInstance from '../DatabaseInstance';

const tableName = 'tbl_loanbusinessDetail';

const insertBusinessDetail = (
    loanApplicationId,
    id,
    client_id,
    client_type,
    customerSubCatg,
    enterpriseShopName,
    udyamRegNum,
    dateofReg,
    dateofIncorp,
    dateofBusiness,
    year,
    month,
    industryType,
    industryLine,
    companyType,
    enterpriseType,
    businessLocation,
    noofEmployees,
    operatingdays,
    operatingtiming,
    bookKeepingStatus,
    homeBasedBusiness,
    custTransMode,
    timeByPromoter,
    npmRate,
    purchaseFrequency,
    typeofPurchase,
    salesFrequency,
    dmsId) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT OR REPLACE INTO ${tableName} (
                    loanApplicationId,
                    id,
                    client_id,
                    client_type,
                    customerSubCatg,
                    enterpriseShopName,
                    udyamRegNum,
                    dateofReg,
                    dateofIncorp,
                    dateofBusiness,
                    year,
                    month,
                    industryType,
                    industryLine,
                    companyType,
                    enterpriseType,
                    businessLocation,
                    noofEmployees,
                    operatingdays,
                    operatingtiming,
                    bookKeepingStatus,
                    homeBasedBusiness,
                    custTransMode,
                    timeByPromoter,
                    npmRate,
                    purchaseFrequency,
                    typeofPurchase,
                    salesFrequency,
                    dmsId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [loanApplicationId,
                    id,
                    client_id,
                    client_type,
                    customerSubCatg,
                    enterpriseShopName,
                    udyamRegNum,
                    dateofReg,
                    dateofIncorp,
                    dateofBusiness,
                    year,
                    month,
                    industryType,
                    industryLine,
                    companyType,
                    enterpriseType,
                    businessLocation,
                    noofEmployees,
                    operatingdays,
                    operatingtiming,
                    bookKeepingStatus,
                    homeBasedBusiness,
                    custTransMode,
                    timeByPromoter,
                    npmRate,
                    purchaseFrequency,
                    typeofPurchase,
                    salesFrequency,
                    dmsId],
                (_, result) => {
                    //alert(JSON.stringify(result))
                    resolve(result);
                },
                error => {
                    reject(error);
                },
            );
        });
    });
};


const getBusinessDetailsBasedOnID = (id, client_type, client_id) => {
    const db = databaseInstance.getInstance();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName} WHERE loanApplicationId = ? AND client_type = ? AND client_id = ?`,
                [id, client_type, client_id],
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



const deleteAllBusinessDetails = async () => {
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
    insertBusinessDetail,
    getBusinessDetailsBasedOnID,
    deleteAllBusinessDetails
};
