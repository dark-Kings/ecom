import React from "react";
import Head from "next/head";
import styles from "../styles/Mystyle.module.css"


const About = () => {
  return (
    <>
      <Head>
        <title>About -codeswear.com</title>
      </Head>



      <header>
      <div className={`${styles.slider_section} min-h-[800px] `}>
        <div className={styles.about_bg_box}>
          <img src="/images/about.png" alt="" />
        </div>
        <div
          id={styles.customCarousel1}
          className={`${styles.carousel} ${styles.slide}`}
          data-ride="carousel"
        >
            <div className={styles['carousel-inner']}>
              <div className={`${styles['carousel-item']} ${styles.active}`}>
                <div className={styles.container}>
                  <div className={styles.row}>
                    <div className={ `${styles['col-md-7']} ${styles['col-lg-6']}`}>
                      <div className={styles['detail-box']}>
                        <h1>
                          <span>About</span>
                          <br />
                          Us
                        </h1>
                        <p>
                        We’re a passionate group of people working from around the world to
            build the future of ecommerce.
                        </p>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    
    </header>
  </>
  );
};

export default About;
