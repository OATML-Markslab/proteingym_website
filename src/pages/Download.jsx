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
                <a href="https://marks.hms.harvard.edu/proteingym/ProteinGym_Dec_2023/DMS_ProteinGym_substitutions.zip"><Button style={{width:"48%"}}>Substitutions</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/ProteinGym_Dec_2023/DMS_ProteinGym_indels.zip"><Button style={{width:"48%"}}>Indels</Button></a>
            </div>
            <br/>
            <div className="data-download-button">
                <a href="https://marks.hms.harvard.edu/proteingym/ProteinGym_Dec_2023/substitutions_raw_DMS.zip"><Button style={{width:"48%"}}>Raw Substitutions</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/ProteinGym_Dec_2023/indels_raw_DMS.zip"><Button style={{width:"48%"}}>Raw Indels</Button></a>
            </div>
            <br/>
            <h3>Clinical Variants</h3>
            <div className="data-download-button">
                <a href="https://marks.hms.harvard.edu/proteingym/ProteinGym_Dec_2023/clinical_ProteinGym_substitutions.zip"><Button style={{width:"48%"}}>Substitutions</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/ProteinGym_Dec_2023/clinical_ProteinGym_indels.zip"><Button style={{width:"48%"}}>Indels</Button></a>
            </div>
            <br/>
            <div className="data-download-button">
                <a href="https://marks.hms.harvard.edu/proteingym/ProteinGym_Dec_2023/substitutions_raw_clinical.zip"><Button style={{width:"48%"}}>Raw Substitutions</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/ProteinGym_Dec_2023/indels_raw_clinical.zip"><Button style={{width:"48%"}}>Raw Indels</Button></a>
            </div>
            <br/>
            <h3>Multiple Sequence Alignments</h3>
            <div className="data-download-button">
                <a href="https://marks.hms.harvard.edu/proteingym/ProteinGym_Dec_2023/DMS_msa_files.zip"><Button style={{width:"48%"}}>DMS Assays</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/ProteinGym_Dec_2023/clinical_msa_files.zip"><Button style={{width:"48%"}}>Clinical Variants</Button></a>
            </div>
            <br/>
            <h3>Multiple Sequence Alignment Weights</h3>
            <div className="data-download-button">
                <a href="https://marks.hms.harvard.edu/proteingym/ProteinGym_Dec_2023/DMS_msa_weights.zip"><Button style={{width:"48%"}}>DMS Assays</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/ProteinGym_Dec_2023/clinical_msa_weights.zip"><Button style={{width:"48%"}}>Clinical Variants</Button></a>
            </div>
            <br/>
            <h3>Reference Files</h3>
            <div className="data-download-button">
                <a href="https://marks.hms.harvard.edu/proteingym/ProteinGym_Dec_2023/DMS_substitutions.csv"><Button style={{width:"48%"}}>DMS Substitutions</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/ProteinGym_Dec_2023/DMS_indels.csv"><Button style={{width:"48%"}}>DMS Indels</Button></a>
            </div>
            <div className="data-download-button">
                <a href="https://marks.hms.harvard.edu/proteingym/ProteinGym_Dec_2023/clinical_substitutions.csv"><Button style={{width:"48%"}}>Clinical Substitutions</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/ProteinGym_Dec_2023/clinical_indels.csv"><Button style={{width:"48%"}}>Clinical Indels</Button></a>
            </div>
            <br/>
            <h3>Additional Links</h3>
            <div className="data-download-button">
                <a href="https://openreview.net/forum?id=URoZHqAohf&referrer=%5BAuthor%20Console%5D(%2Fgroup%3Fid%3DNeurIPS.cc%2F2023%2FTrack%2FDatasets_and_Benchmarks%2FAuthors%23your-submissions)"><Button style={{width:"48%"}}>Paper</Button></a> <a href="https://github.com/OATML-Markslab/ProteinGym"><Button style={{width:"48%"}}>Github Repository</Button></a>
            </div>
            <div className="data-download-button">

            </div>
        </div>
    );
    }
    
export default Download;