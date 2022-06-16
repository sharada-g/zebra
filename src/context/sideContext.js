const ZebraBrowserPrintWrapper = require('zebra-browser-print-wrapper');
const getZpl = item => {
  const Items = [];

  for (let key of Object.keys(item)) {
    if (key.match(/item/i))
      if (item[key] != null) {
        let divided = item[key]
          .toString()
          .slice(4)
          .match(/.{1,26}/g);
        divided.forEach((dividedItem, index) => {
          Items.push([
            dividedItem,
            index === 0 ? item[key].toString().slice(0, 3) : null,
          ]);
        });
      }
  }

  let zplData = `
  ^XA

^FX Top section with logo, name and address.

^FO25,50^GFA,408,408,8,,I07FCJ0FF8,007IFI07IF,00F01FI0F01F,01E007801C00F,01L03,,:I03CK03C,I0FFK0FF,003FFCI03FF8,007FFEI07FFC,00FC3FI0FC3E,01F00F001F00F,03E007803E007,03C007807C0078,078003C078003C,078019C0F0019C,0F003DE0F003DC,0E007CE1E007DE,1E007CE1C007CE,1C00FCE1C00FCE,1C00FEE1C00FCE,1C00FCE1C00FCE,0C007CE1C007DE,0E007DE0E007DC,0F0031C0E003BC,07I07C07I07C,07E00F807C01F8,03FE7F003FC7F,01IFE001IFC,003FFJ07FF,I078K078,,:::::002L02,007L07,0078K07,003CK0E,001FK0E,I0F8I03C,I07CI078,I01FC01F,J07IFE,J01IFC,K01FC,,^FS

^CF0,40
^FO210,50^FDSchool24^FS
^CF0,20
^FO210,100^FD1119 Pittwater Road,^FS
^FO210,125^FDCollaroy, Australia.^FS
^FO25,160^GB350,3,3^FS

^FX Second section with recipient address and permit information.
^CFA,25
^FO25,180^FD${item.Name} - ${item.Class}^FS
^CFA,20
`;
  Items.forEach((item, index) => {
    zplData += `^FO25,${(item[1] != null ? 230 : 225) + index * 25}^FD${
      item[0]
    }^FS
    ^FO340,${225 + index * 25}^FD${item[1] != null ? item[1] : ''}
    ^FS
    ^CFA,15
`;
  });

  zplData += `
^FO25,${235 + Items.length * 25}^GB350,3,3^FS

^FX Third section with bar code.
^BY3,2,100
^FO30,575^BC^FD${item.OrderID}^FS

^CFA,15
^FO10,725^FDNeed Help? Call us on 0272516939^FS

^XZ`;
  return zplData;
};

export const viewImp = (item, setSideImg) => {
  setSideImg('');

  setSideImg(
    'http://api.labelary.com/v1/printers/8dpmm/labels/2x4/0/' + getZpl(item)
  );
};

export const printImp = async item => {
  console.log('printing');
  const browserPrint = new ZebraBrowserPrintWrapper.default();
  const zpl = getZpl(item);

  const printerStatus = await browserPrint.checkPrinterStatus();
  console.log('printerStatus', printerStatus);

  if (printerStatus.isReadyToPrint) {
    browserPrint.print(zpl);
  } else {
    alert(printerStatus.errors);
  }
};
