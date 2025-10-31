import PropTypes from "prop-types";

/**
 * 文本输入区组件
 * 包含文本输入框、字符计数、超限提示
 *
 * @param {string} text - 当前文本
 * @param {Function} onChange - 文本变化回调
 * @param {Function} onKeyDown - 键盘事件回调
 * @param {boolean} disabled - 是否禁用
 * @param {number} maxLength - 最大字符数
 */
const TextInputSection = ({
  text,
  onChange,
  onKeyDown,
  disabled,
  maxLength,
}) => {
  const isOverLimit = text.length > maxLength;

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-6">
      <label
        htmlFor="text-input"
        className="block text-sm font-bold text-gray-700 mb-3 flex items-center justify-between"
      >
        <span>输入文本</span>
        <span className="text-xs text-gray-400 font-normal bg-gray-100 px-3 py-1 rounded-full">
          💡 Ctrl+Enter 快速生成
        </span>
      </label>
      <div className="relative group">
        <textarea
          id="text-input"
          className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 resize-none focus:ring-4 focus:ring-offset-0 shadow-sm hover:shadow-md ${
            isOverLimit
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50"
              : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white hover:border-gray-300"
          }`}
          style={{
            boxShadow: !isOverLimit
              ? "inset 0 2px 4px 0 rgba(0, 0, 0, 0.03)"
              : undefined,
          }}
          rows="5"
          placeholder="在此输入您想要转换的文本内容..."
          value={text}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
        />
        <div
          className={`absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm transition-all duration-300 ${
            isOverLimit
              ? "bg-red-100 text-red-600 ring-2 ring-red-300"
              : text.length > maxLength * 0.9
                ? "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-300"
                : "bg-blue-50 text-gray-500"
          }`}
        >
          {text.length} / {maxLength}
        </div>
      </div>
      {isOverLimit && (
        <div className="mt-3 p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg animate-slide-down">
          <p className="text-red-700 text-sm font-medium flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            文本超出最大长度限制，请删减后重试
          </p>
        </div>
      )}
    </div>
  );
};

TextInputSection.propTypes = {
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
};

TextInputSection.defaultProps = {
  disabled: false,
  maxLength: 1000,
};

export default TextInputSection;
