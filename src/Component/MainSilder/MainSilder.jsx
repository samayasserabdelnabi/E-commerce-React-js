import React from 'react'
import img1 from '../../assets/images/slider-image-1.jpeg'
import img2 from '../../assets/images/slider-image-2.jpeg'
import img3 from '../../assets/images/slider-image-3.jpeg'
import img4 from '../../assets/images/grocery-banner-2.jpeg'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export default function MainSilder() {
    return (
        <div className='row my-3 g-0'>
            <div className='col-md-9'>
                <OwlCarousel className='owl-theme' items={1} loop autoplay  >
                    <div className='item'>
                       <img src={img1} className='w-100' height={400} alt="" />
                 
                      </div>
                    <div className='item'>
                       <img src={img2} className='w-100' height={400} alt="" />
                 
                      </div>
                    <div className='item'>
                       <img src={img3} className='w-100' height={400} alt="" />
                 
                      </div>
                    <div className='item'>
                       <img src={img4} className='w-100' height={400} alt="" />
                 
                      </div>
                   
                </OwlCarousel>
            </div>
            <div className='col-md-3'>
                <img src={img2} className='w-100' height={200} alt="" />
                <img src={img3} className='w-100' height={200} alt="" />
            </div>
        </div>
    )
}
