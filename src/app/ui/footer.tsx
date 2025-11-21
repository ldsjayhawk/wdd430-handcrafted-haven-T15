export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-section">
          <h3 className="footer-title">Handcrafted Haven</h3>
          <p className="footer-text">
            Supporting local artisans and promoting sustainable consumption through
            unique handcrafted items.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Shop</h3>
          <ul className="footer-links">
            <li><a href="#">Art</a></li>
            <li><a href="#">Woodwork</a></li>
            <li><a href="#">Pottery</a></li>
            <li><a href="#">Photography</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Support</h3>
          <ul className="footer-links">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Returns</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Legal</h3>
          <ul className="footer-links">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Accessibility</a></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Handcrafted Haven. All rights reserved.</p>
      </div>
    </footer>
  );
}
