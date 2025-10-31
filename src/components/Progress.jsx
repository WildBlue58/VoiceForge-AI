import PropTypes from "prop-types";

/**
 * 现代化进度条组件
 * @param {string} text - 显示文本
 * @param {number} percentage - 进度百分比 (0-100)
 */
const Progress = ({ text, percentage = 0 }) => {
  return (
    <div className="relative w-full animate-slide-up">
      {/* 文本标签 */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-white/90 truncate">
          {text}
        </span>
        <span className="text-sm font-bold text-blue-400 ml-2">
          {percentage.toFixed(0)}%
        </span>
      </div>

      {/* 进度条容器 */}
      <div className="relative w-full h-3 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
        {/* 背景闪烁效果 */}
        <div
          className="absolute inset-0 animate-shimmer"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
            backgroundSize: "200% 100%",
          }}
        />

        {/* 实际进度条 */}
        <div
          className="relative h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full transition-all duration-300 ease-out shadow-lg shadow-blue-500/50"
          style={{
            width: `${Math.min(Math.max(percentage, 0), 100)}%`,
            backgroundSize: "200% 100%",
            animation: "gradient-x 2s ease infinite",
          }}
        >
          {/* 光晕效果 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
};

Progress.propTypes = {
  text: PropTypes.string.isRequired,
  percentage: PropTypes.number,
};

export default Progress;
