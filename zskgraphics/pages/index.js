import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Logo from './static/logo.png'
import {useRef, useState, useCallback} from 'react'
import genPreview from '/libs/canvas'
import lodash from "lodash";
import Cropper from 'react-cropper';
import "cropperjs/dist/cropper.css";


export default function Home() {
    const [text, setText] = useState("Podaj tekst")
    const [font, setFont] = useState(96)
    const [underline, setUnderline] = useState(true)
    const [photo, setPhoto] = useState("/photos/ru.jpg")
    const [tmpphoto, setTmpPhoto] = useState(photo)
    let canRef = useRef(null)
    let imgRef = useRef(null)
    const textChange = useCallback(
        lodash.debounce((event) =>{
            setText(event.target.value)
        }
        ,300))
    const fontChange = useCallback(lodash.debounce((event) =>{
        setFont(Number(event.target.value))
        }
    ))
    const underlineChange = () =>
    {
        setUnderline(!underline)
    }
    genPreview(canRef,'simpleimg',photo,text, font,underline)

    const myLoader = ({src}) => {
        return `${src}`
      }
    const imageLoad = useCallback(lodash.debounce((event) =>{
        setTmpPhoto(event.target.currentSrc)
    }))
    
    const onCrop = useCallback(lodash.debounce(() =>{
        const imageElement =imgRef.current;
        const cropper = imageElement.cropper;
        if (cropper.getCroppedCanvas() != null) {
        setPhoto(cropper.getCroppedCanvas().toDataURL())
        }
    }),1000)
    const tab = [
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1495727034151-8fdc73e332a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1465&q=80",
        "https://images.unsplash.com/photo-1596496050755-c923e73e42e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1453&q=80",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"

    ]
    const photos = []
    tab.forEach((x)=>{
        photos.push(<img onClick={imageLoad} src={x}/>)
    })
    return(
        <div className={styles.container}>
            <div className={styles.navbar}> 
                <div className={styles.logo}>
                 <Image className={styles.logo} alt="Logo" layout="intrinsic" src={Logo}/>
                </div>
                <div className={styles.github}>
                    <div className={styles.github_photo}>
                        <Image loader={myLoader} alt="Github BoberITman" layout="responsive" width={100} height={100} src='https://avatars.githubusercontent.com/u/62724833?s=400&u=1db185950d9f89f66bbffc0671163cf8269bb153&v=4'/>
                    </div>
                    <a href='https://github.com/BoberITman'>Made by BoberITman</a>
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
                    <input className={styles.font_slider} onChange={fontChange} name="font" type="range" min='60'  max='150'/>
                    <div className={styles.underline}>
                        <p>Podkreślenie</p>
                        <input onChange={underlineChange} type='checkbox' checked/>
                        </div>
                    </div>
                </div>
                <div className={styles.art}>
                <canvas className={styles.canvas} ref={canRef}/>
                </div>
                <div className={styles.photos_div}>
                    <h3>Wybierz Zdjęcie</h3>
                    <input className={styles.image_search} name='imgsearch' type='text'/>
                    <div className={styles.photos}>
                        {   photos  }
                    </div>
                    <h3>Dopasuj Zdjęcie</h3>
                    <div className={styles.cropper_div}>
                        <Cropper
                        src={tmpphoto}
                        className={styles.cropper}
                        aspectRatio={2 / 1}
                        crop={onCrop}
                        ref={imgRef} 
                        /> 
                    </div>
                </div>
            </div>
        </div>

    )
}
