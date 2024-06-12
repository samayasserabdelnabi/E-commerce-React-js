import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function Regsiter() {
  // function validate(data) {
  //   let err = {}
  //   if (data.name == "") {
  //     err.name = "name Required"
  //   } else if (data.name.length < 3) {
  //     err.name = "min Char 3"
  //   }

  //   if (data.email == "") {
  //     err.email = "email required"
  //   }
  //   return err
  // }
let navg  =useNavigate()
  let [errmsg, setError] = useState("")
  let [loading, setLoading] = useState(true)


  let validationSchema = Yup.object({
    name: Yup.string().required("Name Required").min(3, "min Char 3 ").max(20, "max Length 20"),
    email: Yup.string().required("email Required").email("enter Valid Email"),
    phone: Yup.string().required("phone Required").matches(/^01[1250][0-9]{8}$/, "enter valid Phone"),
    password: Yup.string().matches(/^[A-Z][a-z0-9A-Z!@$%^&*()_-]{6,16}$/, "enter valid password").required("password Required"),
    rePassword: Yup.string().oneOf([Yup.ref("password")], "confirm Password not match").required("rePassword Required")
  })

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    onSubmit: registerApi,
    // validate,
    validationSchema
  })
  async function registerApi(val) {
    setLoading(false)
    let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', val).catch((err) => {
      setLoading(true)
      setError(err.response.data.message)
    })
    if (req.data.message == 'success') {
      // 
      navg('/login')
      setLoading(true)
    }
    console.log(req);
  }
  return (
    <div className='container py-5'>

      <h2 >Regsiter Now.....</h2>
      {errmsg == "" ? "" : <div className='alert alert-danger'>{errmsg}</div>}

      <form onSubmit={formik.handleSubmit}>
        <div className='mb-3'>
          <label htmlFor="name"> Name:</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className='form-control' name="name" id="name" />
          {
            (formik.errors.name && formik.touched.name) ? <div className='alert alert-danger'>
              {formik.errors.name}
            </div> : ""
          }


        </div>



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
          <label htmlFor="phone"> phone:</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" className='form-control' name="phone" id="phone" />

          {
            (formik.errors.phone && formik.touched.phone) ? <div className='alert alert-danger'>
              {formik.errors.phone}
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
        <div className='mb-3'>
          <label htmlFor="rePassword"> rePassword:</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className='form-control' name="rePassword" id="rePassword" />

          {
            (formik.errors.rePassword && formik.touched.rePassword) ? <div className='alert alert-danger'>
              {formik.errors.rePassword}
            </div> : ""
          }
        </div>

        {loading ? <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Register</button> : <button type='button' className='btn bg-main text-white'><i className='fa-solid fa-spinner fa-spin'></i></button>}



      </form>
    </div>
  )
}
