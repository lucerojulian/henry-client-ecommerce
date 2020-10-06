import React,{ useState, useEffect } from 'react';
import s from './ImgSlider.module.css';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

// const images = [
//   {image: "https://www.bu.edu/eng/files/2016/04/400x200.shutterstock_263248619-copy.jpg"},
//   {image: "https://gradle.org/images/gradle-400x400.png"},
//   {image: "https://trinket-user-assets.trinket.io/a58fc3c83bacd7531287dd54c5f0580927894613-56ce822d9e067cab682b844e.jpg"},
//   {image: "https://img.europapress.es/fotoweb/fotonoticia_20160309121838_420.jpg"}
// ]
const SliderItem = function(props){
  const handleRadioChange = function(e){
    let newImg = Number(e.target.id);
    props.changeImg(newImg)
  }
  return (
    <div key={props.index}>
      <input onChange={handleRadioChange} type="radio" name="slider" id={props.index}/>
    </div>
  )
}
// {images.map(function(image,index){
//   return <SliderItem changeImg={setImg} index={index}/>
// })}

export default function ImgSlider(props){

  const [img, setImg] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if(!images || images.length !== props.images.length){
      setImages(props.images)
    }
  },[images])

  const handleChangeImageNext = function(){
    if(img === images.length-1){
      setImg(0);
    }
    if(img < images.length-1){
      setImg(img+1);
    }
  }

  const handleChangeImagePrev = function(){
    if(img === 0){
      setImg(images.length-1)
    }
    if(img > 0){
      setImg(img-1);
    }
  }

  return(
    <div className={s.main}>
    <button type="button" className={s.buttonPrev+ " " +s.btn} onClick={handleChangeImagePrev}><NavigateBeforeIcon className={s.icon}/></button>
    <button type="button" className={s.buttonNext+ " " +s.btn} onClick={handleChangeImageNext}><NavigateNextIcon className={s.icon}/></button>
      <div className={s.image}>
        {images.length > 0 && <img src={images[img]} alt=""/>}
      </div>
    </div>
  )
}
