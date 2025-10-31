import { useEffect } from "react";
import PropTypes from "prop-types";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

/**
 * Toast 通知组件
 * @param {string} type - 通知类型: success, error, info
 * @param {string} message - 通知消息
 * @param {number} duration - 显示时长（毫秒）
 * @param {function} onClose - 关闭回调
 */
const Toast = ({ type = "info", message, duration = 3000, onClose }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const configs = {
    success: {
      icon: CheckCircle,
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
      textColor: "text-green-800",
    },
    error: {
      icon: AlertCircle,
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      iconColor: "text-red-600",
      textColor: "text-red-800",
    },
    info: {
      icon: Info,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      textColor: "text-blue-800",
    },
  };

  const config = configs[type] || configs.info;
  const Icon = config.icon;

  return (
    <div
      className={`fixed top-4 right-4 z-[9999] animate-slide-in-right max-w-md`}
      role="alert"
    >
      <div
        className={`${config.bgColor} ${config.borderColor} border-2 rounded-xl shadow-lg p-4 flex items-start gap-3`}
      >
        <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
        <p className={`${config.textColor} text-sm font-medium flex-1`}>
          {message}
        </p>
        {onClose && (
          <button
            onClick={onClose}
            className={`${config.iconColor} hover:opacity-70 transition-opacity flex-shrink-0`}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

Toast.propTypes = {
  type: PropTypes.oneOf(["success", "error", "info"]),
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
  onClose: PropTypes.func,
};

export default Toast;
