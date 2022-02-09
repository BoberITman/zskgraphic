import { useEffect } from 'react';
import txtlib from '/libs/text'
const  simpleimg = (canvas,context,layout,text,fontsize,underline,photosrc) => {
     //Layout
    const layoutimg = new Image();
    layoutimg.src = '/layout/simple2.png'
    layoutimg.onload = () =>{
        context.drawImage(layoutimg,0,0,canvas.height,canvas.width)
      //Text
      context.fillStyle = "#2E2E2E"
      txtlib.font = "Poppins";
      txtlib.underline = underline
      txtlib.fontSize = fontsize
      txtlib.fontWeight = 500
      txtlib.drawText(context,text,50,143,1100,432)
    }


  //Photo
  const photo = new Image();
  photo.src= photosrc
      photo.onload = () =>{
          const width = canvas.width - canvas.width/12;
              context.drawImage(photo,(canvas.width-width)/2,canvas.height/2,width,width/2)
              context.lineWidth= 3;
              context.strokeStyle = '#2E2E2E';
              context.rect((canvas.width-width)/2, canvas.height/2, width, width/2);
              context.stroke();
      }
}
export default simpleimg