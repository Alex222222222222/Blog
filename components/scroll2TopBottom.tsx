/**
 * Scroll to top button
 *
 * A button that appears when the user scrolls down the page. When clicked, it scrolls the page to the top.
 */

import { useState, useEffect } from "react";

const scroll2TopBottom: React.FC = () => {
  const [isTopVisible, setIsTopVisible] = useState(false);
  const [isBottomVisible, setIsBottomVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleTopVisibility = () => {
    if (window.scrollY > 300) {
      setIsTopVisible(true);
    } else {
      setIsTopVisible(false);
    }
  };

  // show button when page is scrolled down to given distance
  const toggleBottomVisibility = () => {
    const totalPageHeight = document.documentElement.scrollHeight;
    const scrolledHeight = window.scrollY + window.innerHeight;
    if (totalPageHeight - scrolledHeight > 300) {
      setIsBottomVisible(true);
    } else {
      setIsBottomVisible(false);
    }
  };

  // Set the top coordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Set the bottom coordinate to total page height
  // make scrolling smooth
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleTopVisibility);
    window.addEventListener("scroll", toggleBottomVisibility);
    return () => {
      window.removeEventListener("scroll", toggleTopVisibility);
      window.addEventListener("scroll", toggleBottomVisibility);
    };
  }, []);

  // <span className="w-9 px-2 pt-1 bg-blue-500 text-white rounded-full text-3xl">&uarr;</span>

  return (
    <div className="sticky mb-7 bottom-7 cursor-pointer flex flex-row">
      <div className="grow"></div>
      {/* <span className="w-9 px-2 pt-1 bg-blue-500 text-white rounded-full text-3xl">&uarr;</span> */}
      {/* Use svg icon (/public/scroll2top.svg) instead */}
      {isTopVisible && (
        <img
          src="/scroll2top.svg"
          alt="Scroll to top"
          className="w-10 bg-white rounded-full text-blue-500"
          onClick={scrollToTop}
        />
      )}
      {isTopVisible && isBottomVisible && <div className="w-2"></div>}
      {/* Scroll to button svg is upside down of scroll to top svg */}
      {isBottomVisible && (
        <img
          src="/scroll2top.svg"
          alt="Scroll to bottom"
          className="w-10 bg-white rounded-full text-blue-500 transform rotate-180"
          onClick={scrollToBottom}
        />
      )}
    </div>
  );
};

export default scroll2TopBottom;
