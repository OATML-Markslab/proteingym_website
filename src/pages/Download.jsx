// Page to download proteingym data (placeholder text for now)

import React from 'react';
import { Button } from '@mantine/core';
import './css/Download.css';
function Download() {
    return (
        <div className="download-div">
            <h2>Data</h2>
            <div className="button-group">
                <div className="header-buttons">
                    <h3>DMS Assays</h3>
                <div className="data-download-button">
                    <a href="https://marks.hms.harvard.edu/proteingym/DMS_ProteinGym_substitutions.zip"><Button className="indiv_button">Substitutions</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/DMS_ProteinGym_indels.zip"><Button className="indiv_button">Indels</Button></a>
                </div>
                <div className="data-download-button">
                    <a href="https://marks.hms.harvard.edu/proteingym/substitutions_raw_DMS.zip"><Button className="indiv_button">Raw Substitutions</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/indels_raw_DMS.zip"><Button className="indiv_button">Raw Indels</Button></a>
                </div>
                </div>
                <div className="header-buttons">
                <h3>Clinical Variants</h3>
                <div className="data-download-button">
                    <a href="https://marks.hms.harvard.edu/proteingym/clinical_ProteinGym_substitutions.zip"><Button className="indiv_button">Substitutions</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/clinical_ProteinGym_indels.zip"><Button className="indiv_button">Indels</Button></a>
                </div>
                <div className="data-download-button">
                    <a href="https://marks.hms.harvard.edu/proteingym/substitutions_raw_clinical.zip"><Button className="indiv_button">Raw Substitutions</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/indels_raw_clinical.zip"><Button className="indiv_button">Raw Indels</Button></a>
                </div>
                </div>
                <div className="header-buttons">
                    <h3>Multiple Sequence Alignments</h3>
                    <div className="data-download-button">
                        <a href="https://marks.hms.harvard.edu/proteingym/DMS_msa_files.zip"><Button className="indiv_button">DMS Assays</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/clinical_msa_files.zip"><Button className="indiv_button">Clinical Variants</Button></a>
                    </div>
                </div>
                <div className="header-buttons">
                    <h3>Multiple Sequence Alignment Weights</h3>
                    <div className="data-download-button">
                        <a href="https://marks.hms.harvard.edu/proteingym/DMS_msa_weights.zip"><Button className="indiv_button">DMS Assays</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/clinical_msa_weights.zip"><Button className="indiv_button">Clinical Variants</Button></a>
                    </div>
                </div>
                <div className="header-buttons">
                    <h3>Protein Structures</h3>
                    <div className="data-download-button">
                        <a href="https://marks.hms.harvard.edu/proteingym/ProteinGym_AF2_structures.zip"><Button className="indiv_button">DMS Structures</Button></a>
                    </div>
                </div>
            </div>
            <br/>
            <h3>Model Scores</h3>
            <div className="button-group">
                <div className="header-buttons">
                    <h3>Zero-Shot DMS Assay Scores</h3>
                    <div className="data-download-button">
                        <a href="https://marks.hms.harvard.edu/proteingym/zero_shot_substitutions_scores.zip"><Button className="indiv_button">Zero-shot Substitutions</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/zero_shot_indels_scores.zip"><Button className="indiv_button">Zero-shot Indels</Button></a>
                    </div>
                </div>
                <div className="header-buttons">
                    <h3>Supervised DMS Assay Scores</h3>
                    <div className="data-download-button">
                        <a href="https://marks.hms.harvard.edu/proteingym/DMS_supervised_substitutions_scores.csv"><Button className="indiv_button">Supervised Substitutions</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/DMS_supervised_indels_scores.csv"><Button className="indiv_button">Supervised Indels</Button></a>
                    </div>
                </div>
                <div className="header-buttons">
                    <h3>Zero-Shot Clinical Variant Scores</h3>
                    <div className="data-download-button">
                        <a href="https://marks.hms.harvard.edu/proteingym/zero_shot_clinical_substitution_scores.zip"><Button className="indiv_button">Zero-shot Substitutions</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/zero_shot_clinical_indels_scores.zip"><Button className="indiv_button">Zero-shot Indels</Button></a>
                    </div>
                </div>
            </div>
            <br/>
            <h3>Reference Files</h3>
            <div className="button-group">
                <div className="header-buttons">
                    <h3>DMS</h3>
                    <div className="data-download-button">
                        <a href="https://marks.hms.harvard.edu/proteingym/DMS_substitutions.csv"><Button className="indiv_button">Substitutions</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/DMS_indels.csv"><Button className="indiv_button">Indels</Button></a>
                    </div>
                </div>
                <div className="header-buttons">
                    <h3>Clinical</h3>
                    <div className="data-download-button">
                        <a href="https://marks.hms.harvard.edu/proteingym/clinical_substitutions.csv"><Button className="indiv_button">Substitutions</Button></a> <a href="https://marks.hms.harvard.edu/proteingym/clinical_indels.csv"><Button className="indiv_button">Indels</Button></a>
                    </div>
                </div>
            </div>
            <br/>
            <h3>Additional Links</h3>
            <div className="data-download-button">
                <a href="https://openreview.net/forum?id=URoZHqAohf&referrer=%5BAuthor%20Console%5D(%2Fgroup%3Fid%3DNeurIPS.cc%2F2023%2FTrack%2FDatasets_and_Benchmarks%2FAuthors%23your-submissions)"><Button style={{width:"20%",marginBottom:"1vh"}}>Paper</Button></a> <a href="https://github.com/OATML-Markslab/ProteinGym"><Button style={{width:"20%"}}>Github Repository</Button></a>
            </div>
            <div className="data-download-button">

            </div>
        </div>
    );
    }
    
export default Download;