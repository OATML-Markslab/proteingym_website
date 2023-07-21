// Test substitutions page 

import React from 'react';
import { useState, useEffect, useRef, useMemo } from 'react';
import Papa from 'papaparse';
import { Table } from '@mantine/core';
import { TableVirtuoso } from "react-virtuoso";
import './css/Substitutions.css';

const BACKGROUND_COLOR = "#ffffff";
const AGGREGATE_SUPERHEADERS = [{"key":"Spearman by MSA Depth", "colspan":3},{"key":"Spearman by Taxon","colspan":4},
{"key":"Spearman by Mutation Depth","colspan":5},{"key":"Model Details", "colspan":2}]

// A hack because of weird ordering thing with javascript integer keys 
const AGGREGATE_COLUMNS = "Rank,Model name,Model type,Avg. Spearman,Std. Error of Diff. to Best Score*,Low depth,Medium depth,High depth,Human,Other Eukaryote,Prokaryote,Virus,1,2,3,4,5+,Description,References".split(",");

const encodeSortKey = (sortKey, direction) => {
  return sortKey + "-" + direction;
};

function getSortFunc(tableData, sortKey){
    // split sortKey on - to get column and direction 
    const [column, direction] = sortKey.split("-");
    // if the column's first value is a number, sort numerically, else sort alphabetically
    if(isNaN(tableData[0][column])){
        return (a, b, sign) => {
            return sign * a[column].localeCompare(b[column]);
        }
    }
    else{
        return (a, b, sign) => {
            return sign * (a[column] - b[column]);
        }
    }
}

const decodeSortKey = (sortKeyDirection) => {
  const [key, direction] = sortKeyDirection.split("-");
  return { sortKey: key, direction: direction };
};

const computeNextSortKey = (currentKeyDirection, clickedKey) => {
  const decoded = decodeSortKey(currentKeyDirection);
  let newKey;
  if (clickedKey !== decoded.sortKey) {
    // new key, always start ascending
    newKey = encodeSortKey(clickedKey, "ASC");
  } else {
    // if currently at ascending position, switch to descending
    if (decoded.direction === "ASC") {
      newKey = encodeSortKey(clickedKey, "DESC");
    } else {
      // if at descending position, switch to default key
      newKey = encodeSortKey(clickedKey, "ASC");
    }
  }
  return newKey
}

const renderSortIcon = (targetKey, sortKey) => {
  const decoded = decodeSortKey(sortKey);
  if (decoded.sortKey === targetKey) {
    if (decoded.direction === "ASC") {
      return <span>▲</span>; //▲ ▴
    } else {
      return <span>▼</span>; // ▼▾
    }
  } else {
    // enforce same spacing using invisible character
    return <span style={{ color: BACKGROUND_COLOR}}>▲</span>;
  }
};

