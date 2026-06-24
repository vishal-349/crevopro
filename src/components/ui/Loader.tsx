import logo from '@/assets/logo.svg';

/** Full-screen branded loading spinner shown on initial load and as the lazy fallback. */
export default function Loader() {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loader-circle"></div>
        <div className="loader-circle"></div>
        <img src={logo} alt="CrevoPro" className="loader-logo" />
      </div>
    </div>
  );
}
