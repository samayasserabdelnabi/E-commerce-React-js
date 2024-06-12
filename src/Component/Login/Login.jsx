import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { UserContext } from '../../ShareData/UserContext'
import { CartContext } from '../../ShareData/CartContext'
export default function Login() {
  let { getUserCart, setnumOfCartItems } = useContext(CartContext)
  let { setToken } = useContext(UserContext)
  let navg = useNavigate()
  let [errmsg, setError] = useState("")
  let [loading, setLoading] = useState(true)


  let validationSchema = Yup.object({
    email: Yup.string().required("email Required").email("enter Valid Email"),
    password: Yup.string().matches(/^[A-Z][a-z0-9A-Z!@$%^&*()_-]{6,16}$/, "enter valid password").required("password Required"),
  })

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: LoginApi,
    // validate,
    validationSchema
  })
  async function LoginApi(val) {
    setLoading(false)
    let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', val).catch((err) => {
      console.log(err);
      setLoading(true)
      setError(err.response.data.message)
    })

    if (req.data.message == 'success') {
      setLoading(true)
      // 
      setToken(req.data.token)
      localStorage.setItem("userToken", req.data.token)
      getUserData()

      navg("/home")
    }
  }
  async function getUserData() {
    let req = await getUserCart().catch((err)=>{})
    console.log(req);
    if (req?.data?.status == 'success') {
      setnumOfCartItems(req.data.numOfCartItems)
    }
  }
  return (
    <div className='container py-5'>

      <h2 >Login Now.....</h2>
      {errmsg == "" ? "" : <div className='alert alert-danger'>{errmsg}</div>}

      <form onSubmit={formik.handleSubmit}>




        <div className='mb-3'>
          <label htmlFor="email"> email:</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" className='form-control' name="email" id="email" />


          {
            (formik.errors.email && formik.touched.email) ? <div className='alert alert-danger'>
              {formik.errors.email}
            </div> : ""
          }
        </div>


        <div className='mb-3'>
          <label htmlFor="password"> password:</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className='form-control' name="password" id="password" />

          {
            (formik.errors.password && formik.touched.password) ? <div className='alert alert-danger'>
              {formik.errors.password}
            </div> : ""
          }
        </div>

        <Link to="/ForgetPassword">ForgetPassword ?.............</Link>
        <br/>
        {loading ? <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Login</button> : <button type='button' className='btn bg-main text-white'><i className='fa-solid fa-spinner fa-spin'></i></button>}



      </form>
    </div>
  )
}
