import React from 'react'

import styles from './Home.module.css'
import watsonUrl from './assets/background-watson.png'
import proteinUrl from './assets/protein-star-alone.png'

export const Home = ({onChangeLocation}) => {
    return (
        <div className={styles.Container}>
            {/* Add two images with one 75% of width et 25% for the other */}
            <div className={styles.Left}>
                {/* <div className={styles.Title}>
                    <span>
                        Explore the Building Blocks of Life with Our Interactive 3D Protein Viewer!
                    </span>
                    <button>
                    </button>
                </div> */}
            </div>
            <div className={styles.Right}>
                <div className={styles.CallToAction}>
                    <span className={styles.Button} onClick={() => onChangeLocation("visualizer")}>Unveil the Mystery</span>
                    <span className={styles.Text}>Proteins: because understanding the intricacies of molecules is far less perplexing than deciphering human emotions</span>
                    <img src={proteinUrl} />
                </div>
            </div>
        </div >
    )
}

