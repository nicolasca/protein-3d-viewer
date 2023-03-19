import React, { useEffect, useState, useRef } from 'react';
import * as NGL from 'ngl';
import { SideMenu } from './SideMenu';

export const ProteinRibbon = ({ pdbId, onResidueSelection, stageRef }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const stage = new NGL.Stage(containerRef.current, { backgroundColor: 'white' });
      stage.setParameters({ cameraType: 'perspective' });
      stage.mouseControls.remove('hoverPick');
      stageRef.current = stage;

      const loadStructure = async () => {
        try {
          const o = await stage.loadFile(`https://files.rcsb.org/download/${pdbId}.cif`);
          o.addRepresentation('cartoon', { color: 'residueindex' });
          stage.mouseControls.remove('hoverPick')
          stage.mouseControls.remove('clickPick-left')
          o.autoView();

          stage.signals.clicked.add(handleStructureClick)
          stage.signals.hovered.add((pickingProxy) => {
            if (pickingProxy && pickingProxy.atom) {
              const resno = pickingProxy.atom.resno;

              let newScheme = NGL.ColormakerRegistry.addSelectionScheme([
                ["red", resno + ""],
                ["residueindex", "*"]
              ]);
              let cartoonRep = stage.getRepresentationsByName("cartoon");
              cartoonRep.setColor(newScheme);
              cartoonRep.update({ color: true });

            } else {
              // If no residue is selected, reset the color to default
              let cartoonRep = stage.getRepresentationsByName("cartoon");
              cartoonRep.setColor("residueindex");
              cartoonRep.update({ color: true });
            }
          });
        } catch (error) {
          console.error(error);
        }
      };

      loadStructure();

    }
  }, [pdbId]);

  const handleStructureClick = (pickingProxy) => {
    if (pickingProxy && pickingProxy.atom) {
      const residue = {
        atom: pickingProxy.atom.qualifiedName(),
        residueName: pickingProxy.atom.resname,
        residueIndex: pickingProxy.atom.resno,
        chainName: pickingProxy.atom.chainname,
        element: pickingProxy.atom.element,
      };
      console.log(residue)
      onResidueSelection(residue);
    } else {
        onResidueSelection(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div id="viewport" ref={containerRef} style={{ width: '100%', height: '100vh' }}></div>
    </div>
  );
};
