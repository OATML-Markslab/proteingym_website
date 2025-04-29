// Page to download proteingym data (placeholder text for now)

import React from 'react';
import { Button } from '@mantine/core';
import './css/Download.css';
function Download() {
    const root_folder = "https://marks.hms.harvard.edu/proteingym/ProteinGym_v1.3"
    return (
        <div className="download-div">
            <h2>Data</h2>
            <div className="button-group">
                <div className="header-buttons">
                    <h3>DMS Assays</h3>
                <div className="data-download-button">
                    <a href={`${root_folder}/DMS_ProteinGym_substitutions.zip`}><Button className="indiv_button">Substitutions</Button></a> <a href={`${root_folder}/DMS_ProteinGym_indels.zip`}><Button className="indiv_button">Indels</Button></a>
                </div>
                <div className="data-download-button">
                    <a href={`${root_folder}/substitutions_raw_DMS.zip`}><Button className="indiv_button">Raw Substitutions</Button></a> <a href={`${root_folder}/indels_raw_DMS.zip`}><Button className="indiv_button">Raw Indels</Button></a>
                </div>
                </div>
                <div className="header-buttons">
                <h3>Clinical Variants</h3>
                <div className="data-download-button">
                    <a href={`${root_folder}/clinical_ProteinGym_substitutions.zip`}><Button className="indiv_button">Substitutions</Button></a> <a href={`${root_folder}/clinical_ProteinGym_indels.zip`}><Button className="indiv_button">Indels</Button></a>
                </div>
                <div className="data-download-button">
                    <a href={`${root_folder}/substitutions_raw_clinical.zip`}><Button className="indiv_button">Raw Substitutions</Button></a> <a href={`${root_folder}/indels_raw_clinical.zip`}><Button className="indiv_button">Raw Indels</Button></a>
                </div>
                </div>
                <div className="header-buttons">
                    <h3>Multiple Sequence Alignments</h3>
                    <div className="data-download-button">
                        <a href={`${root_folder}/DMS_msa_files.zip`}><Button className="indiv_button">DMS Assays</Button></a> <a href={`${root_folder}/clinical_msa_files.zip`}><Button className="indiv_button">Clinical Variants</Button></a>
                    </div>
                </div>
                <div className="header-buttons">
                    <h3>Multiple Sequence Alignment Weights</h3>
                    <div className="data-download-button">
                        <a href={`${root_folder}/DMS_msa_weights.zip`}><Button className="indiv_button">DMS Assays</Button></a> <a href={`${root_folder}/clinical_msa_weights.zip`}><Button className="indiv_button">Clinical Variants</Button></a>
                    </div>
                </div>
            </div>
            <div style={{width:"47.5%"}} className="button-group">
                <div className="header-buttons">
                    <h3>Protein Structures</h3>
                    <div className="data-download-button">
                        <a href={`${root_folder}/ProteinGym_AF2_structures.zip`}><Button className="indiv_button">DMS Structures</Button></a>
                    </div>
                </div>
                <div className="header-buttons">
                    <h3>Supervised Cross-Validation Splits</h3>
                    <div className="data-download-button">
                        <a href={`${root_folder}/cv_folds_singles_substitutions.zip`}><Button className="indiv_button">Substitution Singles</Button></a>
                    </div>
                    <div className="data-download-button">
                        <a href={`${root_folder}/cv_folds_multiples_substitutions.zip`}><Button className="indiv_button">Substitution Multiples</Button></a>
                    </div>
                    <div className="data-download-button">
                        <a href={`${root_folder}/cv_folds_indels.zip`}><Button className="indiv_button">Indels</Button></a>
                    </div>
                </div>
            </div>
            <br/>
            <h3>Model Scores</h3>
            <div className="button-group">
                <div className="header-buttons">
                    <h3>Zero-Shot DMS Assay Scores</h3>
                    <div className="data-download-button">
                        <a href={`${root_folder}/zero_shot_substitutions_scores.zip`}><Button className="indiv_button">Zero-shot Substitutions</Button></a> <a href={`${root_folder}/zero_shot_indels_scores.zip`}><Button className="indiv_button">Zero-shot Indels</Button></a>
                    </div>
                </div>
                <div className="header-buttons">
                    <h3>Supervised DMS Assay Scores</h3>
                    <div className="data-download-button">
                        <a href={`${root_folder}/DMS_supervised_substitutions_scores.zip`}><Button className="indiv_button">Supervised Substitutions</Button></a> <a href={`${root_folder}/DMS_supervised_indels_scores.zip`}><Button className="indiv_button">Supervised Indels</Button></a>
                    </div>
                </div>
                <div className="header-buttons">
                    <h3>Zero-Shot Clinical Variant Scores</h3>
                    <div className="data-download-button">
                        <a href={`${root_folder}/zero_shot_clinical_substitutions_scores.zip`}><Button className="indiv_button">Zero-shot Substitutions</Button></a> <a href={`${root_folder}/zero_shot_clinical_indels_scores.zip`}><Button className="indiv_button">Zero-shot Indels</Button></a>
                    </div>
                </div>
            </div>
            <br/>
            <h3>Reference Files</h3>
            <div className="button-group">
                <div className="header-buttons">
                    <h3>DMS</h3>
                    <div className="data-download-button">
                        <a href={`${root_folder}/DMS_substitutions.csv`}><Button className="indiv_button">Substitutions</Button></a> <a href={`${root_folder}/DMS_indels.csv`}><Button className="indiv_button">Indels</Button></a>
                    </div>
                </div>
                <div className="header-buttons">
                    <h3>Clinical</h3>
                    <div className="data-download-button">
                        <a href={`${root_folder}/clinical_substitutions.csv`}><Button className="indiv_button">Substitutions</Button></a> <a href={`${root_folder}/clinical_indels.csv`}><Button className="indiv_button">Indels</Button></a>
                    </div>
                </div>
            </div>
            <br/>
            <h3>Additional Links</h3>
            <div className="data-download-button">
                <a href="https://papers.nips.cc/paper_files/paper/2023/hash/cac723e5ff29f65e3fcbb0739ae91bee-Abstract-Datasets_and_Benchmarks.html"><Button className="lone_button">Paper</Button></a> <a href="https://github.com/OATML-Markslab/ProteinGym"><Button className="lone_button">Github Repository</Button></a>
            </div>
            <div className="data-download-button">

            </div>
        </div>
    );
    }
    
export default Download;