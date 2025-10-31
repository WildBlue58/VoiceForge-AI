import PropTypes from "prop-types";
import { SPEAKERS } from "../constants";

/**
 * 音色选择器组件
 * 自定义样式的下拉选择框
 *
 * @param {string} value - 当前选中的音色ID
 * @param {Function} onChange - 选择变化回调
 * @param {boolean} disabled - 是否禁用
 */
const SpeakerSelector = ({ value, onChange, disabled }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-8">
      <label
        htmlFor="speaker-select"
        className="block text-sm font-bold text-gray-700 mb-3"
      >
        选择音色
      </label>
      <div className="relative">
        <select
          id="speaker-select"
          className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 cursor-pointer appearance-none bg-white hover:border-gray-300 shadow-sm hover:shadow-md font-medium"
          style={{
            boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.03)",
          }}
          value={value}
          onChange={handleChange}
          disabled={disabled}
        >
          {Object.entries(SPEAKERS).map(([key, speakerValue]) => (
            <option key={key} value={speakerValue}>
              🎙️ {key}
            </option>
          ))}
        </select>
        {/* 自定义下拉箭头 */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

SpeakerSelector.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

SpeakerSelector.defaultProps = {
  disabled: false,
};

export default SpeakerSelector;
