import styles from './css/login.module.css';
function App() {
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
                  <h5 className={styles.h5}>Get Started with Pomodoro - Sign up or Log In to Your Account</h5>
                  </div>
                <form className={styles.form}>
                
                   <div className={styles.inputdiv}>
                    <a href="/login" className={styles.btn2} >
                      Log In
                    </a>
                  </div>
                  <div className={styles.inputdiv}>
                    <a  href="/signup" className={styles.btn2} >
                      Sign Up
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
  );
}

export default App;
