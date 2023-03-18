// src/App.js
import React, { useState } from 'react';
import './App.css';
import logoUrl from './assets/logo.png'
import { ProteinRibbon } from './ProteinRibbon';
import { QueryProtein } from './QueryProtein';
import { SideMenu } from './SideMenu';
import styles from './ProteinViewer.module.css';

const App = () => {
  const [selectedPdbId, setSelectedPdbId] = useState('1BNA');
  const [selectedResidue, setSelectedResidue] = useState(null);

  const handleChange = (event) => {
    setSelectedPdbId(event.target.value);
  };

  const handleResidueSelection = (residue) => {
    console.log(residue)
    setSelectedResidue(residue);
  };

  const handleMenuClose = () => {
    setSelectedResidue(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {/* Add your logo and title here */}
        <img src={logoUrl} alt="Logo" height="50px" />
        <h1>Protein Viewer</h1>
      </div>
      <div className={styles.sidebar}>
        {/* Add example buttons here */}
        <button>Example 1</button>
        <button>Example 2</button>
        <button>Example 3</button>
        {/* <option value="1BNA">1BNA - Simple 1</option>
                <option value="2MHR">2MHR - Simple 2</option>
                <option value="1CRN">1CRN - Simple 3</option>
                <option value="1MBA">1MBA - Moderately Complex</option>
                <option value="1F88">1F88 - Complex</option> */}
      </div>
      <div className={styles.content}>
        {/* Add your ProteinRibbon canvas here */}
        <div id="protein-ribbon-canvas">
          <ProteinRibbon
            key={selectedPdbId}
            pdbId={selectedPdbId}
            onResidueSelection={handleResidueSelection}
          />
        </div>

        {/* Add the QueryProtein component here */}
        <div className={styles.queryContainer}>
          <select value={selectedPdbId} onChange={handleChange}>
          </select>
          <QueryProtein onPDBSelection={setSelectedPdbId} />
        </div>
      </div>
      <SideMenu selectedResidue={selectedResidue} onClose={handleMenuClose} />

    </div>
  );
};

export default App;
