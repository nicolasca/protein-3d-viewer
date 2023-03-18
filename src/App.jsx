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
        <div>Try one example</div>
        <button onClick={() => setSelectedPdbId('1CRN')}>1CRN</button>
        <button onClick={() => setSelectedPdbId('1F88')}>1F88</button>
        <button onClick={() => setSelectedPdbId('9ANT')}>9ANT</button>

      </div>
      <div className={styles.content}>
          <ProteinRibbon
            key={selectedPdbId}
            pdbId={selectedPdbId}
            onResidueSelection={handleResidueSelection}
          />
        {/* Add the QueryProtein component here */}
        <div className={styles.queryContainer}>
          <QueryProtein onPDBSelection={setSelectedPdbId} />
        </div>
      </div>
      <SideMenu selectedResidue={selectedResidue} onClose={handleMenuClose} />

    </div>
  );
};

export default App;
