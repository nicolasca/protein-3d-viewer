// src/components/ProteinVisualizer.js
import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sphere, OrbitControls, Cylinder } from '@react-three/drei'
import { parseCif } from 'crystcif-parse';
import * as THREE from "three"
// import parseCIF  from './proteinUtils';

function distance(a, b) {
  return Math.sqrt(
    Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2)
  );
}

function isBonded(atom1, atom2, covalentRadii) {
  const d = distance(atom1.position, atom2.position);
  const threshold = (covalentRadii[atom1.element] + covalentRadii[atom2.element]) * 1.5;
  return d > 0.5 && d < threshold;
}

function getBonds(atoms, covalentRadii) {
  const bonds = [];

  for (let i = 0; i < atoms.length - 1; i++) {
    for (let j = i + 1; j < atoms.length; j++) {
      if (isBonded(atoms[i], atoms[j], covalentRadii)) {
        bonds.push([atoms[i], atoms[j]]);
      }
    }
  }

  return bonds;
}



function getAtoms(parsedData) {
  const atoms = [];

  // if (atomSiteLoop) {
  parsedData['_atom_site.Cartn_x'].value.forEach((el, i) => {

    const x = parseFloat(parsedData["_atom_site.Cartn_x"].value[i].num);
    const y = parseFloat(parsedData["_atom_site.Cartn_y"].value[i].num);
    const z = parseFloat(parsedData["_atom_site.Cartn_z"].value[i].num);
    const element = parsedData["_atom_site.type_symbol"].value[i].text.trim();
    atoms.push({ element, position: { x, y, z } });
  });
  // }

  return atoms;
}

const atomColors = {
  C: "gray",
  N: "blue",
  O: "red",
  H: "white",
  // Add more elements and their colors as needed
};


export const ProteinVisualizer = ({ pdbId }) => {
  const [atoms, setAtoms] = useState([]);
  const [bonds, setBonds] = useState([]);

  // Define covalent radii for elements (in Ångström)
  const covalentRadii = {
    C: 0.77,
    N: 0.75,
    O: 0.73,
    H: 0.37,
    // Add more elements as needed
  };

  useEffect(() => {
    async function fetchProteinModel(pdbId, assemblyName) {
      const response = await fetch(`https://files.rcsb.org/download/${pdbId}.cif`);
      const cifData = await response.text();
      return cifData;
    }

    fetchProteinModel(pdbId, "1")
      .then((cifData) => {
        const parsedData = parseCif(cifData)[pdbId];
        console.log(parsedData)
        const extractedAtoms = getAtoms(parsedData);
        const extractedBonds = getBonds(extractedAtoms, covalentRadii);

        console.log(extractedAtoms)
        setAtoms(extractedAtoms);
        setBonds(extractedBonds);
      })
      .catch((error) => {
        console.error("Error fetching protein model:", error);
      });
  }, [pdbId]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas>
        <ambientLight />
        <OrbitControls />
        <pointLight position={[10, 10, 10]} />
        {atoms.map((atom, index) => (
          <Sphere
            key={index}
            args={[covalentRadii[atom.element] * 0.6]}
            position={[atom.position.x, atom.position.y, atom.position.z]}
          >
            <meshStandardMaterial color={atomColors[atom.element]} />

          </Sphere>
        ))}
        {bonds.map(([atom1, atom2], index) => {
          const position = [
            (atom1.position.x + atom2.position.x) / 2,
            (atom1.position.y + atom2.position.y) / 2,
            (atom1.position.z + atom2.position.z) / 2,
          ];
          const height = distance(atom1.position, atom2.position);
          const rotation = [
            Math.atan2(atom2.position.y - atom1.position.y, atom2.position.z - atom1.position.z),
            0,
            Math.atan2(atom2.position.x - atom1.position.x, atom2.position.z - atom1.position.z),
          ];

          const dirVec = new THREE.Vector3(
            atom2.position.x - atom1.position.x,
            atom2.position.y - atom1.position.y,
            atom2.position.z - atom1.position.z
          );
          const upVec = new THREE.Vector3(0, 1, 0);
          const axis = new THREE.Vector3().crossVectors(upVec, dirVec).normalize();
          const angle = upVec.angleTo(dirVec);

          return (
            <Cylinder
              key={index}
              args={[0.1, 0.1, height, 16]}
              position={position}
              rotation={[0, 0, 0]} // Reset rotation to [0, 0, 0]
              onUpdate={(self) => {
                self.setRotationFromAxisAngle(axis, angle);
              }}
            />
          );
        })}
      </Canvas>
    </div>
  );
};
