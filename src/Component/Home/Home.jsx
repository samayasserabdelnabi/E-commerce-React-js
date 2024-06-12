import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom';
import MainSilder from '../MainSilder/MainSilder';
import CategorySlider from '../CategorySlider/CategorySlider';
import { CartContext } from '../../ShareData/CartContext';
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  let { addCart,setnumOfCartItems } = useContext(CartContext)
  let [page, setPage] = useState(1)
  function getProducts(queryParm) {
    console.log();
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${queryParm.queryKey[1]}`)
  }
  let { isLoading, data, isError, isFetching, refetch } =
    useQuery(['productApi', page], getProducts,

      {
        // cacheTime:3000
        // refetchInterval:1000
        // refetchOnWindowFocus:false
        // refetchOnMount:false
        // staleTime: 2000,
        // enabled: false
      }
    )

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

  function addToWishList(e,id){

    e.target.classList.replace('fa-regular','fa-solid')
  }
  return (
    <>
      <Toaster />
      {isLoading ? <div className='loading position-fixed top-0 end-0 start-0 bottom-0 d-flex justify-content-center align-items-center bg-white '>
        <span className="loader"></span>

      </div> :
        <div className='container py-5'>
          <MainSilder />
          <CategorySlider />
          <div className='row g-5'>

            {/* <button className='btn btn-info d-block w-100' onClick={refetch}> Get Data</button> */}
            {data?.data.data.map((item) => {
              return <div key={item.id} className='col-md-2'>
                <div className="product pb-2 position-relative">
                  <Link to={`/ProductDetails/${item.id}`}>
                    <img src={item.imageCover} className='w-100' alt="" />
                    <h6 className='text-main'>{item.category.name}</h6>
                    <h5 className='fw-bold'>{item.title.split(" ").slice(0, 2).join(" ")}</h5>
                    <div className='d-flex justify-content-between'>

                      <span>{item.price}EGP</span>
                      <span> <i className='fa-regular fa-star rating-color'></i>{item.ratingsAverage}</span>
                    </div>

                  </Link>
                  <i onClick={ (e)=>addToWishList(e,item.id)} className='fa-regular fa-heart fa-2x position-absolute top-0 end-0 m-3 text-danger'></i>
                  <button onClick={() => addToCart(item.id)} className='btn bg-main text-white w-100 d-block'>Add Cart</button>
                </div>
              </div>
            })}

          </div>
          <nav aria-label="Page  navigation example">
            <ul className="pagination mt-5 justify-content-center">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item"><a className="page-link" onClick={() => setPage(1)}>1</a></li>
              <li className="page-item"><a className="page-link" onClick={() => setPage(2)} >2</a></li>

              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>}



    </>
  )

















  // let [loading, setLoading] = useState(true)
  // let [productList, setProducts] = useState([])
  // useEffect(() => {

  //   getAllProducts()
  // }, [])
  // async function getAllProducts() {
  //   setLoading(true)
  //   let req = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=1`)


  //   console.log(req.data.data);
  //   setProducts(req.data.data)
  //   setLoading(false)
  // }

}


