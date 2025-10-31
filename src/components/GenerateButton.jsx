import PropTypes from "prop-types";
import { Loader2, Volume2 } from "lucide-react";

/**
 * 生成语音按钮组件
 * 带光效和动画的操作按钮
 *
 * @param {Function} onClick - 点击回调
 * @param {boolean} disabled - 是否禁用
 * @param {boolean} isTextValid - 文本是否有效
 * @param {boolean} isGenerating - 是否正在生成
 */
const GenerateButton = ({ onClick, disabled, isTextValid, isGenerating }) => {
  const isButtonDisabled = disabled || !isTextValid;

  return (
    <div className="flex justify-center mb-8">
      <button
        onClick={onClick}
        disabled={isButtonDisabled}
        className={`relative px-10 py-5 rounded-2xl font-bold text-white text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden ${
          isButtonDisabled
            ? "bg-gray-400 cursor-not-allowed shadow-gray-400/30"
            : "bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-600 hover:shadow-blue-500/60 hover:-translate-y-1"
        }`}
      >
        {/* 按钮光效 */}
        {!isButtonDisabled && (
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
            style={{ backgroundSize: "200% 100%" }}
          />
        )}
        {isGenerating ? (
          <span className="flex items-center gap-3 relative z-10">
            <Loader2 className="w-6 h-6 animate-spin" />
            生成中...
          </span>
        ) : (
          <span className="flex items-center gap-3 relative z-10">
            <Volume2 className="w-6 h-6" />
            生成语音
          </span>
        )}
      </button>
    </div>
  );
};

GenerateButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isTextValid: PropTypes.bool,
  isGenerating: PropTypes.bool,
};

GenerateButton.defaultProps = {
  disabled: false,
  isTextValid: true,
  isGenerating: false,
};

export default GenerateButton;
