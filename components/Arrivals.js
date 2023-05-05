import React from "react";
import styles from "../styles/Mystyle.module.css";
import Link from "next/link";

const Arrivals = () => {
  return (
    <section className={styles.arrival_section}>
      <div className={styles.container}>
        <div className={`${styles.box} ${styles.imagearrivals}`}>
          <div className={styles.arrivalrow}>
            <div className={`${styles.shop_now}`}>
              <div
                className={`${styles.heading_container} ${styles.remove_line_bt}`}
              >
                <h2 className="">#NewArrivals</h2>
              </div>
              <p
                style={{
                  marginTop: "20px",
                  marginBottom: "30px",
                  width: "50%",
                }}
              >
                Vitae fugiat laboriosam officia perferendis provident aliquid
                voluptatibus dolorem, fugit ullam sit earum id eaque nisi hic?
                Tenetur commodi, nisi rem vel, ea eaque ab ipsa, autem similique
                ex unde!
              </p>
              <Link legacyBehavior href="#productssssss">Shop Now</Link>
            </div>

            <div className={styles.arrival_bg_box}>
              <img src="/images/arrivals.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Arrivals;
