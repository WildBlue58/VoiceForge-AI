import PropTypes from "prop-types";
import { Volume2 } from "lucide-react";

/**
 * 主内容卡片组件
 * 包含Logo、标题和内容区域
 *
 * @param {ReactNode} children - 子组件
 * @param {string} title - 主标题
 * @param {string} subtitle - 副标题
 * @param {boolean} showFooter - 是否显示底部提示
 * @param {boolean} modelReady - 模型是否就绪
 */
const MainContentCard = ({
  children,
  title,
  subtitle,
  showFooter,
  modelReady,
}) => {
  return (
    <div className="w-full max-w-2xl animate-scale-in">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/20 p-8 md:p-10 border border-white/20 hover:shadow-blue-500/30 transition-all duration-300">
        {/* 标题区域 */}
        <div className="text-center mb-10">
          <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 rounded-3xl mb-5 shadow-2xl shadow-blue-500/40 animate-float">
            <Volume2 className="w-10 h-10 text-white" />
            {/* 脉动光环 */}
            <div className="absolute inset-0 rounded-3xl bg-blue-400 opacity-20 animate-pulse-ring"></div>
          </div>
          <h1 className="text-5xl font-extrabold text-gradient mb-3 tracking-tight">
            {title}
          </h1>
          <p className="text-gray-500 text-base font-medium">{subtitle}</p>
        </div>

        {/* 内容区域 */}
        {children}

        {/* 底部提示 */}
        {showFooter && modelReady && (
          <div className="text-center text-gray-500 text-sm animate-fade-in">
            <p>✨ 模型已加载，支持离线使用</p>
          </div>
        )}
      </div>

      {/* 底部说明 */}
      <div className="mt-8 text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full shadow-lg border border-white/40">
          <span className="text-gray-600 text-sm">采用</span>
          <a
            href="https://huggingface.co/docs/transformers.js"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-bold text-sm transition-colors duration-200 hover:underline"
          >
            Transformer.js
          </a>
          <span className="text-gray-400">·</span>
          <span className="text-gray-600 text-sm">浏览器端AI</span>
          <span className="text-gray-400">·</span>
          <span className="text-gray-600 text-sm">隐私安全</span>
        </div>
      </div>
    </div>
  );
};

MainContentCard.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  showFooter: PropTypes.bool,
  modelReady: PropTypes.bool,
};

MainContentCard.defaultProps = {
  title: "声铸 VoiceForge",
  subtitle: "AI驱动的浏览器端语音铸造工坊 · 零服务器 · 完全离线",
  showFooter: true,
  modelReady: false,
};

export default MainContentCard;
