import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { CartContext } from '../../ShareData/CartContext';
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast';
export default function ProductDetails() {
    let param = useParams()
    let { addCart,setnumOfCartItems } = useContext(CartContext)
    let [productid, setProduct] = useState(null)
    useEffect(() => {
        setProduct(param.id)
    }, [])
    async function getDetails(queryParm) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${queryParm.queryKey[1]}`)

    }
    let { data, isLoading } = useQuery(['productdetails', productid], getDetails)
    let product = data?.data.data

    function getImgPath(event) {
        let imgpath  =event.target.getAttribute("src")
        document.querySelector("#myImg").setAttribute("src",imgpath)
    }
    async function addToCart(id) {
        let req = await addCart(id)
        if (req.data.status == "success") {
    
          setnumOfCartItems(req.data.numOfCartItems)
          toast.success(req.data.message, {
            // position: 'bottom-right'
          });
        }
        console.log(req);
      }
    return (
        <>
        <Toaster></Toaster>
            {isLoading ? <div className='loading position-fixed top-0 end-0 start-0 bottom-0 d-flex justify-content-center align-items-center bg-white '>
                <span className="loader"></span>

            </div> : <div className='container py-5'>
                <div className='row align-items-center'>
                    <div className='col-md-4'>


                        <div className='row align-items-center'>
                            <div className='col-md-2'>
                                {product.images.map((el) => {
                                    return <img onClick={getImgPath} src={el} className='w-100 border mb-2 cursor-pointer' alt="" />
                                })}
                            </div>
                            <div className='col-md-10'>
                                <img id='myImg' src={product?.imageCover} className='w-100' alt="" />
                            </div>
                        </div>
                    </div>
                    <div className='col-md-8'>
                        <h2>{product.title}</h2>
                        <p className='text-muted my-3'>{product.description}</p>
                        <h6>{product.category.name}</h6>
                        <div className='d-flex justify-content-between'>

                            <span>{product.price}EGP</span>
                            <span> <i className='fa-regular fa-star rating-color'></i>{product.ratingsAverage}</span>
                        </div>
                        <button onClick={()=>addToCart(product.id)} className='btn bg-main my-3 text-white w-100 d-block'>Add Cart</button>
                    </div>

                </div>
            </div>}


        </>

    )
}
