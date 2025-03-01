import React, { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = (): React.ReactElement => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <></>;
};

export default ScrollToTop;
