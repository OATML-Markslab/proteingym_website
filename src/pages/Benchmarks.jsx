// Test substitutions page 

import React from 'react';
import { useState, useEffect, useRef, useMemo } from 'react';
import Papa from 'papaparse';
import { Table, Select, Radio, Group } from '@mantine/core';
import { TableVirtuoso } from "react-virtuoso";
import { useLocation } from "react-router-dom";
import parse from 'html-react-parser';
import './css/Benchmarks.css';

const BACKGROUND_COLOR = "#ffffff";

// A hack because of weird ordering thing with javascript integer keys 
const cleanColumns = {"DMS_id":"DMS ID", "Site_Independent":"Site Independent","DeepSequence_single":"DeepSequence (single)","DeepSequence_ensemble":"DeepSequence (ensemble)",
"EVE_single":"EVE (single)","EVE_ensemble":"EVE (ensemble)",
"Unirep_evotune":"Unirep (evotuned)","MSA_Transformer_single":"MSA Transformer (single)","MSA_Transformer_ensemble":"MSA Transformer (ensemble)",
"ESM1v_single":"ESM1v (single)","ESM1v_ensemble":"ESM1v (ensemble)","ESM2_8M":"ESM2 (8M)", "ESM2_35M":"ESM2 (35M)","ESM2_150M":"ESM2 (150M)",
"ESM2_650M":"ESM2 (650M)","ESM2_3B":"ESM2 (3B)","ESM2_15B":"ESM2 (15B)",
"RITA_s":"RITA Small", "RITA_m":"RITA Medium", "RITA_l":"RITA Large", "RITA_xl":"RITA XLarge","Progen2_small":"Progen2 Small","Progen2_medium":"Progen2 Medium",
"Progen2_large":"Progen2 Large","Progen2_base":"Progen2 Base","Progen2_xlarge":"Progen2 XLarge","Tranception_S_no_retrieval":"Tranception Small (no retrieval)",
"Tranception_M_no_retrieval":"Tranception Medium (no retrieval)","Tranception_L_no_retrieval":"Tranception Large (no retrieval)","Tranception_S":"Tranception Small",
"Tranception_M":"Tranception Medium", "Tranception_L":"Tranception Large","TranceptEVE_S":"TranceptEVE Small","TranceptEVE_M":"TranceptEVE Medium","TranceptEVE_L":"TranceptEVE Large",
"CARP_38M":"CARP (38M)", "CARP_600K": "CARP (600K)", "CARP_640M":"CARP (640M)","CARP_76M":"CARP (76M)","MIFST":"MIF-ST","RITA_ensemble":"RITA (ensemble)",
"Progen2_ensemble":"Progen2 (ensemble)","number_mutants":"Number of Mutants","UniProt_ID":"UniProt ID","Neff_L_category":"Neff/L Category","Model_rank":"Rank",
"Model_name":"Model name","Low_MSA_depth":"Low depth","Medium_MSA_depth":"Medium depth","High_MSA_depth":"High depth","Model details":"Description",
"Function_Activity":"Activity","Function_Binding":"Binding","Function_Expression":"Expression","Function_OrganismalFitness":"Organismal Fitness",
"Function_Stability":"Stability","Taxa_Human":"Human","Taxa_Other_Eukaryote":"Other Eukaryote","Taxa_Prokaryote":"Prokaryote","Taxa_Virus":"Virus"}
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

let fixAggregateViewColumns = (object,metric) => {
  return Object.keys(object).map((key) => {
    let newKey; 
    if(key == `Average_${metric}`){
      newKey = `Avg. ${metric}`
    }
    else if(key == `Bootstrap_standard_error_${metric}`){
      newKey = `Std. Error of Diff. to Best Score*`
    }
    else if(key.startsWith("Depth_")){
      newKey = key.replace("Depth_","")
    }
    else if(key == `UniProt_level_Average_${metric}`){
      newKey = `UniProt Level Average ${metric}`
    }
    else {
      newKey = cleanColumns[key] || key;
    }
    return { [newKey] : object[key] };
  }).reduce((a,b) => Object.assign({},a,b));
}

let fixDMSViewColumns = (object) => { 
  return Object.keys(object).map((key) => {
  const newKey = cleanColumns[key] || key;
  return { [newKey] : object[key] };
}).reduce((a,b) => Object.assign({},a,b));};

