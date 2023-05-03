import React from 'react'
import Head from 'next/head'
import styles from "../styles/Mystyle.module.css"

const Contact = () => {
  return (
    <>
        <Head>
        <title>Contact -codeswear.com</title>
        </Head>
        <header>
      <div className={styles.slider_section}>
        <div className={styles.about_bg_box}>
          <img src="/images/contact.png" alt="" />
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
                          <span>Contact</span>
                          <br />
                          Us
                        </h1>
                        <p>
                        Get in touch
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
      {/* </section> */}
    </header>
    </>
  )
}

export default Contact
