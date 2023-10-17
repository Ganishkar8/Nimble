export const validateData = DataArray => {
  let flag = false;
  let errMsg = '';
  let errorCounter = 1;

  DataArray.forEach(item => {
    if (
      (item.IsHide === '' || item.IsHide === '0') &&
      item.isMandatory === '1' &&
      (item.fieldValue === '' || item.fieldValue === undefined)
    ) {
      errMsg += `${errorCounter}) Please Select ${item.fieldName}\n`;
      errorCounter++;
    }
  });

  // console.log('DataArrayFromValidate', errMsg);

  if (errMsg !== '') {
    flag = true;
  }

  return {flag, errMsg};
};
