import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Stage, Component } from 'react-ngl';
import { SideMenu } from './SideMenu';

export const ProteinRibbonVisualizer = ({ pdbId }) => {
  const [selectedResidue, setSelectedResidue] = useState(null);
  const stageRef = useRef(null);

  const handleStructureClick = useCallback((pickingProxy) => {
    if (pickingProxy && pickingProxy.atom) {
      const residue = {
        atom: pickingProxy.atom.qualifiedName(),
        residueName: pickingProxy.atom.resname,
        residueIndex: pickingProxy.atom.resno,
        chainName: pickingProxy.atom.chainname,
        element: pickingProxy.atom.element,
      };
      setSelectedResidue(residue);
    } else {
      setSelectedResidue(null);
    }
  }, []);

  const handleStageMounted = useCallback((stage) => {
    console.log("stage yes")

    if (stage) {
      console.log("stage yes")
      stageRef.current = stage;
      stage.signals.clicked.removeAll();
      stage.signals.clicked.add(handleStructureClick);
    }
  }, [handleStructureClick]);

  const reprList = useMemo(() => [{ type: 'cartoon' }], []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Stage width="100%" height="100vh" onMounted={handleStageMounted}>
        <Component
          path={`https://files.rcsb.org/download/${pdbId}.cif`}
          reprList={reprList}
        />
      </Stage>
      <SideMenu residue={selectedResidue} />
    </div>
  );
};
