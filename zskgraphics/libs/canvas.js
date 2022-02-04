  
  import simpleimg from '/libs/simpleimg'
  import {useEffect} from 'react'
  const getPreview = (canRef,layout,photosrc,text,fontsize, underline) => {
    //Context
  useEffect(()=>{
  const canvas = canRef.current;
  const context = canvas.getContext('2d')
  canvas.width = 1200;
  canvas.height = canvas.width;
  switch(layout){
        case 'simple':
            break;
        case 'simpleimg':
            simpleimg(canvas,context,text,fontsize,underline,photosrc)
            break;
        default:
            context.fillText('Fattal Error')
    }

    },[layout,photosrc,text,fontsize, underline]);
    }
    export default getPreview