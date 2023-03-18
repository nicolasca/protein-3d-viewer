// src/App.js
import React, { useState } from 'react';
import './App.css';
import { ProteinRibbon } from './ProteinRibbon';
import { SideMenu } from './SideMenu';

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
        <>
            <select value={selectedPdbId} onChange={handleChange}>
                <option value="1BNA">1BNA - Simple 1</option>
                <option value="2MHR">2MHR - Simple 2</option>
                <option value="1CRN">1CRN - Simple 3</option>
                <option value="1MBA">1MBA - Moderately Complex</option>
                <option value="1F88">1F88 - Complex</option>
            </select>
            <div style={{ width: '100%' }}>
                <ProteinRibbon
                    key={selectedPdbId}
                    pdbId={selectedPdbId}
                    onResidueSelection={handleResidueSelection}
                />
            </div>
            <SideMenu selectedResidue={selectedResidue} onClose={handleMenuClose} />
        </>
    );
};

export default App;
