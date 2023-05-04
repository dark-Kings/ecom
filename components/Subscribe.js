import React,{ useState, useEffect } from "react";
import styles from "../styles/Mystyle.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import  { useRouter } from 'next/router';

const Subscribe = () => {

   const [email, setemail] = useState("")
   const handleChange = (e) => {
      if (e.target.name == 'email') {
        setemail(e.target.value)
      }
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      const data = { email}
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      let response = await res.json();
      setemail("")
      if(response.success){
      toast.success('Mail is added to Subscribe List', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
   }
  return (

      <section className={styles.subscribe_section}>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
         <div className={styles['container-fuild']}>
            <div className={styles.box}>
               <div className={styles.row}>
                  <div className={`${styles['col-md-6']} ${styles['offset-md-3']}`}>
                     <div className={styles.subscribe_form}>
                        <div className={`${styles.heading_container} ${styles['heading_center']}`}>
                           <h2 className="heading_containerh2">Subscribe To Get Discount <span>Offers</span></h2>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                        <form onSubmit={handleSubmit} method="POST">
                           <input type="email" id="email" value={email} onChange={handleChange} name="email" autoComplete="email" placeholder="Enter your email" required/>
                           <button>
                           Subscribe
                           </button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>


  );
};

export default Subscribe;