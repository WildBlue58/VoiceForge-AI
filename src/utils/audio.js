/**
 * 音频处理工具函数
 */

/**
 * 创建 Blob URL
 * @param {Blob} blob - Blob 对象
 * @returns {string} Blob URL
 */
export function createBlobUrl(blob) {
  if (!blob || !(blob instanceof Blob)) {
    throw new Error("无效的 Blob 对象");
  }
  return URL.createObjectURL(blob);
}

/**
 * 释放 Blob URL
 * @param {string} url - Blob URL
 */
export function revokeBlobUrl(url) {
  if (url && typeof url === "string" && url.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
}

/**
 * 格式化音频时长
 * @param {number} seconds - 秒数
 * @returns {string} 格式化的时间字符串 (mm:ss)
 */
export function formatDuration(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

/**
 * 下载音频文件
 * @param {string} url - 音频URL
 * @param {string} filename - 文件名
 */
export function downloadAudio(url, filename = "audio.wav") {
  if (!url) {
    throw new Error("无效的音频 URL");
  }

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * 生成音频文件名
 * @param {string} prefix - 文件名前缀
 * @param {string} extension - 文件扩展名
 * @returns {string}
 */
export function generateAudioFilename(prefix = "tts-audio", extension = "wav") {
  const timestamp = Date.now();
  const date = new Date().toISOString().split("T")[0];
  return `${prefix}-${date}-${timestamp}.${extension}`;
}

/**
 * 检查浏览器是否支持音频格式
 * @param {string} mimeType - MIME类型
 * @returns {boolean}
 */
export function isAudioFormatSupported(mimeType) {
  const audio = document.createElement("audio");
  return audio.canPlayType(mimeType) !== "";
}
