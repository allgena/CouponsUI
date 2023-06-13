import { Link } from "react-router-dom";
// import FacebookIcon from "@material-ui/icons/FacebookIcon";
// import TwitterIcon from '@material-ui/icons/Twitter';
// import YouTubeIcon from '@material-ui/icons/YouTube';
import "../footer/Footer.css";



function Footer() {
  let currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      Create by G.Aks &copy; {currentYear}
      {/* <FacebookIcon />
      <TwitterIcon/>
      <YouTubeIcon/> */}
    </div>
  );
}

export default Footer;
