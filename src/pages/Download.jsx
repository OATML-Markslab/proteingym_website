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
                <a href="https://marks.hms.harvard.edu/proteingym/DMS_ProteinGym_substitutions.zip"><Button style={{width:"48%"}}>Substitutions</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/DMS_ProteinGym_indels.zip"><Button style={{width:"48%"}}>Indels</Button></a>
            </div>
            <br/>
            <div className="data-download-button">
                <a href="https://marks.hms.harvard.edu/proteingym/substitutions_raw_DMS.zip"><Button style={{width:"48%"}}>Raw Substitutions</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/indels_raw_DMS.zip"><Button style={{width:"48%"}}>Raw Indels</Button></a>
            </div>
            <br/>
            <h3>Clinical Variants</h3>
            <div className="data-download-button">
                <a href="https://marks.hms.harvard.edu/proteingym/clinical_ProteinGym_substitutions.zip"><Button style={{width:"48%"}}>Substitutions</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/clinical_ProteinGym_indels.zip"><Button style={{width:"48%"}}>Indels</Button></a>
            </div>
            <br/>
            <div className="data-download-button">
                <a href="https://marks.hms.harvard.edu/proteingym/substitutions_raw_clinical.zip"><Button style={{width:"48%"}}>Raw Substitutions</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/indels_raw_clinical.zip"><Button style={{width:"48%"}}>Raw Indels</Button></a>
            </div>
            <br/>
            <h3>Model Scores</h3>
            <br/>
            <h4>DMS Assay Scores</h4>
            <div className="data-download-button">
                <a href="https://marks.hms.harvard.edu/proteingym/zero_shot_substitutions_scores.zip"><Button style={{width:"48%"}}>Zero-shot Substitutions</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/zero_shot_indels_scores.zip"><Button style={{width:"48%"}}>Zero-shot Indels</Button></a>
            </div>
            <br/>
            <div className="data-download-button">
                <a href="https://marks.hms.harvard.edu/proteingym/DMS_supervised_substitutions_scores.csv"><Button style={{width:"48%"}}>Supervised Substitutions</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/DMS_supervised_indels_scores.csv"><Button style={{width:"48%"}}>Supervised Indels</Button></a>
            </div>
            <br/>
            <h4>Clinical Variant Scores</h4>
            <div className="data-download-button">
                <a href="https://marks.hms.harvard.edu/proteingym/zero_shot_clinical_substitution_scores.zip"><Button style={{width:"48%"}}>Zero-shot Substitutions</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/zero_shot_clinical_indels_scores.zip"><Button style={{width:"48%"}}>Zero-shot Indels</Button></a>
            </div>
            <br/>
            <h3>Multiple Sequence Alignments</h3>
            <div className="data-download-button">
                <a href="https://marks.hms.harvard.edu/proteingym/DMS_msa_files.zip"><Button style={{width:"48%"}}>DMS Assays</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/clinical_msa_files.zip"><Button style={{width:"48%"}}>Clinical Variants</Button></a>
            </div>
            <br/>
            <h3>Multiple Sequence Alignment Weights</h3>
            <div className="data-download-button">
                <a href="https://marks.hms.harvard.edu/proteingym/DMS_msa_weights.zip"><Button style={{width:"48%"}}>DMS Assays</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/clinical_msa_weights.zip"><Button style={{width:"48%"}}>Clinical Variants</Button></a>
            </div>
            <br/>
            <h3>Protein Structures</h3>
            <div className="data-download-button">
                <a href="https://marks.hms.harvard.edu/proteingym/ProteinGym_AF2_structures.zip"><Button style={{width:"100%"}}>Structures</Button></a>
            </div>
            <br/>
            <h3>Reference Files</h3>
            <div className="data-download-button">
                <a href="https://marks.hms.harvard.edu/proteingym/DMS_substitutions.csv"><Button style={{width:"48%"}}>DMS Substitutions</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/DMS_indels.csv"><Button style={{width:"48%"}}>DMS Indels</Button></a>
            </div>
            <div className="data-download-button">
                <a href="https://marks.hms.harvard.edu/proteingym/clinical_substitutions.csv"><Button style={{width:"48%"}}>Clinical Substitutions</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/clinical_indels.csv"><Button style={{width:"48%"}}>Clinical Indels</Button></a>
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