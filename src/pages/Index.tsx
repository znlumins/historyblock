import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 border-2 border-[#ced4da] dark:border-gray-700 rounded-lg">
      {/* Import Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&family=Merriweather:wght@400;700&family=Georgia:wght@400&display=swap"
      />

      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="w-full h-[578px] bg-gradient-to-r from-historic-cream-light to-historic-cream dark:from-gray-800 dark:to-gray-700 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-20">
          {/* Indonesian Map Silhouettes */}
          <svg
            className="absolute top-10 left-10"
            width="140"
            height="117"
            viewBox="0 0 140 117"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M112.805 0.558718C116.694 1.62414 119.934 2.58943 124.161 3.84833C119.031 21.2389 123.33 36.0388 139.176 45.9199C136.726 50.7476 133.217 49.5309 130.27 49.6304C122.212 49.9025 117.666 53.4359 119.436 61.1182C121.354 69.4437 117.363 73.4003 111.848 77.004C106.686 80.377 103.323 83.8961 106.085 90.5084C106.979 92.6493 105.246 94.3941 104.379 96.2987C103.103 99.1015 101.575 102.192 103.318 105.294C105.253 108.738 103.743 111.432 101.736 113.892C99.0184 117.223 97.4578 113.67 95.3111 112.69C93.0817 111.672 90.7325 112.944 88.4982 113.7C85.5682 114.691 83.1962 117.216 79.2369 116.913C78.5499 109.441 74.9241 107.137 66.8228 107.469C57.8664 107.837 49.04 106.662 40.9583 108.802C39.715 102.657 36.5392 100.893 29.8159 102.27C22.0221 103.865 18.2467 100.134 17.0556 92.3244C16.3655 87.7996 12.7016 83.7727 15.7521 78.1341C6.58514 78.7677 4.26894 71.8506 3.487 66.4433C1.84664 55.0997 -4.45035 42.4043 8.89079 32.8433C9.55774 33.4211 10.5222 33.9223 10.9955 34.7164C19.195 48.4732 33.0177 50.9197 45.1719 40.6787C48.9573 37.4893 52.9068 36.8769 57.4859 39.039C67.5633 43.7972 76.1411 40.4955 80.454 30.4459C84.1671 21.7939 91.9433 15.0448 92.0198 4.59252C92.0381 2.10035 95.1044 0.910074 98.023 0.466288C102.777 -0.256592 107.448 0.201602 112.805 0.558718Z"
              fill="#654321"
            />
          </svg>

          <svg
            className="absolute top-0 right-20"
            width="161"
            height="158"
            viewBox="0 0 161 158"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M145.116 157.644C139.601 155.454 134.086 153.047 128.146 157.505C112.359 142.222 93.1948 130.019 79.8451 111.643C78.4472 109.719 77.4682 107.697 76.6028 105.445C72.0037 93.4751 66.4578 82.2281 55.5064 74.334C50.3843 70.6418 51.4063 63.335 48.6893 58.0116C47.516 55.7126 47.3747 52.5138 44.7721 51.5359C37.3557 48.7493 32.5521 43.4668 29.2688 36.5647C25.1902 27.9908 15.4441 25.8898 9.65913 19.2222C6.56778 15.6593 2.66569 12.7484 1.14547 8.04483C0.446336 5.88172 -1.0519 3.39469 1.17099 1.45376C3.39172 -0.485318 6.63959 -0.431503 8.53879 1.2988C13.3948 5.72298 18.8907 5.84998 24.7787 5.07217C34.2292 3.82378 38.563 10.8089 42.2343 17.2294C44.503 21.1969 47.462 23.998 50.9291 25.8223C60.4716 30.8436 67.6129 38.2491 73.2613 45.9878C89.5226 46.0875 98.4221 58.0669 110.192 64.5762C110.274 64.4134 110.822 63.3292 111.347 62.288C115.908 64.0058 117.542 79.1929 113.679 87.4184C127.82 87.1944 126.873 103.541 137.573 108.365C134.09 102.557 137.006 99.1987 141.543 97.4826C146.436 95.6315 149.578 98.0663 150.382 103.316C150.896 106.668 152.573 108.958 155.889 110.362C158.79 111.591 159.041 114.874 160.045 117.341C157.114 122.463 153.414 117.939 149.862 118.307C142.874 130.363 149.54 144.084 145.188 157.05C145.069 157.691 145.116 157.644 145.116 157.644Z"
              fill="#654321"
            />
          </svg>

          {/* Additional decorative map elements scattered throughout */}
          <svg
            className="absolute bottom-20 left-40"
            width="47"
            height="16"
            viewBox="0 0 47 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M41.6087 3.73444C43.9447 7.5038 48.6941 9.83198 46.0961 15.0412C41.701 16.2271 38.8741 12.5419 35.2237 11.6598C29.3844 10.2488 24.1368 8.42564 17.7232 12.4903C12.0237 16.1024 4.59881 15.4172 0.608398 7.68695C8.77957 -0.542915 27.7295 -2.60862 41.6087 3.73444Z"
              fill="#654321"
            />
          </svg>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center h-full px-4 md:px-8 lg:px-20 relative z-10">
          <div className="text-center max-w-4xl">
            <h1 className="font-georgia text-2xl md:text-3xl lg:text-[42px] leading-tight mb-3">
              <span className="text-historic-brown dark:text-historic-yellow">
                Selamat Datang di{" "}
              </span>
              <span className="text-historic-brown-dark dark:text-historic-yellow-light">
                Kuis Sejarah
              </span>
            </h1>

            <p className="font-merriweather text-sm md:text-base lg:text-[16.766px] leading-relaxed text-[#2c1810] dark:text-gray-200 mb-8 md:mb-12 max-w-3xl mx-auto px-4">
              Uji pengetahuan sejarah Anda melalui kuis interaktif yang
              terhubung dengan board game Historic Block. Jelajahi peristiwa
              bersejarah dan asah kemampuan Anda!
            </p>

            {isAuthenticated ? (
              <Link
                to="/kuis"
                className="inline-flex items-center gap-2 px-6 md:px-10 lg:px-14 py-3 md:py-4 lg:py-5 bg-historic-brown-dark border-2 border-historic-brown rounded-lg shadow-lg hover:bg-historic-brown transition-colors"
              >
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.8078 17.5267H21.9075V20.8114H20.8078V17.5267ZM20.8078 2.18857H21.9075V5.48044H20.8078V2.18857ZM17.5231 1.09607H20.8078V2.18857H17.5231V1.09607ZM17.5231 20.8114H20.8078V21.9039H17.5231V20.8114ZM18.6156 4.38435H4.3772V18.6228H18.6156V4.38435ZM14.2384 9.86123H15.3309V13.1459H12.0463V12.0534H14.2384V9.86123ZM9.85407 5.48404H13.1388V6.57654H9.85407V5.48404ZM9.85407 7.66904H13.1388V10.9537H12.0463V8.76872H9.85407V7.66904ZM9.85407 9.86123H10.9538V13.1459H9.85407V9.86123ZM8.76157 17.5303H5.47688V14.2456H8.76157V17.5303ZM8.76157 12.0534H6.56938V13.1459H5.47688V9.86123H6.56938V10.9537H8.76157V12.0534ZM8.76157 9.86123H7.66907V7.66904H8.76157V9.86123ZM8.76157 6.57654H6.56938V8.76872H5.47688V5.48044H8.76157V6.57654ZM13.1388 17.5303H12.0463V16.4306H13.1388V17.5303ZM13.1388 15.3381H10.9538V17.5303H9.85407V14.2456H13.1388V15.3381ZM17.5231 17.5303H14.2384V14.2456H17.5231V17.5303ZM17.5231 13.1459H16.4306V9.86123H17.5231V13.1459ZM17.5231 8.76872H14.2384V5.48044H17.5231V8.76872Z"
                    fill="white"
                  />
                  <path
                    d="M15.331 15.3345H16.4307V16.427H15.331V15.3345ZM15.331 6.57294H16.4307V7.66544H15.331V6.57294ZM6.5694 15.3345H7.66909V16.427H6.5694V15.3345ZM2.19222 20.8114H5.4769V21.9039H2.19222V20.8114ZM2.19222 1.09607H5.4769V2.18857H2.19222V1.09607ZM1.09253 17.5267H2.19222V20.8114H1.09253V17.5267ZM1.09253 2.18857H2.19222V5.48044H1.09253V2.18857Z"
                    fill="white"
                  />
                </svg>
                <span className="font-merriweather font-bold text-sm md:text-base lg:text-[15.926px] text-historic-cream">
                  Mulai Kuis
                </span>
              </Link>
            ) : (
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 md:px-10 lg:px-14 py-3 md:py-4 lg:py-5 bg-historic-brown-dark border-2 border-historic-brown rounded-lg shadow-lg hover:bg-historic-brown transition-colors"
              >
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.8078 17.5267H21.9075V20.8114H20.8078V17.5267ZM20.8078 2.18857H21.9075V5.48044H20.8078V2.18857ZM17.5231 1.09607H20.8078V2.18857H17.5231V1.09607ZM17.5231 20.8114H20.8078V21.9039H17.5231V20.8114ZM18.6156 4.38435H4.3772V18.6228H18.6156V4.38435ZM14.2384 9.86123H15.3309V13.1459H12.0463V12.0534H14.2384V9.86123ZM9.85407 5.48404H13.1388V6.57654H9.85407V5.48404ZM9.85407 7.66904H13.1388V10.9537H12.0463V8.76872H9.85407V7.66904ZM9.85407 9.86123H10.9538V13.1459H9.85407V9.86123ZM8.76157 17.5303H5.47688V14.2456H8.76157V17.5303ZM8.76157 12.0534H6.56938V13.1459H5.47688V9.86123H6.56938V10.9537H8.76157V12.0534ZM8.76157 9.86123H7.66907V7.66904H8.76157V9.86123ZM8.76157 6.57654H6.56938V8.76872H5.47688V5.48044H8.76157V6.57654ZM13.1388 17.5303H12.0463V16.4306H13.1388V17.5303ZM13.1388 15.3381H10.9538V17.5303H9.85407V14.2456H13.1388V15.3381ZM17.5231 17.5303H14.2384V14.2456H17.5231V17.5303ZM17.5231 13.1459H16.4306V9.86123H17.5231V13.1459ZM17.5231 8.76872H14.2384V5.48044H17.5231V8.76872Z"
                    fill="white"
                  />
                  <path
                    d="M15.331 15.3345H16.4307V16.427H15.331V15.3345ZM15.331 6.57294H16.4307V7.66544H15.331V6.57294ZM6.5694 15.3345H7.66909V16.427H6.5694V15.3345ZM2.19222 20.8114H5.4769V21.9039H2.19222V20.8114ZM2.19222 1.09607H5.4769V2.18857H2.19222V1.09607ZM1.09253 17.5267H2.19222V20.8114H1.09253V17.5267ZM1.09253 2.18857H2.19222V5.48044H1.09253V2.18857Z"
                    fill="white"
                  />
                </svg>
                <span className="font-merriweather font-bold text-sm md:text-base lg:text-[15.926px] text-historic-cream">
                  Mulai Kuis
                </span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-historic-brown dark:bg-gray-800 border-t-4 border-historic-brown-dark dark:border-gray-600 py-6 md:py-9 px-4 md:px-8 lg:px-36">
        <div className="max-w-6xl mx-auto text-center relative">
          {/* Logo */}
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c339a674deb6423c5cd64cac74684504d5ed5944?placeholderIfAbsent=true"
            alt="HISTORIC BLOCK"
            className="w-[62px] h-[62px] mx-auto mb-4"
          />

          <p className="font-merriweather text-historic-cream-light dark:text-gray-300 mb-6">
            Belajar sejarah dengan cara yang menyenangkan
          </p>

          {/* About Link */}
          <div className="mb-6">
            <Link
              to="/about"
              className="font-quicksand text-sm text-historic-cream-light dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors underline"
            >
              Tentang Tim Pengembang
            </Link>
          </div>

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

export default Index;
