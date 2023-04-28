import React from "react";
import styles from "../styles/Mystyle.module.css";

const Subscribe = () => {
  return (

      <section className={styles.subscribe_section}>
         <div className={styles['container-fuild']}>
            <div className={styles.box}>
               <div className={styles.row}>
                  <div className={`${styles['col-md-6']} ${styles['offset-md-3']}`}>
                     <div className={styles.subscribe_form}>
                        <div className={`${styles.heading_container} ${styles['heading_center']}`}>
                           <h3>Subscribe To Get Discount Offers</h3>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                        <form action="">
                           <input type="email" placeholder="Enter your email" />
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