function Benchmarks() {
    const location = useLocation();
    if(location.state === null){
        location.state = {"viewType":"full", "dataDomain":"DMS_substitutions", "modelParadigm":"zeroshot", "sortKey":"Rank-ASC", "currStatistic":"Spearman"};
    }
    const [tableData, setTableData] = useState([]);
    const [viewType, setViewType] = useState(location.state.viewType); // 'full' or 'aggregate'
    const [modelParadigm, setModelParadigm ] = useState(location.state.modelParadigm); // 'zeroshot' or 'supervised'
    const [dataDomain, setDataDomain ] = useState(location.state.dataDomain); //
    const [tableColumns, setTableColumns] = useState([]);
    const [sortKey, setSortKey] = useState(location.state.sortKey);
    const [currStatistic, setCurrStatistic] = useState(location.state.currStatistic);
    const [searchQuery, setSearchQuery] = useState('');
    const virtuosoRef = useRef(null);
    const AGGREGATE_SUPERHEADERS = [{"key":`${currStatistic} by Function`,"colspan":5}, {"key":`${currStatistic} by MSA Depth`, "colspan":3},{"key":`${currStatistic} by Taxon`,"colspan":4},
      {"key":`${currStatistic} by Mutation Depth`,"colspan":5},{"key":"Model Details", "colspan":2}]
    const AGGREGATE_COLUMNS = `Rank,Model name,Model type,Avg. ${currStatistic},Std. Error of Diff. to Best Score*,Activity,Binding,Expression,Organismal Fitness,Stability,Low depth,Medium depth,High depth,Human,Other Eukaryote,Prokaryote,Virus,1,2,3,4,5+,Description,References`.split(",");
    function handleCsvData(data) {
      if ((dataDomain === "DMS_substitutions" || dataDomain === "clinical_substitutions") && (viewType === "aggregate")){
        data = data.map((row) => {return fixAggregateViewColumns(row,currStatistic)});
        setTableData(data);
        setTableColumns(AGGREGATE_COLUMNS);
        return;
      }
      // Indels summary case 
      else if(viewType == "aggregate"){
        data = data.map((row) => {return fixAggregateViewColumns(row,currStatistic)});
        setTableData(data);
        setTableColumns(Object.keys(data[0]));
      }
      else{
        data = data.map((row) => {return fixDMSViewColumns(row)});
        setTableData(data);
        setTableColumns(Object.keys(data[0]));
      }
    }

    useEffect(() => {
        if(viewType === 'aggregate') {
          var filepath; 
          filepath = `/data/${currStatistic}/aggregate_${modelParadigm}_${dataDomain}_data.csv`;
          Papa.parse(filepath, {
            download: true,
            header: true,
            complete: function(results) {
                handleCsvData(results.data);
              }
          });
        } else if (viewType === "full") {
            var filepath; 
            filepath = `/data/${currStatistic}/${modelParadigm}_${dataDomain}_data.csv`;
            Papa.parse(filepath, {
                download: true,
                header: true,
                complete: function(results) {
                    handleCsvData(results.data);
                }
            });
        }
    },[viewType, modelParadigm, dataDomain, currStatistic])

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
      if(viewType == 'full') {
        return <tr style={{backgroundColor:BACKGROUND_COLOR}}>
          {tableColumns.map((column) => (
              <th className={(column === 'DMS ID') ? 'th-fixed-header' : 'default-header'} onClick={() => setSortKey(computeNextSortKey(sortKey, column))} key={column}>{column}{renderSortIcon(column, sortKey)}</th>
          ))}
        </tr> 
      }
      else if(viewType === 'aggregate' && (dataDomain === 'DMS_substitutions' || dataDomain === 'clinical_substitutions')) {
       return <>
                <tr style={{backgroundColor:BACKGROUND_COLOR}}>
                  {tableColumns.map((column, index) => {
                    if(index < 5){
                      if(column === "Model name"){
                        return <th className="th-fixed-header" onClick={() => setSortKey(computeNextSortKey(sortKey, column))} rowSpan={2} key={column}>{column}{renderSortIcon(column, sortKey)}</th>
                      }
                      else{
                        return <th className="th-header" onClick={() => setSortKey(computeNextSortKey(sortKey, column))} rowSpan={2} key={column}>{column}{renderSortIcon(column, sortKey)}</th>
                      }
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
      else if(viewType === 'aggregate'){
        return <tr style={{backgroundColor:BACKGROUND_COLOR}}>
          {tableColumns.map((column) => (
              <th className={(column === 'Model name') ? 'th-fixed-header' : 'default-header'} onClick={() => setSortKey(computeNextSortKey(sortKey, column))} key={column}>{column}{renderSortIcon(column, sortKey)}</th>
          ))}
        </tr> 
      }
    }
    // Since we only provide AUC for clinical variants, this sets the statistic to AUC if clinical datasets are selected
    function setDataDomainWithStatistic(value){
      if (value === "clinical_substitutions" || value === "clinical_indels"){
        setCurrStatistic("AUC");
      }
      else{
        setCurrStatistic("Spearman");
      }
      setDataDomain(value);
    }
    
    function getChecked(value){
      return value === viewType;
    }

    return (
        <div className="main-div">
        <h1 className="title">Benchmark Scores</h1>
        <div className="search-and-buttons">
          <div className="dropdowns">
            <Select style={{ float:"left", marginRight:"2vw"}} label="" placeholder="Mutation Type" onChange={setDataDomainWithStatistic} data={[{value:"DMS_substitutions",label:"DMS Substitutions"},{value:"DMS_indels",label: "DMS Indels"}, 
            {value:"clinical_substitutions","label":"Clinical Substitutions"},{value:"clinical_indels", label:"Clinical Indels"}]} value={dataDomain}></Select>
            <Select style={{ float:"right", marginRight:"2vw"}} label="" placeholder="Model Paradigm" onChange={setModelParadigm} data={[{value:"zero_shot", label:"Zero-Shot"},{value:"supervised", label:"Supervised"}]} value={modelParadigm}></Select>
            <Select style={{float:"right"}} label="" placeholder="Metric" onChange={setCurrStatistic} data={(dataDomain == "clinical_substitutions" || dataDomain == "clinical_indels") ? [{value:"AUC","label":"AUC"}] : [{value:"Spearman", label:"Spearman"},{value:"AUC", label:"AUC"},{value:"NDCG",label:"NDCG"},{value:"MCC",label:"MCC"}]} value={currStatistic}></Select>
          </div>
          {viewType && <div className='viewtype-buttons'>
            <Radio.Group name="View Type" onChange={(event) => setViewType(event)}>
                <Group>
                  <Radio value="full" checked={getChecked("full")} label="DMS View"></Radio>
                  <Radio value="aggregate" checked={getChecked("aggregate")} label="Aggregate View"></Radio>
                </Group>
            </Radio.Group>
          </div>}
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
                    <td className={(column === 'Description' || column === "References") ? 'truncate-cell' : (column === "DMS ID" || column === "Model name") ? "sticky-column" : 'default-row'} key={column}>
                        {(column !== "References") ? item[column]: parse(item[column])}
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
