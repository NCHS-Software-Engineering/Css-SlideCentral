import '../styles/styles.css';

// specific details need to be changed once CSS is fixed
function HomePage() {
    return (
        <>
      {/* Example "Home" content with link to WidgetPage */}
      <div>
        <h1>Home Page</h1>
        <a href="/widgets" target="_blank" rel="noopener noreferrer">
          Open Widget Page in New Tab
        </a>
        <p></p>
        <a href="/faq" target="_blank" rel="noopener noreferrer">
          Open faq Page in New Tab
        </a>

      </div>
      </>
    );
  }
  
  export default HomePage;
  