import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export default function CategorySlider() {
    let [categoryList, setCategory] = useState([])
    useEffect(() => {
        getAllCategory()
    }, [])
    async function getAllCategory() {
        let req = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
        setCategory(req.data.data)
    }
    return (
        <div>
            <h3>Categories</h3>

            <OwlCarousel className='owl-theme' items={7} loop autoplay  >
                  

                  {categoryList.map((el)=>{
                    return   <div key={el._id} className='item'>
                    <img src={el.image} className='w-100' height={200}  alt="" />
              
                   </div>
                  })}
                   
                   
                </OwlCarousel>  

        </div>
    )
}
