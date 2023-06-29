import "../footer/Footer.css";



function Footer() {
  let currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      Create by G.Aks &copy; {currentYear}

    </div>
  );
}

export default Footer;
