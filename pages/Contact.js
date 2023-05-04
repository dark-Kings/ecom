import React,{ useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Mystyle.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [sub, setsub] = useState("");
  const [msg, setmsg] = useState("");

  const handleChange = (e) => {
    if (e.target.name == "name") {
      setname(e.target.value);
    } else if (e.target.name == "email") {
      setemail(e.target.value);
    } else if (e.target.name == "sub") {
      setsub(e.target.value);
    } else if (e.target.name == "msg") {
      setmsg(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, sub, msg };
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    setname("");
    setemail("");
    setsub("");
    setmsg("");

    if (response.success) {
      toast.success("You are added to Contact List", {
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
  };

  return (
    <>
      <Head>
        <title>Contact -codeswear.com</title>
      </Head>
      <header>
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
        <section id={styles.contact} className={styles.contact}>
          <div className={styles.container}>
            <div className={styles["section-title"]}>
              <h2 data-aos="fade-up">Contact</h2>
              <p data-aos="fade-up">
                Have any questions? We'd love to here from you.
                <br /> For all queries, contact as or submit the form below.
              </p>
            </div>

            <div
              className={`${styles.row} ${styles["justify-content-center"]}`}
            >
              <div
                className={`${styles["col-xl-3"]} ${styles["col-lg-4"]} ${styles["mt-4"]}`}
                data-aos="fade-up"
              >
                <div className={styles["info-box"]}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{ fill: "rgba(0, 0, 0, 1)" }}
                  >
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M13 4.069V2h-2v2.069A8.01 8.01 0 0 0 4.069 11H2v2h2.069A8.008 8.008 0 0 0 11 19.931V22h2v-2.069A8.007 8.007 0 0 0 19.931 13H22v-2h-2.069A8.008 8.008 0 0 0 13 4.069zM12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"></path>
                  </svg>
                  <h3>Our Address</h3>
                  <p>Door2Door Services, Haldwani, Goraparow</p>
                </div>
              </div>

              <div
                className={`${styles["col-xl-3"]} ${styles["col-lg-4"]} ${styles["mt-4"]}`}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className={styles["info-box"]}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{ fill: "rgba(0, 0, 0, 1)" }}
                  >
                    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z"></path>
                  </svg>
                  <h3>Email Us</h3>
                  <p>
                    <a href="mailto:door2doorserviceshld@gmail.com">
                      door2doorsed@gmail.com
                    </a>
                    <br />
                    <a href="mailto:door2doorserviceshld@gmail.com">
                      infodoo@gms.com
                    </a>
                  </p>
                </div>
              </div>
              <div
                className={`${styles["col-xl-3"]} ${styles["col-lg-4"]} ${styles["mt-4"]}`}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className={styles["info-box"]}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{ fill: "rgba(0, 0, 0, 1)" }}
                  >
                    <path d="M20 10.999h2C22 5.869 18.127 2 12.99 2v2C17.052 4 20 6.943 20 10.999z"></path>
                    <path d="M13 8c2.103 0 3 .897 3 3h2c0-3.225-1.775-5-5-5v2zm3.422 5.443a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a1 1 0 0 0-.086-1.391l-4.064-3.696z"></path>
                  </svg>
                  <h3>Call Us</h3>
                  <p>
                    <a href="tel:8954208211">+91 8954208211</a>
                    <a href="tel:8433024414">
                      <br />
                      +91 8433024414
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`${styles.row} ${styles["justify-content-center"]}`}
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div
                className={`${styles["col-xl-9"]} ${styles["col-lg-12"]} ${styles["mt-4"]}`}
              >
                <form
                  onSubmit={handleSubmit}
                  method="POST"
                  role="form"
                  className={styles["php-email-form"]}
                >
                  <div className={styles.row}>
                    <div
                      className={`${styles["col-md-6"]} ${styles["form-group"]}`}
                    >
                      <input
                        type="text"
                        name="name"
                        className={styles["form-control"]}
                        id={styles.name}
                        placeholder="Your Name"
                        value={name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div
                      className={`${styles["col-md-6"]} ${styles["form-group"]} ${styles["mt-3"]} ${styles["mt-md-0"]}`}
                    >
                      <input
                        type="email"
                        className={styles["form-control"]}
                        name="email"
                        id={styles.email}
                        placeholder="Your Email"
                        value={email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className={`${styles["form-group"]} ${styles["mt-3"]}`}>
                    <input
                      type="text"
                      className={styles["form-control"]}
                      name="sub"
                      id={styles.subject}
                      placeholder="Subject"
                      value={sub}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles["form-group mt-3"]}>
                    <textarea
                      className={styles["form-control"]}
                      name="msg"
                      rows="5"
                      placeholder="Message"
                      value={msg}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className={styles["text-center"]}>
                    <button type="submit">Send Message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </header>
    </>
  );
};

export default Contact;
