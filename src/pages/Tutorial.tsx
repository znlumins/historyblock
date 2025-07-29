import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Tutorial = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white border-2 border-[#ced4da] rounded-lg">
      {/* Import Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&family=Merriweather:wght@400;700&family=Georgia:wght@400&display=swap"
      />

      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-r from-historic-cream-light to-historic-cream px-4 md:px-8">
        <div className="text-center max-w-2xl">
          <h1 className="font-georgia text-2xl md:text-3xl lg:text-4xl text-historic-brown-dark mb-4">
            Tutorial Gameplay
          </h1>
          <p className="font-merriweather text-base md:text-lg text-gray-700 mb-6">
            Halaman tutorial sedang dalam pengembangan.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-historic-brown-dark text-white font-quicksand rounded-lg hover:bg-historic-brown transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-historic-brown border-t-4 border-historic-brown-dark py-9 px-36">
        <div className="max-w-6xl mx-auto text-center relative">
          {/* Logo */}
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c339a674deb6423c5cd64cac74684504d5ed5944?placeholderIfAbsent=true"
            alt="HISTORIC BLOCK"
            className="w-[62px] h-[62px] mx-auto mb-4"
          />

          <p className="font-merriweather text-historic-cream-light mb-6">
            Belajar sejarah dengan cara yang menyenangkan
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="text-historic-cream-light hover:text-white transition-colors"
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_27_39)">
                  <path
                    d="M19.9375 10.5C19.9375 5.14844 15.6016 0.8125 10.25 0.8125C4.89844 0.8125 0.5625 5.14844 0.5625 10.5C0.5625 15.3352 4.10508 19.343 8.73633 20.0703V13.3004H6.27539V10.5H8.73633V8.36562C8.73633 5.93789 10.1816 4.59687 12.3953 4.59687C13.4555 4.59687 14.5641 4.78594 14.5641 4.78594V7.16875H13.3422C12.1391 7.16875 11.7637 7.91562 11.7637 8.68164V10.5H14.4504L14.0207 13.3004H11.7637V20.0703C16.3949 19.343 19.9375 15.3352 19.9375 10.5Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_27_39">
                    <path d="M0.25 0.5H20.25V20.5H0.25V0.5Z" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a
              href="#"
              className="text-historic-cream-light hover:text-white transition-colors"
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_27_42)">
                  <path
                    d="M18.1941 6.42638C18.2068 6.60403 18.2068 6.78173 18.2068 6.95938C18.2068 12.3781 14.0825 18.6218 6.54441 18.6218C4.22207 18.6218 2.06473 17.9492 0.25 16.7817C0.579961 16.8198 0.897187 16.8325 1.23984 16.8325C3.15605 16.8325 4.92004 16.1853 6.32867 15.0812C4.52664 15.0431 3.01648 13.8629 2.49617 12.2386C2.75 12.2766 3.00379 12.302 3.27031 12.302C3.63832 12.302 4.00637 12.2512 4.34898 12.1624C2.47082 11.7817 1.06215 10.132 1.06215 8.13958V8.08884C1.60781 8.39341 2.24238 8.58376 2.91492 8.60911C1.81086 7.87306 1.08754 6.61673 1.08754 5.1954C1.08754 4.43399 1.29055 3.73603 1.6459 3.12688C3.66367 5.61419 6.69668 7.23853 10.0977 7.41622C10.0342 7.11165 9.99613 6.79442 9.99613 6.47716C9.99613 4.21825 11.8236 2.37817 14.0951 2.37817C15.2753 2.37817 16.3413 2.8731 17.09 3.67259C18.0164 3.49493 18.9047 3.15228 19.6916 2.68274C19.387 3.63454 18.7398 4.43403 17.8895 4.94161C18.7144 4.85282 19.5139 4.62435 20.2499 4.30712C19.6916 5.11927 18.9936 5.84259 18.1941 6.42638Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_27_42">
                    <path d="M0.25 0.5H20.25V20.5H0.25V0.5Z" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a
              href="#"
              className="text-historic-cream-light hover:text-white transition-colors"
            >
              <svg
                width="18"
                height="21"
                viewBox="0 0 18 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_27_45)">
                  <path
                    d="M9.00391 6.00781C6.51953 6.00781 4.51562 8.01172 4.51562 10.4961C4.51562 12.9805 6.51953 14.9844 9.00391 14.9844C11.4883 14.9844 13.4922 12.9805 13.4922 10.4961C13.4922 8.01172 11.4883 6.00781 9.00391 6.00781ZM9.00391 13.4141C7.39844 13.4141 6.08594 12.1055 6.08594 10.4961C6.08594 8.88672 7.39453 7.57812 9.00391 7.57812C10.6133 7.57812 11.9219 8.88672 11.9219 10.4961C11.9219 12.1055 10.6094 13.4141 9.00391 13.4141ZM14.7227 5.82422C14.7227 6.40625 14.2539 6.87109 13.6758 6.87109C13.0938 6.87109 12.6289 6.40234 12.6289 5.82422C12.6289 5.24609 13.0977 4.77734 13.6758 4.77734C14.2539 4.77734 14.7227 5.24609 14.7227 5.82422ZM17.6953 6.88672C17.6289 5.48438 17.3086 4.24219 16.2812 3.21875C15.2578 2.19531 14.0156 1.875 12.6133 1.80469C11.168 1.72266 6.83594 1.72266 5.39062 1.80469C3.99219 1.87109 2.75 2.19141 1.72266 3.21484C0.695313 4.23828 0.378906 5.48047 0.308594 6.88281C0.226562 8.32812 0.226562 12.6602 0.308594 14.1055C0.375 15.5078 0.695313 16.75 1.72266 17.7734C2.75 18.7969 3.98828 19.1172 5.39062 19.1875C6.83594 19.2695 11.168 19.2695 12.6133 19.1875C14.0156 19.1211 15.2578 18.8008 16.2812 17.7734C17.3047 16.75 17.625 15.5078 17.6953 14.1055C17.7773 12.6602 17.7773 8.33203 17.6953 6.88672ZM15.8281 15.6562C15.5234 16.4219 14.9336 17.0117 14.1641 17.3203C13.0117 17.7773 10.2773 17.6719 9.00391 17.6719C7.73047 17.6719 4.99219 17.7734 3.84375 17.3203C3.07812 17.0156 2.48828 16.4258 2.17969 15.6562C1.72266 14.5039 1.82813 11.7695 1.82813 10.4961C1.82813 9.22266 1.72656 6.48438 2.17969 5.33594C2.48438 4.57031 3.07422 3.98047 3.84375 3.67187C4.99609 3.21484 7.73047 3.32031 9.00391 3.32031C10.2773 3.32031 13.0156 3.21875 14.1641 3.67187C14.9297 3.97656 15.5195 4.56641 15.8281 5.33594C16.2852 6.48828 16.1797 9.22266 16.1797 10.4961C16.1797 11.7695 16.2852 14.5078 15.8281 15.6562Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_27_45">
                    <path d="M0.25 0.5H17.75V20.5H0.25V0.5Z" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Tutorial;
