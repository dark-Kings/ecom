import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styles from "../styles/Mystyle.module.css"


// import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <header>
      <div className={styles.slider_section}>
        <div className={styles.slider_bg_box}>
          <img src="/images/banner.png" alt="" />
        </div>
        <div
          id={styles.customCarousel1}
          className={`${styles.carousel} ${styles.slide}`}
          data-ride="carousel"
        >
          <Carousel
            autoPlay="true"
            interval="2000"
            showArrows={false}
            infiniteLoop={true}
            // autoFocus={false}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
          >
            <div className={styles['carousel-inner']}>
              <div className={`${styles['carousel-item']} ${styles.active}`}>
                <div className={styles.container}>
                  <div className={styles.row}>
                    <div className={ `${styles['col-md-7']} ${styles['col-lg-6']}`}>
                      <div className={styles['detail-box']}>
                        <h1>
                          <span>10%</span>
                          <br />
                          Discount
                        </h1>
                        <p>
                          Explicabo esse amet tempora quibusdam laudantium,
                          laborum eaque magnam fugiat hic? Esse dicta aliquid
                          error repudiandae earum suscipit fugiat molestias,
                          veniam, vel architecto veritatis delectus repellat
                          modi impedit sequi.
                        </p>
                        <div className={styles['btn-box']}>
                        <a href="#productssssss" className={styles.btn1}>
                            Shop Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles['carousel-inner']}>
              <div className={`${styles['carousel-item']} ${styles.active}`}>
                <div className={styles.container}>
                  <div className={styles.row}>
                    <div className={`${styles['col-md-7']} ${styles['col-lg-6']}`}>
                      <div className={styles['detail-box']}>
                        <h1>
                          <span>20%</span>
                          <br />
                          Discount
                        </h1>
                        <p>
                          Explicabo esse amet tempora quibusdam laudantium,
                          laborum eaque magnam fugiat hic? Esse dicta aliquid
                          error repudiandae earum suscipit fugiat molestias,
                          veniam, vel architecto veritatis delectus repellat
                          modi impedit sequi.
                        </p>
                        <div className={styles['btn-box']}>
                        <a href="#productssssss" className={styles.btn1}>
                            Shop Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
      {/* </section> */}
    </header>
  );
};

export default Banner;
