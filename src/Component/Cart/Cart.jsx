import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../ShareData/CartContext'
import { Link } from 'react-router-dom'

export default function Cart() {

  let { getUserCart, updateCart, removeCart, clearCart, setnumOfCartItems } = useContext(CartContext)
  let [cartData, setCartData] = useState(null)
  let [loading, setloading] = useState(true)
  let [UpdateLoading, setUpdateLoading] = useState(false)
  useEffect(() => {
    getUserData()

  }, [])
  async function getUserData() {
    setloading(true)
    let req = await getUserCart().catch((err) => {
      console.log(err);
      if (err.response.data.statusMsg == 'fail') {
        setCartData(null)
        setloading(false)
      }
    })
    if (req?.data?.status == 'success') {
      setloading(false)
      setCartData(req.data.data)
    }
  }
  async function removeItemCart(id) {
    let req = await removeCart(id)
    console.log(req);
    if (req?.data.status == 'success') {
      setnumOfCartItems(req.data.numOfCartItems)
      setCartData(req.data.data)
    }
  }

  async function clearCartData() {
    let req = await clearCart()
    if (req.data.message == 'success') {
      cartData(null)
    }
    console.log(req);
  }

  async function updateCartItem(id, count) {

    document.querySelector(`#quantity${id}`).classList.add("d-none")
    document.querySelector(`#spinner${id}`).classList.remove("d-none")
    if (count == 0) {
      removeItemCart(id)

    } else {
      let req = await updateCart(id, count)
      console.log(req);
      if (req?.data.status == 'success') {

        setCartData(req.data.data)
      }
      document.querySelector(`#quantity${id}`).classList.remove("d-none")
      document.querySelector(`#spinner${id}`).classList.add("d-none")
    }

  }
  return (
    <>

    <h2>Cart Data</h2>
      {loading ? <><div className='loading position-fixed top-0 end-0 start-0 bottom-0 d-flex justify-content-center align-items-center bg-white '>
        <span className="loader"></span>

      </div></> : <>
        {cartData == null ? <div className='alert alert-danger'>Cart Empty</div> : <div className='container '>

          <button onClick={clearCartData} className='btn btn-danger btn-sm float-end'>Empty Cart</button>
          <div className='clearfix'></div>

          {cartData.products.map((el) => {
            return <div className='row py-3 border-bottom border-3 align-items-center'>
              <div className='col-md-10'>
                <div className='row align-items-center'>
                  <div className='col-md-1'>
                    <img src={el.product.imageCover} className='w-100' alt="" />
                  </div>
                  <div className='col-md-10'>
                    <h6>{el.product.title}</h6>
                    <h5 className='text-muted'>Price:{el.price}EGP</h5>
                    <button onClick={() => removeItemCart(el.product._id)} className='btn btn-danger btn-sm'>Remove  <i className='fa-solid fa-trash'></i></button>
                  </div>
                </div>
              </div>
              <div className='col-md-2'>


                <i id={'spinner' + el.product._id} className=' d-none fa-solid fa-spinner fa-spin text-main'></i>


                <div id={'quantity' + el.product._id}>

                  <span onClick={() => updateCartItem(el.product._id, el.count += 1)} className='btn btn-success btn-sm'>
                    <i className='fa-solid fa-plus'></i>
                  </span>

                  <span className='mx-2'>
                    {el.count}
                  </span>


                  <span onClick={() => updateCartItem(el.product._id, el.count -= 1)} className='btn btn-danger btn-sm'>
                    <i className='fa-solid fa-minus'></i>
                  </span>
                </div>

              </div>
            </div>
          })}
{/* cartData._id */}
          <h3 className='text-main'>Total Price:{cartData.totalCartPrice}EGP</h3>
          <Link to={'/checkout/'+cartData._id} className='btn bg-main text-white'>Check out payment</Link>
        </div>}

      </>}


    </>
  )
}
