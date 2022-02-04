import styles from '../styles/Home.module.css'
import {createRef, useEffect, useRef, useState} from 'react'
import genPreview from '/libs/canvas'
import lodash, { create, values } from "lodash";
import Cropper from 'cropperjs'

export default function Home() {
    const [text, setText] = useState("Podaj tekst")
    const [font, setFont] = useState(96)
    let canRef = useRef(null)
    const textChange = 
        lodash.debounce((event) =>{
            setText(event.target.value)
            }
        )
    const fontChange = lodash.debounce((event) =>{
        setFont(Number(event.target.value))
        }
    )
    const fontText = createRef(null)

    genPreview(canRef,'simpleimg','/photos/ru.jpg',text, font,true)
    return(
        <div className={styles.container}>
            <div className={styles.navbar}>
                 <img className={styles.logo} src='/logo.png'/>
            </div>
            <div className={styles.content}>
                <div className={styles.left_menu}>
                    <div className={styles.input}>
                    <h3>Tekst</h3>
                    <textarea onChange={textChange} name="text" rows='4'/>
                    </div>
                    <div className= {styles.font_input}>
                    <h3>Wielkość czcionki</h3>
                    <p ref={fontText}>Śmieszne</p>
                    <input onChange={fontChange} name="font" type="range" min='10'  max='144'/>
                    </div>
                </div>
                <div className={styles.art}>
                <canvas className={styles.canvas} ref={canRef}/>
                </div>
                <div className={styles.photos}>
                </div>
            </div>
            <footer className={styles.footer}>
                    <img src='https://avatars.githubusercontent.com/u/62724833?s=400&u=1db185950d9f89f66bbffc0671163cf8269bb153&v=4'/>
                    <a href='https://github.com/BoberITman'>Made by BoberITman</a>
            </footer>
        </div>
    )
}
