import {React,useState,useRef} from 'react';
import styles from '../css/login.module.css';
import axios from "axios";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function Signup() {

    const [formdata, setformdata] = useState({
        name: "",
        email: "",
        password: "",
        repassword: "",
      });
      const [iserror, setiserror] = useState(false);
      const [errormsg, seterrormsg] = useState("");
      const namein = useRef();
      const emailin = useRef();
      const passwordin = useRef();
      const repasswordin = useRef();
      const checkin = useRef();
      const handleform = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value });
      };

      const handlesubmit = async (e) => {
        e.preventDefault();
        if (
            formdata.name.length != 0 &&
            formdata.email.length != 0 &&
            formdata.password.length >= 6 &&
            formdata.repassword.length != 0 &&
            formdata.password == formdata.repassword &&
            checkin.current.checked == true &&
            /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(formdata.email)
          ) {
            
            setiserror(false);
            const data = await axios
              .post("https://pomodron-backend.onrender.com/auth/signup", {
                name: formdata.name,
                email: formdata.email,
                password: formdata.password,
              })
              .then(({ data }) => {
                console.log(data);
                localStorage.setItem("refreshToken", data.refreshToken);
                localStorage.setItem("accessToken", data.accessToken);
                window.location.href = "/pomodro";
                setformdata({
                  name: "",
                  email: "",
                  password: "",
                  repassword: "",
                });
                namein.current.value = "";
                emailin.current.value = "";
                passwordin.current.value = "";
                repasswordin.current.value = "";
                checkin.current.checked = false;
              })
              .catch((e) => {
                console.log("error while registering", e?.response?.data);
                if (e?.response?.data?.code) {
                  setiserror(true);
                  seterrormsg(e?.response?.data?.msg);
                }
              });
          } else {
            console.log("error");
            setiserror(true);
            errorgenrator();
          }
      }


      const errorgenrator = () => {
        if (formdata.name.length == 0) {
          seterrormsg("please enter name");
        } else if (formdata.email.length == 0) {
          seterrormsg("please enter email");
        } else if (
          /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(formdata.email) != true
        ) {
          seterrormsg("please enter valid email address");
        } else if (formdata.password.length == 0) {
          seterrormsg("please enter password");
        } else if (formdata.password.length < 6) {
          seterrormsg("password must be contain 6 charchter");
        } else if (formdata.repassword.length == 0) {
          seterrormsg("please renter password");
        } else if (formdata.password != formdata.repassword) {
          seterrormsg("password does not match");
        } else if (checkin.current.checked == false) {
          seterrormsg("you are not agree to terms & condition");
        }
      };

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.wraper}>
              <div className={styles.logodiv}>
                <a href="/" className={styles.linke}>
                  <span className={styles.logotext}>Pomodro Timer App</span>
                </a>
              </div>
              <div className={styles.main}>
                <div className={styles.card}>
                  <div className={styles.up}>
                    <h5 className={styles.h5}>Create an Account</h5>
                    <p className={styles.p}>
                      Enter your personal details to create accountn
                    </p>
                  </div>
                  <form className={styles.form}>
                    {iserror && <div className={styles.error}>{errormsg}</div>}
                    <div className={styles.inputdiv}>
                      <label className={styles.label}>Your Name</label>
                      <div className={styles.username}>
                        <input
                          type="text"
                          className={styles.input1}
                          name="name"
                          ref={namein}
                          onChange={handleform}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className={styles.inputdiv}>
                      <label className={styles.label}>Your Email</label>
                      <div className={styles.username}>
                        <input
                          type="text"
                          className={styles.input1}
                          name="email"
                          ref={emailin}
                          onChange={handleform}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className={styles.inputdiv}>
                      <label className={styles.label}>Password</label>
                      <input
                        type="password"
                        className={styles.input1}
                        name="password"
                        ref={passwordin}
                        onChange={handleform}
                      />
                    </div>
                    <div className={styles.inputdiv}>
                      <label className={styles.label}>Renter Password</label>
                      <input
                        type="password"
                        className={styles.input1}
                        name="repassword"
                        ref={repasswordin}
                        onChange={handleform}
                      />
                    </div>
                    <div className={styles.inputdiv}>
                      <div className={styles.checkbox}>
                        <input
                          type="checkbox"
                          className={styles.check}
                          name="check"
                          ref={checkin}
                        />
                        <label className={styles.label}>
                          I agree and accept the{" "}
                          <a href="#" className={styles.signlink}>
                            terms and conditions
                          </a>
                        </label>
                      </div>
                    </div>
                    <div className={styles.inputdiv}>
                      <button className={styles.btn} onClick={handlesubmit}>
                        Create Account
                      </button>
                    </div>
                    <div className={styles.inputdiv}>
                      <p className={styles.ishave}>
                        Already have an account?
                        <a href="/login" className={styles.signlink}>
                          Log in
                        </a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Signup