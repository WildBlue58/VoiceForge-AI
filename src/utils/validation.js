/**
 * 输入验证工具函数
 */

/**
 * 验证文本输入
 * @param {string} text - 输入文本
 * @param {number} maxLength - 最大长度
 * @returns {{isValid: boolean, error: string|null, charCount: number}}
 */
export function validateText(text, maxLength = 1000) {
  if (!text || typeof text !== "string") {
    return {
      isValid: false,
      error: "请输入文本",
      charCount: 0,
    };
  }

  const trimmedText = text.trim();
  const charCount = text.length;

  if (trimmedText.length === 0) {
    return {
      isValid: false,
      error: "文本不能为空",
      charCount,
    };
  }

  if (charCount > maxLength) {
    return {
      isValid: false,
      error: `文本超出最大长度限制（${charCount}/${maxLength}）`,
      charCount,
    };
  }

  return {
    isValid: true,
    error: null,
    charCount,
  };
}

/**
 * 验证音色ID是否有效
 * @param {string} speakerId - 音色ID
 * @param {Object} speakers - 可用音色对象
 * @returns {boolean}
 */
export function isValidSpeakerId(speakerId, speakers) {
  if (!speakerId || !speakers) return false;
  return Object.values(speakers).includes(speakerId);
}

/**
 * 格式化字符计数显示
 * @param {number} current - 当前字符数
 * @param {number} max - 最大字符数
 * @returns {string}
 */
export function formatCharCount(current, max) {
  return `${current} / ${max}`;
}

/**
 * 检查字符数是否接近限制
 * @param {number} current - 当前字符数
 * @param {number} max - 最大字符数
 * @param {number} threshold - 警告阈值（百分比）
 * @returns {boolean}
 */
export function isNearLimit(current, max, threshold = 0.9) {
  return current / max > threshold;
}
