import { useNavigate } from "react-router-dom";
import "./Home.css"

function Home() {
  const navigate = useNavigate();

  function onHomeClick(): void {
  
    navigate("/coupons");
  }
  return <div className="home">
    {/* <CustomerCouponsContainer /> */}
   

    <div className="marquee-infinite"  onClick={() => onHomeClick()}>
    <div >
        <span>
            <img className="img1"/>
            <img className="img2"/>
            <img className="img3"/>
            <img className="img4"/>
        </span>
        <span>
        <img className="img1"/>
            <img className="img2"/>
            <img className="img3"/>
            <img className="img4"/>
        </span>
    </div>
  </div>
  </div>;
}
export default Home;
