import React, { Fragment, useEffect } from 'react'

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Fragment></Fragment>
  )
}

export default ScrollToTop;