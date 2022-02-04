import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Logo from './static/logo.png'
import {createRef, useEffect, useRef, useState} from 'react'
import genPreview from '/libs/canvas'
import lodash from "lodash";
import Cropper from 'cropperjs'

export default function Home() {
    const [text, setText] = useState("Podaj tekst")
    const [font, setFont] = useState(96)
    const [underline, setUnderline] = useState(true)
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
    const underlineChange = lodash.debounce((event) =>
    {
        setUnderline(!underline)
    })
    genPreview(canRef,'simpleimg','/photos/ru.jpg',text, font,underline)

    const myLoader = ({src}) => {
        return `${src}`
      }
    return(
        <div className={styles.container}>
            <div className={styles.navbar}>
                <div className={styles.logo}>
                 <Image className={styles.logo} layout="intrinsic" src={Logo}/>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.left_menu}>
                    <div className={styles.input}>
                    <h3>Tekst</h3>
                    <textarea onChange={textChange} name="text" rows='4'/>
                    </div>
                    <div className= {styles.font_input}>
                    <h3>Wielkość czcionki</h3>
                    <p>{font} px</p>
                    <input onChange={fontChange} name="font" type="range" min='60'  max='150'/>
                    <div className={styles.underline}>
                        <p>Podkreślenie</p>
                        <input onChange={underlineChange} type='checkbox' checked/>
                        </div>
                    </div>
                </div>
                <div className={styles.art}>
                <canvas className={styles.canvas} ref={canRef}/>
                </div>
                <div className={styles.photos}>
                </div>
            </div>
            <footer className={styles.footer}>
                <div className={styles.github}>
                    <Image loader={myLoader} layout="responsive" width={100} height={100} src='https://avatars.githubusercontent.com/u/62724833?s=400&u=1db185950d9f89f66bbffc0671163cf8269bb153&v=4'/>
                </div>
                    <a href='https://github.com/BoberITman'>Made by BoberITman</a>
            </footer>
        </div>

    )
}
