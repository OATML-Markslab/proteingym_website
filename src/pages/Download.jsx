// Page to download proteingym data (placeholder text for now)

import React from 'react';
import { Button } from '@mantine/core';
import './css/Download.css';
function Download() {
    return (
        <div className="download-div">
        <h1>Downloads</h1>
            <br/>
            <h3>DMS Assays</h3>
            <div className="data-download-button">
                <a><Button style={{width:"48%"}}>Substitutions</Button></a> <a><Button style={{width:"48%"}}>Indels</Button></a>
            </div>
            <br/>
            <h3>Clinical Variants</h3>
            <div className="data-download-button">
                <a><Button style={{width:"48%"}}>Substitutions</Button></a> <a><Button style={{width:"48%"}}>Indels</Button></a>
            </div>
            <br/>
            <h3>Reference Files</h3>
            <div className="data-download-button">
                <a><Button style={{width:"48%"}}>DMS Substitutions</Button></a> <a><Button style={{width:"48%"}}>DMS Indels</Button></a>
            </div>
            <div className="data-download-button">
                <a><Button style={{width:"48%"}}>Clinical Substitutions</Button></a> <a><Button style={{width:"48%"}}>Clinical Indels</Button></a>
            </div>
            <br/>
            <h3>Additional Links</h3>
            <div className="data-download-button">
                <a><Button style={{width:"48%"}}>Paper</Button></a> <a><Button style={{width:"48%"}}>Github Repository</Button></a>
            </div>
        </div>
    );
    }
    
export default Download;