function Substitutions() {
    const [tableData, setTableData] = useState([]);
    const [viewType, setViewType] = useState('model');
    const [tableColumns, setTableColumns] = useState([]);
    const [sortKey, setSortKey] = useState("Rank-ASC");
    const [searchQuery, setSearchQuery] = useState('');
    const virtuosoRef = useRef(null);
    function handleCsvData(data) {
        setTableData(data);
        setTableColumns(Object.keys(data[0]));
    }

    useEffect(() => {
        if(viewType === 'model') {
            Papa.parse("/data/aggregatetabledata.csv", {
                download: true,
                header: true,
                complete: function(results) {
                    handleCsvData(results.data);
                    setTableColumns(AGGREGATE_COLUMNS);
                }
            });
        } else {
            Papa.parse("/data/dmstabledata.csv", {
                download: true,
                header: true,
                complete: function(results) {
                    handleCsvData(results.data);
                }
            });
        }
    },[viewType])

    const sortedTableData = useMemo(() => {
        if (tableData.length === 0) {
            return [];
        }
        else{ 
            const decodedKey = decodeSortKey(sortKey);
            const sortingFunc = getSortFunc(tableData, sortKey);
            const sign = decodedKey.direction === "ASC" ? 1 : -1;
            // Case where the columns have changed before data is updated, so we skip sorting (this shouldn't ever render, just to avoid a race condition crash)
            if(!(tableData[0].hasOwnProperty(decodedKey.sortKey))){
              return tableData;
            }
            else{
              return tableData.filter(item => !(item["Rank"] === "" || item["DMS id"] === "")).slice().sort((a, b) => sortingFunc(a, b, sign));
            }
        }
        }, [tableData, sortKey]);
      
    // Filter the table data based on the search query
    const filteredSortedTableData = useMemo(() => {
          var searchField = "DMS id";
          if(viewType === "model") {
              searchField = "Model name";
          }
          if (searchQuery === '') {
              return sortedTableData;
          } else {
              return sortedTableData.filter(item => {
                  return item[searchField].toLowerCase().includes(searchQuery.toLowerCase());
              });
          }
        }, [searchQuery, sortedTableData]);

    function customHeader(){
      if(viewType == 'DMS') {
        return <tr style={{backgroundColor:BACKGROUND_COLOR}}>
          {tableColumns.map((column) => (
              <th className="th-header" onClick={() => setSortKey(computeNextSortKey(sortKey, column))} key={column}>{column}{renderSortIcon(column, sortKey)}</th>
          ))}
        </tr> 
      }
      else {
       return <>
                <tr style={{backgroundColor:BACKGROUND_COLOR}}>
                  {tableColumns.map((column, index) => {
                    if(index < 5){
                      return <th className="th-header" onClick={() => setSortKey(computeNextSortKey(sortKey, column))} rowSpan={2} key={column}>{column}{renderSortIcon(column, sortKey)}</th>
                    }
                  })}
                  {/* create dummy spaces to place superheaders in right position */}
                  {AGGREGATE_SUPERHEADERS.map((column) => (
                      <th className="th-header" key={column.key} colSpan={column.colspan}>{column.key}</th>
                  ))}
                  </tr>
                  <tr style={{backgroundColor:BACKGROUND_COLOR}}>
                  {tableColumns.map((column, index) => {
                      if(index >= 5){
                        return <th className="th-header" onClick={() => setSortKey(computeNextSortKey(sortKey, column))} key={column}>{column}{renderSortIcon(column, sortKey)}</th>
                      }})}
                </tr> 
              </>
      }
    }

    function changeTable(){
      if(viewType === 'model') {
        setViewType('DMS');
        setSortKey("DMS id-ASC");
        setSearchQuery('');
      }
      else {
        setViewType('model');
        setSortKey("Rank-ASC");
        setSearchQuery('');
      }
    }    

    return (
        <div className="main-div">
        <h1 className="title">Substitution Benchmark</h1>
        <div className="search-and-button">
          <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={viewType === "model" ? "Search by model name" : "Search by DMS id"}
              />
          <button className="button" onClick={changeTable}>{viewType === "model" ? "Show DMS View" : "Show Model View"}</button>
        </div>
        <br/>
        <TableVirtuoso
            ref={virtuosoRef}
            style={{height:"70%", width:"80%"}}
            data={filteredSortedTableData}
            components={{
                Table: (props) => (
                    <Table
                      {...{
                        ...props,
                        // striped: true, // doesn't play well with virtuoso - CSS is jumpy because even/odd changes during scrolling
                        highlightOnHover: true,
                        // fontSize: "xs", // default corresponds to small
                        verticalSpacing: 3, // defaults corresponds to 7
                        withBorder:true,
                        withColumnBorders:true,
                        style: { ...props.style, borderCollapse: "separate" },
                      }}
                    />
                  ),
                  TableRow: (props) => {
                    return <tr {...props} />
                  }
                }}
            fixedHeaderContent={customHeader}
            increaseViewportBy={20}
            itemContent={(index, item) => {
              return (
                <>
                {tableColumns.map((column) => (
                    <td className={(column === 'Description' || column === "References") ? 'truncate-cell' : ''} key={column}>
                        {item[column]}
                    </td>
                ))}
                </>
                );
              }}
        />
        <p fontSize="small" style={{width:"80%"}}>* Non-parametric bootstrap standard error of the difference between the Spearman performance of a given model and that of the best overall model (ie., TranceptEVE), computed over 10k bootstrap samples from the set of proteins in the ProteinGym substitution benchmark.</p>
        </div>
    );
    }

export default Substitutions;
