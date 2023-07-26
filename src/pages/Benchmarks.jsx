// Test substitutions page 

import React from 'react';
import { useState, useEffect, useRef, useMemo } from 'react';
import Papa from 'papaparse';
import { Table, Select, Radio, Group } from '@mantine/core';
import { TableVirtuoso } from "react-virtuoso";
import { useLocation } from "react-router-dom";
import './css/Benchmarks.css';

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

function Benchmarks() {
    const location = useLocation();
    if(location.state === null){
        location.state = {"viewType":"full", "dataDomain":"dms-substitutions", "modelParadigm":"zeroshot", "sortKey":"Rank-ASC"};
    }

    const [tableData, setTableData] = useState([]);
    const [viewType, setViewType] = useState(location.state.viewType); // 'full' or 'aggregate'
    const [ modelParadigm, setModelParadigm ] = useState(location.state.modelParadigm); // 'zeroshot' or 'supervised'
    const [ dataDomain, setDataDomain ] = useState(location.state.dataDomain); // 'dms-substitutions', 'dms-indels', 'clinical-substitutions', 'clinical-indels'
    const [tableColumns, setTableColumns] = useState([]);
    const [sortKey, setSortKey] = useState(location.state.sortKey);
    const [searchQuery, setSearchQuery] = useState('');
    const virtuosoRef = useRef(null);

    function handleCsvData(data) {
        setTableData(data);
        setTableColumns(Object.keys(data[0]));
    }

    useEffect(() => {
        if(viewType === 'aggregate') {
          var filepath; 
          if(modelParadigm === 'zeroshot') {
            if(dataDomain === 'dms-substitutions') {
              filepath = "/data/aggregate_zeroshot_dms_subs_data.csv";
            }
            else if(dataDomain === 'dms-indels') {
              filepath = "/data/aggregate_zeroshot_dms_indels_data.csv";
            }
            else if(dataDomain === 'clinical-substitutions') {
              filepath = "/data/aggregate_zeroshot_clinical_subs_data_test.csv";
            }
            else if(dataDomain === 'clinical-indels') {
              filepath = "/data/aggregate_zeroshot_clinical_indels_data_test.csv";
            }
          }
          else if(modelParadigm === 'supervised') {
            if(dataDomain === 'dms-substitutions') {
              filepath = "/data/aggregate_supervised_dms_subs_data_test.csv";
            }
            else if(dataDomain === 'dms-indels') {
              filepath = "/data/aggregate_supervised_dms_indels_data_test.csv";
            }
            else if(dataDomain === 'clinical-substitutions') {
              filepath = "/data/aggregate_supervised_clinical_subs_data_test.csv";
            }
            else if(dataDomain === 'clinical-indels') {
              filepath = "/data/aggregate_supervised_clinical_indels_data_test.csv";
            }
          }
          Papa.parse(filepath, {
            download: true,
            header: true,
            complete: function(results) {
                handleCsvData(results.data);
                if (dataDomain === "dms-substitutions" || dataDomain === "clinical-substitutions"){
                  setTableColumns(AGGREGATE_COLUMNS);
                }
              }
          });
        } else if (viewType === "full") {
            var filepath; 
            if(modelParadigm === 'zeroshot') {
              if(dataDomain === 'dms-substitutions') {
                filepath = "/data/zeroshot_dms_subs_data.csv";
              }
              else if(dataDomain === 'dms-indels') {
                filepath = "/data/zeroshot_dms_indels_data.csv";
              }
              else if(dataDomain === 'clinical-substitutions') {
                filepath = "/data/zeroshot_clinical_subs_data_test.csv";
              }
              else if(dataDomain === 'clinical-indels') {
                filepath = "/data/zeroshot_clinical_indels_data_test.csv";
              }
            }
            else if(modelParadigm === 'supervised') {
              if(dataDomain === 'dms-substitutions') {
                filepath = "/data/supervised_dms_subs_data_test.csv";
              }
              else if(dataDomain === 'dms-indels') {
                filepath = "/data/supervised_dms_indels_data_test.csv";
              }
              else if(dataDomain === 'clinical-substitutions') {
                filepath = "/data/supervised_clinical_subs_data_test.csv";
              }
              else if(dataDomain === 'clinical-indels') {
                filepath = "/data/supervised_clinical_indels_data_test.csv";
              }
            }
            Papa.parse(filepath, {
                download: true,
                header: true,
                complete: function(results) {
                    handleCsvData(results.data);
                }
            });
        }
    },[viewType, modelParadigm, dataDomain])

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
          if(viewType === "aggregate") {
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
      if(viewType == 'full' || (dataDomain !== 'dms-substitutions' && dataDomain !== 'clinical-substitutions')) {
        return <tr style={{backgroundColor:BACKGROUND_COLOR}}>
          {tableColumns.map((column) => (
              <th className="th-header" onClick={() => setSortKey(computeNextSortKey(sortKey, column))} key={column}>{column}{renderSortIcon(column, sortKey)}</th>
          ))}
        </tr> 
      }
      else if(viewType == 'aggregate') {
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
      if(viewType === 'full') {
        setViewType('aggregate');
        setSortKey("DMS id-ASC");
        setSearchQuery('');
      }
      else if(viewType === 'aggregate') {
        setViewType('full');
        setSortKey("Rank-ASC");
        setSearchQuery('');
      }
    }    

    return (
        <div className="main-div">
        <h1 className="title">Benchmark Scores</h1>
        <div className="search-and-buttons">
          <div className="dropdowns">
            <Select style={{ float:"left", marginRight:"2vw"}} label="" placeholder="Mutation Type" onChange={setDataDomain} data={[{value:"dms-substitutions",label:"DMS Substitutions"},{value:"dms-indels",label: "DMS Indels"}, 
            {value:"clinical-substitutions","label":"Clinical Substitutions"},{value:"clinical-indels", label:"Clinical Indels"}]} value={dataDomain}></Select>
            <Select style={{ float:"right"}} label="" placeholder="Model Paradigm" onChange={setModelParadigm} data={[{value:"zeroshot", label:"Zero-Shot"},{value:"supervised", label:"Supervised"}]} value={modelParadigm}></Select>
          </div>
          <div className='viewtype-buttons'>
            <Radio.Group name="View Type" onChange={(event) => setViewType(event)}>
                <Group>
                  <Radio value="full" checked={viewType === "full"} label="DMS View"></Radio>
                  <Radio value="aggregate" checked={viewType === "aggregate"} label="Aggregate View"></Radio>
                </Group>
            </Radio.Group>
          </div>
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

export default Benchmarks;
