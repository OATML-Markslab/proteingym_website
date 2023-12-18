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

const cleanNames = {"zero_shot":"Zero Shot", "clinical_substitutions":"Clinical Substitutions","DMS_substitutions":"DMS Substitutions","DMS_indels":"DMS Indels","clinical_indels":"Clinical Indels","supervised":"Supervised"}
const viewTypeMessages = {"full":"Individual View","aggregate":"Aggregate View"}
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
    if(key === `Average_${metric}`){
      newKey = `Avg. ${metric}`;
    }
    else if(key === `Bootstrap_standard_error_${metric}`){
      newKey = `Std. Error of Diff. to Best Score*`;
    }
    else if(key.startsWith("Depth_")){
      newKey = key.replace("Depth_","");
    }
    else if(key === `UniProt_level_Average_${metric}`){
      newKey = `UniProt Level Average ${metric}`;
    }
    else if(key === `Average_${metric}_fold_random_5`){
      newKey = `Random`;
    }
    else if(key === `Average_${metric}_fold_contiguous_5`){
      newKey = `Contiguous`;
    }
    else if(key === `Average_${metric}_fold_modulo_5`){
      newKey = `Modulo`;
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

// Take in a list of objects, and add "NA" to any missing keys based on the passed in columns
let addMissingKeys = (listOfObjects,columns) => {
  // remove objects of length 1 (parsing error I think)
  listOfObjects = listOfObjects.filter((object) => Object.keys(object).length > 1);
  const keys = columns || Object.keys(listOfObjects[0]);
  return listOfObjects.map((object) => {
    return keys.map((key) => {
      return { [key] : object[key] || "N/A" };
    }).reduce((a,b) => Object.assign({},a,b));
  });

}

function Benchmarks() {
    const location = useLocation();
    if(location.state === null){
        location.state = {"viewType":"aggregate", "dataDomain":"DMS_substitutions", "modelParadigm":"zero_shot", "sortKey":"Rank-ASC", "currStatistic":"Spearman"};
    }
    const [tableData, setTableData] = useState([]);
    const [viewType, setViewType] = useState(location.state.viewType); // 'full' or 'aggregate'
    const [modelParadigm, setModelParadigm ] = useState(location.state.modelParadigm); // 'zeroshot' or 'supervised'
    const [dataDomain, setDataDomain ] = useState(location.state.dataDomain); //
    const [tableColumns, setTableColumns] = useState([]);
    const [sortKey, setSortKey] = useState(location.state.sortKey);
    const [currStatistic, setCurrStatistic] = useState(location.state.currStatistic);
    const [searchQuery, setSearchQuery] = useState('');
    const [availableMetrics, setAvailableMetrics] = useState([{value:"Spearman", label:"Spearman"},{value:"AUC", label:"AUC"},{value:"NDCG",label:"NDCG"},{value:"MCC",label:"MCC"}]);
    const [availableParadigms, setAvailableParadigms] = useState([{value:"zero_shot", label:"Zero-Shot"},{value:"supervised", label:"Supervised"}]);
    const [aggregateSuperheaders, setAggregateSuperheaders] = useState([{"key":`${currStatistic} by Function`,"colspan":5}, {"key":`${currStatistic} by MSA Depth`, "colspan":3},{"key":`${currStatistic} by Taxon`,"colspan":4},{"key":`${currStatistic} by Mutation Depth`,"colspan":5},{"key":"Model Details", "colspan":2}]);
    // const [aggregateColumns, setAggregateColumns] = useState(`Rank,Model name,Model type,Avg. ${currStatistic},Std. Error of Diff. to Best Score*,Activity,Binding,Expression,Organismal Fitness,Stability,Low depth,Medium depth,High depth,Human,Other Eukaryote,Prokaryote,Virus,Description,References`.split(","));
    const virtuosoRef = useRef(null);
    
    function handleCsvData(data, statistic) {
      var superheaders = [];
      var columns = [];
      if(modelParadigm === "zero_shot"){
        if(dataDomain === "DMS_substitutions"){
          superheaders = [{"key":`${statistic} by Function`,"colspan":5}, {"key":`${statistic} by MSA Depth`, "colspan":3},{"key":`${statistic} by Taxon`,"colspan":4},{"key":`${statistic} by Mutation Depth`,"colspan":5},{"key":"Model Details", "colspan":2}];
          columns = `Rank,Model name,Model type,Avg. ${statistic},Std. Error of Diff. to Best Score*,Activity,Binding,Expression,Organismal Fitness,Stability,Low depth,Medium depth,High depth,Human,Other Eukaryote,Prokaryote,Virus,1,2,3,4,5+,Description,References`.split(",");
        }
        else if(dataDomain === "DMS_indels"){
          superheaders = [{"key":`${statistic} by Function`,"colspan":5}, {"key":`${statistic} by MSA Depth`, "colspan":3},{"key":`${statistic} by Taxon`,"colspan":4},{"key":"Model Details", "colspan":2}];
          columns = `Rank,Model name,Model type,Avg. ${statistic},Std. Error of Diff. to Best Score*,Activity,Binding,Expression,Organismal Fitness,Stability,Low depth,Medium depth,High depth,Human,Other Eukaryote,Prokaryote,Virus,Description,References`.split(",");
        }
        else if(dataDomain === "clinical_substitutions"){
          superheaders = [];
          columns = `Rank,Model name,Model type,Avg. ${statistic},Std. Error of Diff. to Best Score*`.split(",");
        }
        else if(dataDomain === "clinical_indels"){
          superheaders = [];
          columns = `Rank,Model name,Model type,Avg. ${statistic}`.split(",");
        }
      }
      else {
        if(dataDomain === "DMS_substitutions" || dataDomain === "DMS_indels"){
          superheaders = [{"key":`${statistic} by Cross-Validation Scheme`,"colspan":3},{"key":`${statistic} by Function`,"colspan":5}, {"key":`${statistic} by MSA Depth`, "colspan":3},{"key":`${statistic} by Taxon`,"colspan":4},{"key":"Model Details", "colspan":2}];
          columns = `Rank,Model name,Model type,Avg. ${statistic},Std. Error of Diff. to Best Score*,Random,Modulo,Contiguous,Activity,Binding,Expression,Organismal Fitness,Stability,Low depth,Medium depth,High depth,Human,Other Eukaryote,Prokaryote,Virus,Description,References`.split(",");
        }
        else if(dataDomain === "clinical_substitutions" || dataDomain === "clinical_indels"){
          superheaders = [];
          columns = `Rank,Model name,Model type,Avg. ${statistic},Std. Error of Diff. to Best Score*`.split(",");
        }
      }
      setAggregateSuperheaders(superheaders);
      // setAggregateColumns(columns);
      if (viewType === "aggregate"){
        data = data.map((row) => {return fixAggregateViewColumns(row,statistic)});
        if(data.length > 0){
          data = addMissingKeys(data,columns);
        }
        setTableData(data);
        if(data.length > 0){
          setTableColumns(columns);
        }
        else{
          setTableColumns([]);
        }
      }
      else{
        data = data.map((row) => {return fixDMSViewColumns(row)});
        if(data.length > 0){
          data = addMissingKeys(data,Object.keys(data[0]));
        }
        setTableData(data);
        if (data.length > 0){
          setTableColumns(Object.keys(data[0]));
        }
        else{
          setTableColumns([]);
        }
      }
    }

    function handleCsvError(error, file){
      console.log(error);
      console.log(file);
      setTableData([]);
      // setAggregateColumns([]);
      setAggregateSuperheaders([]);
      setTableColumns([]);
    }

    // useEffect(() => {
    //   if(dataDomain === "clinical_substitutions" || dataDomain === "clinical_indels"){
    //     setAvailableParadigms([{value:"zero_shot", label:"Zero-Shot"}]);
    //   }
    //   else if(dataDomain === "DMS_substitutions" || dataDomain === "DMS_indels"){
    //     setAvailableParadigms([{value:"zero_shot", label:"Zero-Shot"},{value:"supervised", label:"Supervised"}]);
    //   }
    // },[dataDomain])

    useEffect(() => {
        // Setting available metrics depending on data subset and model paradigm
        var metrics = [];
        if(dataDomain === "clinical_substitutions" || dataDomain === "clinical_indels"){
          metrics = [{value:"AUC",label:"AUC"}]
          setAvailableMetrics(metrics);
        }
        else if(dataDomain === "DMS_substitutions" || dataDomain === "DMS_indels"){
          // ideally we add in AUC, NDCG and MCC later here 
        if(modelParadigm === "supervised"){
            metrics = [{value:"Spearman", label:"Spearman"},{value:"MSE", label:"MSE"}]
            setAvailableMetrics(metrics);
        }
        else{
            metrics = [{value:"Spearman", label:"Spearman"},{value:"AUC", label:"AUC"},{value:"NDCG",label:"NDCG"},{value:"MCC",label:"MCC"}]
            setAvailableMetrics(metrics)
        }
        } 
        var statistic = currStatistic;
        if(!(metrics.map((metric) => metric.value).includes(currStatistic))){
          setCurrStatistic(metrics[0].value);
          statistic = metrics[0].value;
        }
        
        // getting new data for changed state
        if(viewType === 'aggregate') {
          var filepath; 
          filepath = `/data/${statistic}/aggregate_${modelParadigm}_${dataDomain}_data.csv`;
          Papa.parse(filepath, {
            download: true,
            header: true,
            complete: function(results) {
                handleCsvData(results.data, statistic);
              },
              error: handleCsvError
          });
        } else if (viewType === "full") {
            var filepath; 
            filepath = `/data/${statistic}/${modelParadigm}_${dataDomain}_data.csv`;
            Papa.parse(filepath, {
                download: true,
                header: true,
                complete: function(results) {
                    handleCsvData(results.data, statistic);
                },
                error: handleCsvError
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
              <th className={(column === 'DMS ID' || column == "RefSeq ID") ? 'th-fixed-header' : 'default-header'} onClick={() => setSortKey(computeNextSortKey(sortKey, column))} key={column}>{column}{renderSortIcon(column, sortKey)}</th>
          ))}
        </tr> 
      }
      else if(viewType === 'aggregate' && (dataDomain === 'DMS_substitutions' || dataDomain === "DMS_indels")) {
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
                  {aggregateSuperheaders.map((column) => (
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

    function getChecked(value){
      return value === viewType;
    }
    return (
        <div className="main-div">
        <h1 className="title">Benchmark Scores</h1>
        <div className="search-and-buttons">
          <div className="dropdowns">
            <Select style={{ float:"left", marginRight:"2vw"}} label="" placeholder="Mutation Type" onChange={setDataDomain} data={[{value:"DMS_substitutions",label:"DMS Substitutions"},{value:"DMS_indels",label: "DMS Indels"}, 
            {value:"clinical_substitutions","label":"Clinical Substitutions"},{value:"clinical_indels", label:"Clinical Indels"}]} value={dataDomain}></Select>
            <Select style={{ float:"right", marginRight:"2vw"}} label="" placeholder="Model Paradigm" onChange={setModelParadigm} data={availableParadigms} value={modelParadigm}></Select>
            <Select style={{float:"right"}} label="" placeholder="Metric" onChange={setCurrStatistic} data={availableMetrics} value={currStatistic}></Select>
          </div>
          {viewType && <div className='viewtype-buttons'>
            <Radio.Group name="View Type" onChange={(event) => setViewType(event)}>
                <Group>
                  <Radio value="full" checked={getChecked("full")} label="Individual View"></Radio>
                  <Radio value="aggregate" checked={getChecked("aggregate")} label="Aggregate View"></Radio>
                </Group>
            </Radio.Group>
          </div>}
        </div>
        <br/>
        {filteredSortedTableData.length > 0 ? <TableVirtuoso
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
                    <td className={(column === 'Description' || column === "References") ? 'truncate-cell' : (column === "DMS ID" || column === "RefSeq ID" || column === "Model name") ? "sticky-column" : 'default-row'} key={column}>
                        {(column !== "References") ? item[column]: parse(item[column])}
                    </td>
                ))}
                </>
                );
              }}
        />: <h2 style={{paddingTop:"6vh"}}>{currStatistic} {viewTypeMessages[viewType]} for {cleanNames[modelParadigm]} {cleanNames[dataDomain]} not available</h2>}
        {filteredSortedTableData.length > 0 ? <p fontSize="small" style={{width:"80%"}}>* Non-parametric bootstrap standard error of the difference between the Spearman performance of a given model and that of the best overall model (ie., TranceptEVE), computed over 10k bootstrap samples from the set of proteins in the ProteinGym substitution benchmark.</p> : <p></p>}
        </div>
    );
    }

export default Benchmarks;
