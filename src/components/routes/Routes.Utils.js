import { useEffect } from "react";
import { messaging } from "../../firebase";
import { getToken } from "firebase/messaging";

const RoutesUtils = () => {
  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BOwoIFMnQI3JF6Em-ivOKj0V8ifHVt5ekfxu4h_QzMrhGpke-TmVcWm7cmenX3juPQX6Ub7C9pWxvyppZbUlICw",
      });
      console.log("NOTIFICATION TOKEN", token);
    } else if (permission === "denied") {
      alert("You denied notification permission");
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return {};
};

export default RoutesUtils;
