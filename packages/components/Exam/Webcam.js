/** @format */

import React, { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';

const styles = {
  width: '100px',
  height: '100px',
  borderRadius: '50px',
  objectFit: 'cover',
};

const WebcamComponent = () => {
  const _ref = useRef(null);

  let _source;
  useEffect(() => {
    setInterval(() => {
      // _source = _ref.current.getScreenshot({ width: 1920, height: 1080 });
      // console.log(_source);
    }, 5000);
  }, []);

  return (
    <div className="d-flex justify-content-center mb-5">
      <Webcam ref={_ref} style={styles} screenshotFormat="image/jpeg" />
    </div>
  );
};

export default WebcamComponent;
