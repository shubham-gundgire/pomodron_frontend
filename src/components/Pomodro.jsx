import React, { useRef,useState,useEffect } from 'react'
import styles from '../css/pomodro.module.css'
import axios from "axios";

function Pomodro() {
    const [time, setTime] = useState(1500000);
    const [isRunning, setIsRunning] = useState(false);
    const [isPan,setIsPan] = useState(true);
    const button1 = useRef();
    const button2 = useRef();
    const mainContainer = useRef();
    const [isauth, setIsauth] = useState(false);
    const [udata, setudata] = useState(null);

    useEffect(() => {
        let interval;

        if (isRunning) {
            
            interval = setInterval(() => {
              setTime((time) => time - 10);
            }, 10);
          } else if (!isRunning) {
            clearInterval(interval);
          }
          return () => clearInterval(interval);
        
      }, [isRunning]);
      
      useEffect(() => {
        verifyuser();
      }, []);

      const verifyuser = async () => {
        const mytoken=localStorage.getItem('accessToken')
    
        if (!mytoken) {
          setIsauth(false);
          window.location.href = "/login";
        } else if (mytoken) {
          setIsauth(true);
          getdata();
        }
      };

      const getdata = async () => {
        const mytoken = localStorage.getItem("accessToken");
            const data = await axios
              .get("https://pomodron-backend.onrender.com/user/getUser/", {
                headers: {
                    authorization: mytoken,
                },
              })
              .then(({ data }) => {
                setudata(data);
                return data;
              })
              .catch((e) => {
                console.log(e);
              });
          };


      const minutes = Math.floor((time / 60000) % 60);
      const seconds = Math.floor((time / 1000) % 60);

    const buttonOneClik = ()=>{
        mainContainer.current.style.backgroundColor = '#397097';
        button1.current.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        button2.current.style.backgroundColor = '#397097';
        setTime(1500000);
        setIsRunning(false);
        setIsPan(true);
    }
   
    const buttonTwoClik = ()=>{
        console.log('hi');
        mainContainer.current.style.backgroundColor = '#BA4949';
        button2.current.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        button1.current.style.backgroundColor = '#BA4949';
        setTime(300000);
        setIsRunning(false);
        setIsPan(false);
    } 

    const startStopTimer = ()=>{
        setIsRunning(!isRunning);
    }
    const resetTimer  =()=>{
        if (isPan){
        setTime(1500000);        
        }
        else{
            setTime(300000);  
        }
        setIsRunning(false);
    }

  return (
    <>    
    <div className={styles.main} ref={mainContainer}>
        <div className={styles.box}>
            <div className={styles.heading}>Welecome {udata?.userdata?.name}</div>
            <div className={styles.clock}>
                <div className={styles.menu}>
                    <div className={styles.btn1} ref={button1} onClick={buttonOneClik}>Pomodoro</div>
                    <div className={styles.btn2}ref={button2} onClick={buttonTwoClik}>Short Break</div>
                </div>
                <div className={styles.timer}>{time<0?'00':minutes.toString().padStart(2, "0")} : {time<0?'00':seconds.toString().padStart(2, "0")}</div>
                <div className={styles.controles}>
                    {!isRunning?<div ><svg onClick={startStopTimer} className={styles.controlbtn} stroke="currentColor" fill="white" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg></div>
                    :<div className={styles.btndiv}>
                        <div ><svg className={styles.controlbtn} onClick={startStopTimer} stroke="currentColor" fill="white" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"></path></svg></div>
                        <div >< svg className={styles.controlbtn} onClick={resetTimer} stroke="currentColor" fill="white" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path d="M0 0h24v24H0z"></path><path d="M0 0h24v24H0z"></path><path d="M0 0h24v24H0z"></path></g><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"></path></svg></div>
                    </div>}
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Pomodro