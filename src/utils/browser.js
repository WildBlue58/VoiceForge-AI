/**
 * 浏览器兼容性检测工具
 */

/**
 * 检查浏览器是否支持 Web Worker
 * @returns {boolean}
 */
export function isWebWorkerSupported() {
  return typeof Worker !== "undefined";
}

/**
 * 检查浏览器是否支持 AudioContext
 * @returns {boolean}
 */
export function isAudioContextSupported() {
  return (
    typeof (window.AudioContext || window.webkitAudioContext) !== "undefined"
  );
}

/**
 * 检查浏览器是否支持 IndexedDB
 * @returns {boolean}
 */
export function isIndexedDBSupported() {
  return typeof indexedDB !== "undefined";
}

/**
 * 检查浏览器是否支持 Blob
 * @returns {boolean}
 */
export function isBlobSupported() {
  return typeof Blob !== "undefined";
}

/**
 * 检查所有必需的浏览器功能
 * @returns {{isCompatible: boolean, missingFeatures: string[]}}
 */
export function checkBrowserCompatibility() {
  const features = {
    "Web Worker": isWebWorkerSupported(),
    AudioContext: isAudioContextSupported(),
    IndexedDB: isIndexedDBSupported(),
    Blob: isBlobSupported(),
  };

  const missingFeatures = Object.entries(features)
    .filter(([, supported]) => !supported)
    .map(([feature]) => feature);

  return {
    isCompatible: missingFeatures.length === 0,
    missingFeatures,
  };
}

/**
 * 获取浏览器信息
 * @returns {{name: string, version: string}}
 */
export function getBrowserInfo() {
  const ua = navigator.userAgent;
  let name = "Unknown";
  let version = "Unknown";

  if (ua.indexOf("Firefox") > -1) {
    name = "Firefox";
    version = ua.match(/Firefox\/(\d+\.\d+)/)?.[1] || version;
  } else if (ua.indexOf("Chrome") > -1) {
    name = "Chrome";
    version = ua.match(/Chrome\/(\d+\.\d+)/)?.[1] || version;
  } else if (ua.indexOf("Safari") > -1) {
    name = "Safari";
    version = ua.match(/Version\/(\d+\.\d+)/)?.[1] || version;
  } else if (ua.indexOf("Edge") > -1 || ua.indexOf("Edg") > -1) {
    name = "Edge";
    version = ua.match(/Edg\/(\d+\.\d+)/)?.[1] || version;
  }

  return { name, version };
}

/**
 * 检查设备内存
 * @returns {number|null} 设备内存（GB），如果不支持返回 null
 */
export function getDeviceMemory() {
  return navigator.deviceMemory || null;
}

/**
 * 检查网络连接状态
 * @returns {boolean}
 */
export function isOnline() {
  return navigator.onLine;
}

/**
 * 检查是否为移动设备
 * @returns {boolean}
 */
export function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
