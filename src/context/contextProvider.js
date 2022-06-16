import React, { createContext, useContext, useState } from 'react';

import { readExcelImp } from './bodyContext';
import { viewImp, printImp } from './sideContext';
import { getPrintersImp, setPrinterImp } from './printerContext';

const Context = createContext();
export const useContextProvider = () => useContext(Context);

function ContextProvider(props) {
  // body context
  const [tableHeader, setTableHeader] = useState([]);
  const [tableData, setTableData] = useState([]);

  const readExcel = file => {
    readExcelImp(file, setTableHeader, setTableData, view);
  };
  const view = data => {
    viewImp(data, setSideImg);
  };

  const print = data => {
    printImp(data);
  };

  // side context
  const [sideImg, setSideImg] = useState('');

  //printer context
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [printers, setPrinters] = useState([]);

  const getPrinters = () => {
    getPrintersImp(setPrinters, setSelectedPrinter);
  };
  const setPrinter = printer => {
    setPrinterImp(printer, setSelectedPrinter);
  };

  const values = {
    tableHeader,
    tableData,
    readExcel,
    view,
    sideImg,
    print,
    selectedPrinter,
    printers,
    getPrinters,
    setPrinter,
  };
  return <Context.Provider value={values}>{props.children}</Context.Provider>;
}

export default ContextProvider;
