import { useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import AudioPlayer from "./components/AudioPlayer";
import Toast from "./components/ui/Toast";
import CompatibilityWarning from "./components/ui/CompatibilityWarning";
import NetworkStatus from "./components/ui/NetworkStatus";
import LoadingOverlay from "./components/LoadingOverlay";
import MainContentCard from "./components/MainContentCard";
import TextInputSection from "./components/TextInputSection";
import SpeakerSelector from "./components/SpeakerSelector";
import GenerateButton from "./components/GenerateButton";
import { DEFAULT_SPEAKER } from "./constants";
import { validateText } from "@utils/validation";
import { useCompatibilityCheck } from "@hooks/useCompatibilityCheck";
import { useNetworkStatus } from "@hooks/useNetworkStatus";
import { useAudioGenerator } from "@hooks/useAudioGenerator";

function App() {
  // 兼容性检查
  const { isCompatible, missingFeatures, isChecking } = useCompatibilityCheck();

  // 网络状态监控
  const { isOnline, wasOffline } = useNetworkStatus();

  // UI 状态
  const [text, setText] = useState("I love Xiangxiang!");
  const [selectedSpeaker, setSelectedSpeaker] = useState(DEFAULT_SPEAKER);
  const [toast, setToast] = useState(null);

  const maxLength = 1000;

  // Toast 回调
  const showToast = useCallback((type, message) => {
    setToast({ type, message });
  }, []);

  const handleSuccess = useCallback(
    (message) => showToast("success", message),
    [showToast]
  );
  const handleError = useCallback(
    (message) => showToast("error", message),
    [showToast]
  );
  const handleInfo = useCallback(
    (message) => showToast("info", message),
    [showToast]
  );

  // 音频生成逻辑
  const { ready, disabled, progressItems, output, isLoading, generateSpeech } =
    useAudioGenerator(isCompatible, handleSuccess, handleError, handleInfo);

  // 处理语音生成
  const handleGenerateSpeech = useCallback(() => {
    // 验证输入
    const validation = validateText(text, maxLength);

    if (!validation.isValid) {
      showToast("error", validation.error);
      return;
    }

    // 检查网络状态（首次加载需要网络）
    if (!isOnline && ready === null) {
      showToast("error", "首次使用需要网络连接来下载模型");
      return;
    }

    // 生成语音
    generateSpeech(text, selectedSpeaker);
  }, [
    text,
    selectedSpeaker,
    maxLength,
    ready,
    isOnline,
    generateSpeech,
    showToast,
  ]);

  // 处理键盘事件（支持 Ctrl+Enter 生成）
  const handleKeyDown = useCallback(
    (e) => {
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        handleGenerateSpeech();
      }
    },
    [handleGenerateSpeech]
  );

  // 验证状态
  const validation = validateText(text, maxLength);
  const isTextValid = validation.isValid;

  // 浏览器兼容性检查中
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">正在检查浏览器兼容性...</p>
        </div>
      </div>
    );
  }

  // 浏览器不兼容
  if (!isCompatible) {
    return <CompatibilityWarning missingFeatures={missingFeatures} />;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 animate-gradient-x p-4">
      {/* 网络状态提示 */}
      <NetworkStatus isOnline={isOnline} wasOffline={wasOffline} />

      {/* Toast 通知 */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* 加载遮罩 */}
      <LoadingOverlay isLoading={isLoading} progressItems={progressItems} />

      {/* 主内容卡片 */}
      <MainContentCard showFooter={!output} modelReady={ready}>
        {/* 文本输入区 */}
        <TextInputSection
          text={text}
          onChange={setText}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          maxLength={maxLength}
        />

        {/* 音色选择 */}
        <SpeakerSelector
          value={selectedSpeaker}
          onChange={setSelectedSpeaker}
          disabled={disabled}
        />

        {/* 生成按钮 */}
        <GenerateButton
          onClick={handleGenerateSpeech}
          disabled={disabled}
          isTextValid={isTextValid}
          isGenerating={disabled}
        />

        {/* 音频播放器 */}
        {output && (
          <div className="animate-slide-up">
            <AudioPlayer audioUrl={output} />
          </div>
        )}
      </MainContentCard>
    </div>
  );
}

export default App;
