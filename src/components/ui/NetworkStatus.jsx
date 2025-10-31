import PropTypes from "prop-types";
import { WifiOff, Wifi } from "lucide-react";

/**
 * 网络状态提示组件
 * @param {boolean} isOnline - 是否在线
 * @param {boolean} wasOffline - 是否曾经离线
 */
const NetworkStatus = ({ isOnline, wasOffline }) => {
  // 如果一直在线且从未离线，不显示任何提示
  if (isOnline && !wasOffline) {
    return null;
  }

  // 显示离线警告
  if (!isOnline) {
    return (
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] animate-slide-down">
        <div className="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
          <WifiOff className="w-5 h-5" />
          <span className="font-semibold">网络已断开</span>
        </div>
      </div>
    );
  }

  // 显示重新连接提示（短暂显示）
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] animate-slide-down">
      <div className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
        <Wifi className="w-5 h-5" />
        <span className="font-semibold">网络已恢复</span>
      </div>
    </div>
  );
};

NetworkStatus.propTypes = {
  isOnline: PropTypes.bool.isRequired,
  wasOffline: PropTypes.bool.isRequired,
};

export default NetworkStatus;
