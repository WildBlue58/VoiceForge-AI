import { useState, useEffect } from "react";

/**
 * 网络状态监控 Hook
 * @returns {{isOnline: boolean, wasOffline: boolean}}
 */
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    // 在线状态处理
    const handleOnline = () => {
      setIsOnline(true);
      console.log("网络已连接");
    };

    // 离线状态处理
    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
      console.warn("网络已断开");
    };

    // 监听网络状态变化
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // 清理监听器
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return { isOnline, wasOffline };
}
