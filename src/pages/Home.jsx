import React from 'react';
import './css/Home.css';
import FancyButton from '../misc/FancyButton';
// Homepage with a message saying "This is the homepage"! 
// This is the default page that will be displayed when the user visits the root URL of your application.
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
                        <FancyButton pageLink="/benchmarks" text="DMS Substitutions (190 assays, ?? mutants)" viewType="aggregate" dataDomain="dms-substitutions" modelParadigm="zeroshot" sortKey="Rank-ASC"/>
                        <FancyButton pageLink="/benchmarks" text="DMS Indels (10 assays, ?? mutants)" viewType="aggregate" dataDomain="dms-indels" modelParadigm="zeroshot" sortKey="Rank-ASC"/>
                    </div>
                    <div className="clinical-button-container">
                        <h3>Clinical Benchmarks</h3>
                        <FancyButton pageLink="/benchmarks" text="Clinical Substitutions (3k genes, ?? mutants)" viewType="aggregate" dataDomain="clinical-substitutions" modelParadigm="zeroshot" sortKey="Rank-ASC"/>
                        <FancyButton pageLink="/benchmarks" text="Clinical Indels (1k genes, ?? mutants" viewType="aggregate" dataDomain="clinical-indels" modelParadigm="zeroshot" sortKey="Rank-ASC"/>
                    </div>
                </div>
            </div>
            <div className="grey-area-div top-div">
                <div className="text-div">
                    <p className="home-text">This project has been developed by:</p>
                    <p className="home-text">Pascal Notin, Mafalda Dias, Jonathan Frazer, Javier Marchena-Hurtado, Aidan N. Gomez, Debora S. Marks, Yarin Gal</p>
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