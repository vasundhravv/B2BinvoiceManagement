import React, { useState, useEffect } from "react";
import BodyHeader from "./bodyHeader";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  { field: "sl_no", headerName: "Sl No", width: 80 },
  { field: "business_code", headerName: "Business Code" },
  { field: "cust_number", headerName: "Customer Number" },
  { field: "clear_date", headerName: "Clear Date", width: 110 },
  { field: "buisness_year", headerName: "Business Year" },
  { field: "doc_id", headerName: "Document ID", width: 110 },
  { field: "posting_date", headerName: "Posting Date", width: 110 },
  {field: "document_create_date",headerName: "Document Create Date",width: 110,},
  { field: "due_in_date", headerName: "Due in Date", width: 110 },
  { field: "invoice_currency", headerName: "Invoice Currency" },
  { field: "document_type", headerName: "Document Type" },
  { field: "posting_id", headerName: "Posting ID", width: 70 },
  { field: "total_open_amount", headerName: "Total Open Amount" },
  {field: "baseline_create_date",headerName: "Baseline Create Date",width: 110,},
  {field: "cust_payment_terms",headerName: "Customer Payment Terms",width: 150,},
  { field: "invoice_id", headerName: "Invoice ID", width: 110 },
];

export const Body = (props) => {

  const [checkboxSelection, setCheckboxSelection] = useState(true);
  const [currentRow, setCurrentRow] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [tableData, setTableData] = useState([]);
  const [searched, setSearched] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [select, setSelection] = useState([]);
  const [adv_arr, setAdv_arr] = useState([]);

  const adv_Search = (advSearch_arr) => {
    console.log(advSearch_arr);

    if (advSearch_arr.length !== 0) {
      const filteredRows = tableData.filter((row) => {
        return (
          row.buisness_year
            .toLowerCase()
            .includes(advSearch_arr[3].toLowerCase()) &&
          row.cust_number
            .toString()
            .toLowerCase()
            .includes(advSearch_arr[2].toLowerCase()) &&
          row.invoice_id
            .toString()
            .toLowerCase()
            .includes(advSearch_arr[1].toLowerCase()) &&
          row.doc_id.toLowerCase().includes(advSearch_arr[0].toLowerCase())
        );
      });
      setFilteredData(filteredRows);
      setAdv_arr(advSearch_arr);
    } else {
      setFilteredData(tableData);
    }
  };

  const searchItems = (searchVal) => {
    setSearched(searchVal);
    if (searched !== "") {
      const filteredRows = tableData.filter((row) => {
        return (
          row.buisness_year.toLowerCase().includes(searched.toLowerCase()) ||
          row.cust_number
            .toString()
            .toLowerCase()
            .includes(searched.toLowerCase()) ||
          row.invoice_id
            .toString()
            .toLowerCase()
            .includes(searched.toLowerCase()) ||
          row.doc_id.toLowerCase().includes(searched.toLowerCase())
        );
      });
      setFilteredData(filteredRows);
    } else {
      setFilteredData(tableData);
    }
  };

  const handleRowSelection = (e) => {
    setSelection(e);
    if (e.length > 0) setCurrentRow(true);
    else setCurrentRow(false);
    console.log(select);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8612/zcheck/FetchServlet")
      .then((res) => {
        setTableData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div style={{ backgroundColor: "#344c5d" }}>
      <BodyHeader
        currentRow={currentRow}
        searchItems={searchItems}
        select={select}
        adv_Search={adv_Search}
      />

      <div style={{ height: 320, width: "100%" }}>
        {searched.length > 1 || adv_arr.length > 1 ? (
          <DataGrid
            getRowId={(r) => r.sl_no}
            sx={{
              ".MuiDataGrid-columnSeparator": {
                display: "none",
              },
              ".MuiDataGrid-row:nth-child(even)": {
                backgroundColor: "#2d4250",
              },
              ".MuiTablePagination-root, .MuiSvgIcon-root": {
                color: "white",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                overflow: "visible",
                lineHeight: "1.5rem",
                whiteSpace: "normal",
              },
              border: "none",
              color: "white",
              boxShadow: 5,
            }}
            rows={filteredData}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[4, 10, 20]}
            checkboxSelection={checkboxSelection}
            onSelectionModelChange={handleRowSelection}
            selectionModel={select}
            disableSelectionOnClick={true}
          />
        ) : (
          <DataGrid
            getRowId={(r) => r.sl_no}
            sx={{
              ".MuiDataGrid-columnSeparator": {
                display: "none",
              },
              ".MuiDataGrid-row:nth-child(even)": {
                backgroundColor: "#2d4250",
              },
              ".MuiTablePagination-root, .MuiSvgIcon-root": {
                color: "white",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                overflow: "visible",
                lineHeight: "1.5rem",
                whiteSpace: "normal",
              },
              border: "none",
              color: "white",
              boxShadow: 4,
            }}
            rows={tableData}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20,50,100,150,200]}
            checkboxSelection={checkboxSelection}
            onSelectionModelChange={handleRowSelection}
            selectionModel={select}
            disableColumnFilter={true}
          />
        )}
      </div>
    </div>
  );
};
