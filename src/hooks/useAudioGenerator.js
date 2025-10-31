import { useState, useRef, useEffect } from "react";
import { createBlobUrl, revokeBlobUrl } from "@utils/audio";

/**
 * 自定义 Hook - 音频生成器
 * 管理 Worker 和语音生成流程
 *
 * @param {boolean} isCompatible - 浏览器是否兼容
 * @param {Function} onSuccess - 成功回调
 * @param {Function} onError - 错误回调
 * @param {Function} onInfo - 信息回调
 * @returns {object} 音频生成器状态和方法
 */
export function useAudioGenerator(isCompatible, onSuccess, onError, onInfo) {
  // 状态管理
  const [ready, setReady] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [progressItems, setProgressItems] = useState([]);
  const [output, setOutput] = useState(null);

  // Worker 引用
  const worker = useRef(null);

  // 初始化 Worker
  useEffect(() => {
    if (!isCompatible) {
      return; // 浏览器不兼容时不初始化
    }

    try {
      worker.current = new Worker(new URL("../worker.js", import.meta.url), {
        type: "module",
      });

      const onMessageReceived = (e) => {
        switch (e.data.status) {
          case "initiate":
            setReady(false);
            setProgressItems((prev) => [...prev, e.data]);
            break;

          case "progress":
            setProgressItems((prev) =>
              prev.map((item) => {
                if (item.file === e.data.file) {
                  return {
                    ...item,
                    progress: e.data.progress,
                  };
                }
                return item;
              })
            );
            break;

          case "done":
            setProgressItems((prev) =>
              prev.filter((item) => item.file !== e.data.file)
            );
            break;

          case "ready":
            setReady(true);
            if (onSuccess) {
              onSuccess("模型加载完成！现在可以离线使用");
            }
            break;

          case "complete":
            setDisabled(false);
            try {
              const blobUrl = createBlobUrl(e.data.output);

              // 释放旧的 Blob URL
              if (output) {
                revokeBlobUrl(output);
              }

              setOutput(blobUrl);
              if (onSuccess) {
                onSuccess("语音生成成功！");
              }
            } catch (error) {
              console.error("创建音频失败:", error);
              if (onError) {
                onError("音频创建失败，请重试");
              }
              setDisabled(false);
            }
            break;

          case "error":
            setDisabled(false);
            console.error("Worker 错误:", e.data.error);
            if (onError) {
              onError(e.data.error || "语音生成失败，请重试");
            }
            break;

          default:
            break;
        }
      };

      worker.current.onmessage = onMessageReceived;

      // Worker 错误处理
      worker.current.onerror = (error) => {
        console.error("Worker 发生错误:", error);
        setDisabled(false);
        setReady(false);
        if (onError) {
          onError("AI 模型加载失败，请刷新页面重试");
        }
      };

      return () => {
        if (worker.current) {
          worker.current.terminate();
        }
      };
    } catch (error) {
      console.error("Worker 初始化失败:", error);
      if (onError) {
        onError("Worker 初始化失败");
      }
    }
  }, [isCompatible, onSuccess, onError, output]);

  // 清理 Blob URL
  useEffect(() => {
    return () => {
      if (output) {
        revokeBlobUrl(output);
      }
    };
  }, [output]);

  /**
   * 生成语音
   * @param {string} text - 文本内容
   * @param {string} speakerId - 音色ID
   */
  const generateSpeech = (text, speakerId) => {
    if (!worker.current) {
      if (onError) {
        onError("Worker 未初始化");
      }
      return;
    }

    if (!ready) {
      if (onInfo) {
        onInfo("模型正在加载中，请稍候...");
      }
      return;
    }

    setDisabled(true);

    try {
      worker.current.postMessage({
        text: text.trim(),
        speaker_id: speakerId,
      });
    } catch (error) {
      console.error("发送消息到 Worker 失败:", error);
      if (onError) {
        onError("发送请求失败，请重试");
      }
      setDisabled(false);
    }
  };

  return {
    ready,
    disabled,
    progressItems,
    output,
    isLoading: ready === false,
    generateSpeech,
  };
}
