import PropTypes from "prop-types";
import { AlertTriangle } from "lucide-react";

/**
 * 浏览器兼容性警告组件
 * @param {Array} missingFeatures - 缺失的功能列表
 */
const CompatibilityWarning = ({ missingFeatures }) => {
  if (!missingFeatures || missingFeatures.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full animate-scale-in">
        {/* 警告图标 */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        {/* 标题 */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          浏览器兼容性警告
        </h2>

        {/* 说明 */}
        <p className="text-gray-600 mb-6 text-center">
          您的浏览器缺少以下必需功能，应用可能无法正常工作：
        </p>

        {/* 缺失功能列表 */}
        <ul className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 space-y-2">
          {missingFeatures.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-yellow-800"
            >
              <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full flex-shrink-0" />
              <span className="font-medium">{feature}</span>
            </li>
          ))}
        </ul>

        {/* 建议 */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-700 font-semibold mb-2">
            💡 建议操作：
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 升级到最新版本的浏览器</li>
            <li>• 使用 Chrome、Firefox、Edge 或 Safari</li>
            <li>• 检查浏览器设置是否禁用了某些功能</li>
          </ul>
        </div>

        {/* 继续按钮 */}
        <button
          onClick={() => window.location.reload()}
          className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          刷新页面重试
        </button>
      </div>
    </div>
  );
};

CompatibilityWarning.propTypes = {
  missingFeatures: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CompatibilityWarning;
