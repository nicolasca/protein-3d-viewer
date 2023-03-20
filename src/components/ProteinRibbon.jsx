import React, { useEffect, useState, useRef, useCallback } from 'react';
import * as NGL from 'ngl';
import { SideMenu } from './SideMenu/SideMenu';

export const ProteinRibbon = ({ pdbId, onResidueSelection, colorScheme }) => {
  const stageRef = useRef(null);
  const colorSchemeRef = useRef(null);
  const lastProtRef = useRef(null);
  const containerRef = useRef(null);

  const changeColorScheme = (stage, colorScheme) => {
    let cartoonRep = stage.getRepresentationsByName("cartoon");
    let baseRep = stage.getRepresentationsByName("base");
    cartoonRep.setColor(colorScheme);
    baseRep.setColor(colorScheme);
  }

  useEffect(() => {
    console.log('Rendering ProteinRibbon, pdbId: ', pdbId);
    if (pdbId !== lastProtRef.current) {

      const stage = new NGL.Stage(containerRef.current, { backgroundColor: '#060406' });
      lastProtRef.current = pdbId;
      stage.setParameters({ cameraType: 'perspective' });
      stage.mouseControls.remove('hoverPick');
      stageRef.current = stage;

      const loadStructure = async () => {
        console.log('Loading structure...');
        try {
          const o = await stage.loadFile(`https://files.rcsb.org/download/${pdbId}.cif`);
          o.addRepresentation("cartoon", { color: colorScheme })
          o.addRepresentation("base", { color: colorScheme })
          stageRef.current.mouseControls.remove('hoverPick')
          stageRef.current.mouseControls.remove('clickPick-left')
          o.autoView();
        } catch (error) {
          console.error(error);
        }
      };

      loadStructure();

      stageRef.current.signals.clicked.add(handleStructureClick)
      stageRef.current.signals.hovered.add((pickingProxy) => {
        if (pickingProxy && pickingProxy.atom) {
          const resno = pickingProxy.atom.resno;

          let newScheme = NGL.ColormakerRegistry.addSelectionScheme([
            ["red", resno + ""],
            [colorSchemeRef.current, "* and not " + resno + ""]
          ]);
          changeColorScheme(stageRef.current, newScheme);

        } else {
          // If no residue is selected, reset the color to default
          changeColorScheme(stageRef.current, colorSchemeRef.current);
          // let cartoonRep = stageRef.current.getRepresentationsByName("cartoon");
          // let baseRep = stageRef.current.getRepresentationsByName("base");
          // cartoonRep.setColor(colorSchemeRef.current);
          // baseRep.setColor(colorSchemeRef.current);
        }
      });
    }
  }, [pdbId]);

  // Update the stage repreentation when the color scheme changes
  useEffect(() => {
    if (stageRef && stageRef.current) {
      changeColorScheme(stageRef.current, colorScheme);
      colorSchemeRef.current = colorScheme;
    }
  }, [colorScheme]);


  const handleStructureClick = (pickingProxy) => {
    if (pickingProxy && pickingProxy.atom) {
      const residue = {
        atom: pickingProxy.atom.qualifiedName(),
        residueName: pickingProxy.atom.resname,
        residueIndex: pickingProxy.atom.resno,
        chainName: pickingProxy.atom.chainname,
        element: pickingProxy.atom.element,
      };
      onResidueSelection(residue);
    } else {
        onResidueSelection(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <div id="viewport" ref={containerRef} 
      style={{ width: '100%', height: '100%', border: '2px solid #3ABDD0', borderRadius: '24px' }}></div>
    </div>
  );
};
