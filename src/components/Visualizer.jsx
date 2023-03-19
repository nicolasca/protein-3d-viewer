// src/App.js
import React, { useCallback, useRef, useState } from 'react';
import logoUrl from '../assets/logo.png'
import { ProteinRibbon } from './ProteinRibbon';
import { QueryProtein } from './QueryProtein';
import { SideMenu } from './SideMenu';
import styles from './Viewer.module.css';

export const Visualizer = ({onChangeLocation}) => {
  const [selectedPdbId, setSelectedPdbId] = useState('1CRN');
  const [selectedResidue, setSelectedResidue] = useState(null);
  const [selectedColorScheme, setSelectedColorScheme] = useState('uniform');

  const han = (event) => {
    setSelectedPdbId(event.target.value);
  };

  const handleResidueSelection = useCallback((residue) => {
    setSelectedResidue(residue);
  }, [setSelectedResidue]);

  const handleMenuClose = () => {
    setSelectedResidue(null);
  };

  const handleColorSchemeChange = (e) => {
    const colorScheme = e.target.value;
    setSelectedColorScheme(colorScheme);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {/* Add your logo and title here */}
        <img src={logoUrl} alt="Logo" height="50px" onClick={() => onChangeLocation("home")}/>
        <h1>Protein Viewer</h1>
      </div>
      <div className={styles.sidebar}>
        {/* Add example buttons here */}
        <div>Try one example</div>
        <button onClick={() => setSelectedPdbId('1CRN')}>1CRN</button>
        <button onClick={() => setSelectedPdbId('1F88')}>1F88</button>
        <button onClick={() => setSelectedPdbId('9ANT')}>9ANT</button>
        <button onClick={() => setSelectedPdbId('5A02')}>5A02</button>
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

        <select
          className={styles.colorSchemeDropdown}
          onChange={handleColorSchemeChange}
        >
          <option value="uniform">Uniform</option>
          <option value="random">Random</option>
          <option value="atomindex">Atom Index</option>
          <option value="residueindex">Residue Index</option>
          <option value="chainindex">Chain Index</option>
          <option value="modelindex">Model Index</option>
          <option value="sstruc">Secondary Structure</option>
          {/* Add more color schemes as needed */}
        </select>
      </div>
      <SideMenu selectedResidue={selectedResidue} onClose={handleMenuClose} />

    </div>
  );

};