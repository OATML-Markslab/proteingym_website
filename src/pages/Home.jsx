import React from 'react';
import './css/Home.css';
import FancyButton from '../misc/FancyButton';
import DirectionallyAwareButton from '../misc/DirectionallyAwareButton';
function Home() {
    return (
        <div className="home-div">
            <div className="top-div">
                <h1 style={{marginBottom:"5vh"}}><b>ProteinGym</b></h1>
                <div className="text-div">
                    <p className="home-text"> <b>ProteinGym</b> is a collection of benchmarks aiming at comparing the ability of models to predict the effects of protein mutations.
                    The benchmarks in ProteinGym are divided according to mutation type (substitutions vs. indels), ground truth source (DMS assay vs. clinical annotation), and training regime (zero-shot vs. supervised).</p>
                </div>
                <div className="button-outer-container">
                    <div className="dms-button-container">
                        <h3>DMS Benchmarks</h3>
                        <DirectionallyAwareButton filled="true" pageLink="/benchmarks" viewType="aggregate" dataDomain="DMS_substitutions" modelParadigm="zero_shot" sortKey="Rank-ASC" currStatistic="Spearman">DMS Substitutions (217 assays, 2.5M mutants)</DirectionallyAwareButton>
                        {/* <FancyButton pageLink="/benchmarks" text="DMS Substitutions (217 assays, 2.5M mutants)" viewType="aggregate" dataDomain="dms_subs" modelParadigm="zeroshot" sortKey="Rank-ASC" currStatistic="Spearman" /> */}
                        <DirectionallyAwareButton filled="true" pageLink="/benchmarks" viewType="aggregate" dataDomain="DMS_indels" modelParadigm="zero_shot" sortKey="Rank-ASC" currStatistic="Spearman">DMS Indels (66 assays, 300K mutants)</DirectionallyAwareButton>
                    </div>
                    <div className="clinical-button-container">
                        <h3>Clinical Benchmarks</h3>
                        <DirectionallyAwareButton filled="true" pageLink="/benchmarks" viewType="aggregate" dataDomain="clinical_substitutions" modelParadigm="zero_shot" sortKey="Rank-ASC" currStatistic="Spearman">Clinical Substitutions (2.5K genes, 63K mutants)</DirectionallyAwareButton>
                        <DirectionallyAwareButton filled="true" pageLink="/benchmarks" viewType="aggregate" dataDomain="clinical_indels" modelParadigm="zero_shot" sortKey="Rank-ASC" currStatistic="Spearman">Clinical Indels (1.5K genes, 3K mutants)</DirectionallyAwareButton>
                    </div>
                </div>
            </div>
            <div className="grey-area-div top-div">
                <div className="text-div">
                    <p className="home-text">This project has been developed by:</p>
                    <p className="home-text">Pascal Notin, Aaron Kollasch, Daniel Ritter, Lood Van Niekerk, Steffanie Paul, Han Spinner, Nathan Rollins, Ada Shaw, Rose Orenbuch, Ruben Weitzman, Jonathan Frazer, Mafalda Dias, Dinko Franceschi, Yarin Gal, and Debora Marks</p>
                    <br/>
                    <br/>
                    <p><b>OATML</b> - Oxford Applied and Theoretical Machine Learning Group</p>
                    <p><b>Marks Lab</b> - Harvard Medical School</p>
                </div>
                <div className="images-div" style={{ display: "flex", justifyContent: "center" }}>
                    <img src="/assets/oxfordcslogo.png" style={{ width: "30%", marginRight: "20px" }} />
                    <img src="/assets/hmslogo.png" style={{ width: "30%" }} />
                </div>
            </div>
        </div>

    );
    }

export default Home;