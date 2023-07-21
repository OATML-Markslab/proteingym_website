import React from 'react';
import './css/Home.css';

// Homepage with a message saying "This is the homepage"! 
// This is the default page that will be displayed when the user visits the root URL of your application.
function Home() {
    return (
        <div className="home-div">
            <div className="top-div">
                <h1 style={{marginBottom:"5vh"}}><b>ProteinGym</b></h1>
                <div className="text-div">
                    <p className="home-text"><b>ProteinGym</b> is an extensive set of Deep Mutational Scanning (DMS) assays curated to assess the ability of mutation effect 
                    predictors to <b>predict the fitness of mutated proteins</b>. It is comprised of two benchmarks: 
                    </p>
                    <ul className="list-text">
                        <li>A <b>substitution benchmark</b> which consists of the experimental characterization of <b>∼1.5M missense variants</b> across <b>87 DMS assays</b> </li>
                        <li>An <b>indel benchmark</b> that includes <b>∼300k mutants</b> across <b>7 DMS assays</b></li>
                    </ul>
                    <p className="home-text">
                        This website is aimed at facilitating comparisons of a large collection of mutation effect predictors in various regimes (eg., mutation depth, taxa, MSA depth).
                    </p>
                    <p className="home-text">
                        Instructions to download the benchmarks are available on our <a href="https://github.com/OATML-Markslab/ProteinGym">GitHub repository</a>.
                    </p>
                    <p className="home-text">
                        More details about the benchmark are provided in our <a href="https://proceedings.mlr.press/v162/notin22a.html">paper</a>
                    </p>
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