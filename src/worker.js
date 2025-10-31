import {
  env,
  Tensor,
  AutoTokenizer,
  SpeechT5ForTextToSpeech,
  SpeechT5HifiGan,
} from "@xenova/transformers";
import { encodeWAV } from "./utils/wav";

// 配置环境
env.allowLocalModels = false;

/**
 * 文本转语音 Pipeline 单例类
 * 采用单例模式确保模型只实例化一次，优化性能和内存使用
 */
class MyTextToSpeechPipeline {
  // 音色特征向量数据源
  static BASE_URL =
    "https://huggingface.co/datasets/Xenova/cmu-arctic-xvectors-extracted/resolve/main/";

  // 模型ID
  static model_id = "Xenova/speecht5_tts";
  static vocoder_id = "Xenova/speecht5_hifigan";

  // 单例实例
  static tokenizer_instance = null;
  static model_instance = null;
  static vocoder_instance = null;

  /**
   * 获取 Pipeline 实例（单例）
   * @param {Function} progress_callback - 下载进度回调
   * @returns {Promise<Array>} [tokenizer, model, vocoder]
   */
  static async getInstance(progress_callback = null) {
    try {
      // 初始化分词器
      if (this.tokenizer_instance === null) {
        this.tokenizer_instance = AutoTokenizer.from_pretrained(this.model_id, {
          progress_callback,
        });
      }

      // 初始化模型
      if (this.model_instance === null) {
        this.model_instance = SpeechT5ForTextToSpeech.from_pretrained(
          this.model_id,
          {
            dtype: "fp32",
            progress_callback,
          }
        );
      }

      // 初始化声码器
      if (this.vocoder_instance === null) {
        this.vocoder_instance = SpeechT5HifiGan.from_pretrained(
          this.vocoder_id,
          {
            dtype: "fp32",
            progress_callback,
          }
        );
      }

      // 等待所有实例加载完成
      const result = await Promise.all([
        this.tokenizer_instance,
        this.model_instance,
        this.vocoder_instance,
      ]);

      // 通知主线程模型已就绪
      self.postMessage({
        status: "ready",
      });

      return result;
    } catch (error) {
      console.error("模型初始化失败:", error);
      self.postMessage({
        status: "error",
        error: "模型加载失败: " + error.message,
      });
      throw error;
    }
  }

  /**
   * 获取说话人的嵌入向量
   * @param {string} speaker_id - 说话人ID
   * @returns {Promise<Tensor>} 说话人嵌入张量
   */
  static async getSpeakerEmbeddings(speaker_id) {
    try {
      const speaker_embeddings_url = `${this.BASE_URL}${speaker_id}.bin`;

      // 下载音色特征文件
      const response = await fetch(speaker_embeddings_url);

      if (!response.ok) {
        throw new Error(`下载音色文件失败: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();

      // 创建 512 维特征向量
      const speaker_embeddings = new Tensor(
        "float32",
        new Float32Array(arrayBuffer),
        [1, 512]
      );

      return speaker_embeddings;
    } catch (error) {
      console.error("获取音色特征失败:", error);
      throw new Error("音色文件加载失败: " + error.message);
    }
  }
}

// 音色特征缓存（避免重复下载）
const speaker_embeddings_cache = new Map();

/**
 * 处理主线程消息
 */
self.onmessage = async (e) => {
  try {
    // 验证输入数据
    if (!e.data || !e.data.text || !e.data.speaker_id) {
      throw new Error("无效的输入数据");
    }

    const { text, speaker_id } = e.data;

    // 验证文本
    if (typeof text !== "string" || text.trim().length === 0) {
      throw new Error("文本不能为空");
    }

    // 验证文本长度
    if (text.length > 1000) {
      throw new Error("文本长度超出限制");
    }

    // 初始化 Pipeline
    const [tokenizer, model, vocoder] =
      await MyTextToSpeechPipeline.getInstance((progress) => {
        self.postMessage(progress);
      });

    // 文本分词
    const { input_ids } = tokenizer(text.trim());

    if (!input_ids || input_ids.size === 0) {
      throw new Error("文本分词失败");
    }

    // 获取或下载音色特征
    let speaker_embeddings = speaker_embeddings_cache.get(speaker_id);

    if (speaker_embeddings === undefined) {
      speaker_embeddings =
        await MyTextToSpeechPipeline.getSpeakerEmbeddings(speaker_id);
      speaker_embeddings_cache.set(speaker_id, speaker_embeddings);
    }

    // 生成语音
    const { waveform } = await model.generate_speech(
      input_ids,
      speaker_embeddings,
      { vocoder }
    );

    if (!waveform || !waveform.data) {
      throw new Error("语音生成失败");
    }

    // 编码为 WAV 格式
    const wav = encodeWAV(waveform.data);

    // 返回结果
    self.postMessage({
      status: "complete",
      output: new Blob([wav], {
        type: "audio/wav",
      }),
    });
  } catch (error) {
    console.error("Worker 错误:", error);

    // 发送错误消息到主线程
    self.postMessage({
      status: "error",
      error: error.message || "未知错误",
    });
  }
};

/**
 * 处理 Worker 错误
 */
self.onerror = (error) => {
  console.error("Worker 全局错误:", error);
  self.postMessage({
    status: "error",
    error: "Worker 发生严重错误",
  });
};

/**
 * Worker 启动时自动预加载模型
 * 这样用户不需要等待第一次点击时才开始加载
 */
(async () => {
  try {
    // 预加载模型（后台静默加载）
    await MyTextToSpeechPipeline.getInstance((progress) => {
      self.postMessage(progress);
    });
  } catch (error) {
    console.error("模型预加载失败:", error);
    // 错误会在用户实际使用时再处理
  }
})();
