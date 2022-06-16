import * as XLSX from 'xlsx';

export const readExcelImp = (file, setTableHeader, setTableData, view) => {
  const promise = new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = e => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'buffer' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const result = XLSX.utils.sheet_to_json(sheet);
      resolve(result);
    };

    fileReader.onerror = error => {
      reject(error);
    };
  });
  promise
    .then(result => {
      // set headers
      const headers = [];
      if (result.length > 0) {
        // get all the column names if some or any row has data
        result.forEach(row => {
          Object.keys(row).forEach(key => {
            if (!headers.includes(key)) {
              headers.push(key);
            }
          });
        });
        // fill empty cells with empty string
        result.forEach(row => {
          headers.forEach(header => {
            if (!row[header]) {
              row[header] = null;
            }
          });
        });

        headers.push('Select');
        headers.push('View');
        headers.push('Print');
      }
      setTableHeader(headers);
      setTableData(result);
      view(result[0]);
    })
    .catch(error => {
      console.log(error);
    });
};
