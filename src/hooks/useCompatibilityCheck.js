import { useState, useEffect } from "react";
import { checkBrowserCompatibility } from "@utils/browser";

/**
 * 浏览器兼容性检查 Hook
 * @returns {{isCompatible: boolean, missingFeatures: string[], isChecking: boolean}}
 */
export function useCompatibilityCheck() {
  const [state, setState] = useState({
    isCompatible: true,
    missingFeatures: [],
    isChecking: true,
  });

  useEffect(() => {
    // 检查浏览器兼容性
    const checkCompatibility = () => {
      try {
        const result = checkBrowserCompatibility();
        setState({
          isCompatible: result.isCompatible,
          missingFeatures: result.missingFeatures,
          isChecking: false,
        });

        // 如果不兼容，在控制台输出警告
        if (!result.isCompatible) {
          console.warn("浏览器不支持以下功能:", result.missingFeatures);
        }
      } catch (error) {
        console.error("兼容性检查失败:", error);
        setState({
          isCompatible: false,
          missingFeatures: ["未知错误"],
          isChecking: false,
        });
      }
    };

    checkCompatibility();
  }, []);

  return state;
}
