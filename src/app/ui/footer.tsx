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
            <li>Art</li>
            <li>Woodwork</li>
            <li>Pottery</li>
            <li>Photography</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Support</h3>
          <ul className="footer-links">
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Shipping Info</li>
            <li>Returns</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Legal</h3>
          <ul className="footer-links">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Accessibility</li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Handcrafted Haven. All rights reserved.</p>
      </div>
    </footer>
  );
}
