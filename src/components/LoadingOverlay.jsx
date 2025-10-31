import PropTypes from "prop-types";
import { Loader2, Sparkles } from "lucide-react";
import Progress from "./Progress";

/**
 * 加载遮罩组件
 * 显示模型下载和加载进度
 *
 * @param {boolean} isLoading - 是否显示加载遮罩
 * @param {Array} progressItems - 进度项列表
 */
const LoadingOverlay = ({ isLoading, progressItems }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center px-8 transition-all duration-500 ${
        isLoading
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      style={{
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(12px)",
      }}
    >
      {isLoading && (
        <div className="text-center animate-fade-in">
          <div className="mb-8 relative">
            <Loader2 className="w-16 h-16 text-blue-400 animate-spin mx-auto" />
            <div className="absolute inset-0 w-16 h-16 mx-auto">
              <div className="w-full h-full rounded-full border-4 border-blue-400 opacity-20 animate-pulse-ring"></div>
            </div>
          </div>
          <h2 className="text-white text-2xl font-bold mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6" />
            加载 AI 模型中...
          </h2>
          <p className="text-gray-300 text-sm mb-8">
            首次加载需要下载模型文件，请稍候（仅需一次）
          </p>
          <div className="space-y-4 max-w-2xl mx-auto">
            {progressItems.map((data) => (
              <div
                key={`${data.name}/${data.file}`}
                className="animate-slide-up"
              >
                <Progress
                  text={`${data.name}/${data.file}`}
                  percentage={data.progress}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

LoadingOverlay.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  progressItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      file: PropTypes.string,
      progress: PropTypes.number,
    })
  ),
};

LoadingOverlay.defaultProps = {
  progressItems: [],
};

export default LoadingOverlay;
