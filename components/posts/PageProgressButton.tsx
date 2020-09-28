import React, { useEffect, useRef, useState, useCallback } from 'react';
export const PageProgressButton = () => {
  const progressSettingInProcess = useRef(null);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    updatePageProgress();

    window.addEventListener('scroll', updatePageProgress);

    return () => {
      cancelAnimationFrame(progressSettingInProcess.current);
      window.removeEventListener('scroll', updatePageProgress);
    };
  }, []);

  const handleScrollToTopClick = useCallback(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  const updatePageProgress = useCallback(() => {
    if (!progressSettingInProcess.current) {
      progressSettingInProcess.current = requestAnimationFrame(() => {
        const { documentElement } = document;

        const percent = Math.ceil(
          (documentElement.scrollTop /
            (documentElement.scrollHeight - documentElement.clientHeight)) *
            100
        );

        setProgress(101.788 - (percent / 100) * 101.788);

        progressSettingInProcess.current = null;
      });
    }
  }, []);

  return (
    <button
      className="m-icon-button filled in-share progress js-scrolltop"
      onClick={handleScrollToTopClick}
    >
      <span className="icon-arrow-top" aria-hidden="true"></span>
      <svg aria-hidden="true" viewBox="0 0 32.4 32.4" style={{ opacity: 1 }}>
        <circle
          className="progress-ring__circle js-progress"
          fill="transparent"
          r="14.2"
          strokeWidth="3"
          cx="16.2"
          cy="16.2"
          style={{
            strokeDasharray: '101.788px, 101.788px',
            strokeDashoffset: progress,
          }}
        ></circle>
      </svg>
    </button>
  );
};

export default PageProgressButton;
