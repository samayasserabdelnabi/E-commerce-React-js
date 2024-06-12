import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { UserContext } from '../../ShareData/UserContext'
import { CartContext } from '../../ShareData/CartContext'

export default function Layout() {
  let { getUserCart, setnumOfCartItems } = useContext(CartContext)
  let { setToken } = useContext(UserContext)
  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      setToken(localStorage.getItem("userToken"))
      getUserData()

    }

    console.log("layout");
  }, [])

  async function getUserData() {
    let req = await getUserCart().catch((err)=>{
      console.log(err);
    })
    console.log(req);
    if (req?.data?.status == 'success') {
      setnumOfCartItems(req.data.numOfCartItems)
    }
  }
  return (
    <div>
      <Navbar />
      <div className='my-5 pt-5'>
        <Outlet />
      </div>
      <Footer />

    </div>
  )
}
