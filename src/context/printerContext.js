const ZebraBrowserPrintWrapper = require('zebra-browser-print-wrapper');

export const getPrintersImp = (setPrinters, setSelectedPrinter) => {
  const browserPrint = new ZebraBrowserPrintWrapper.default();

  const printersPromise = browserPrint.getAvailablePrinters();

  console.log('printersPromise', printersPromise);

  printersPromise
    .then(printers => {
      console.log('printers', printers);
      if (printers.length > 0) {
        setPrinters(printers);
        browserPrint.setPrinter(printers[0]);
        setSelectedPrinter(printers[0].name);
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const setPrinterImp = (printer, setSelectedPrinter) => {
  console.log('setPrinterImp', printer);
  const browserPrint = new ZebraBrowserPrintWrapper.default();
  browserPrint.setPrinter(printer);
  setSelectedPrinter(printer.name);
};
