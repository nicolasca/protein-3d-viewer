// src/SideMenu.js
import React from 'react';
import './SideMenu.css';

export const SideMenu = ({ selectedResidue, onClose }) => {
    const handleClose = () => {
        onClose();
    };

    //   if (!selectedResidue) {
    //     return null;
    //   }

    return (
        <div className={`side-menu-wrapper ${selectedResidue ? "visible" : ""}`} >
            {selectedResidue &&
                <div className="side-menu-content">
                    <button className="side-menu-close-button" onClick={handleClose}>
                        X
                    </button>
                    <h2>{selectedResidue.residueName}</h2>
                    <p>Chain: {selectedResidue.chainName}</p>
                    <p>Residue name: {selectedResidue.residueName}</p>
                    <p>Atom type: {selectedResidue.atom}</p>
                </div>
            }
        </div>
    );
};

