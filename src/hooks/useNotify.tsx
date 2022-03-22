import React, { useState } from "react";

const useNotify = () => {
  const [notification, setNotification] = useState<string | null>("");

  React.useEffect(() => {
    if (notification) {
      let timerFunc = setTimeout(() => {
        setNotification(null);
      }, 2000);
      return () => clearTimeout(timerFunc);
    }
  }, [notification]);

  return [
    notification ? (
      <div className="alert alert--success">{notification}</div>
    ) : null,
    (notification: string) => setNotification(notification),
    () => setNotification(null),
  ];
};

export default useNotify;
