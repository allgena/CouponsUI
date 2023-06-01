import { useNavigate } from "react-router-dom";
import CustomerCouponsContainer from "../customerContainer/CustomerCouponsContainer";

function Home() {
  const navigate = useNavigate();

  return <div className="home">
    <CustomerCouponsContainer />
  </div>;
}
export default Home;
