import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Play, Pause, Volume2, Download } from "lucide-react";

/**
 * 现代化音频播放器组件
 * @param {string} audioUrl - 音频文件URL
 */
const AudioPlayer = ({ audioUrl }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current && audioUrl) {
      // 重置播放状态
      setIsPlaying(false);
      setCurrentTime(0);

      // 更新音频源
      audioRef.current.pause();
      audioRef.current.src = audioUrl;
      audioRef.current.load();

      // 自动播放
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  }, [audioUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = `tts-audio-${Date.now()}.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative w-full animate-slide-up">
      {/* 隐藏的原生audio元素 */}
      <audio ref={audioRef} />

      {/* 自定义播放器UI */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 shadow-lg border border-blue-100">
        {/* 标题 */}
        <div className="flex items-center gap-2 mb-4">
          <Volume2 className="w-5 h-5 text-blue-600" />
          <h3 className="text-sm font-semibold text-gray-700">生成的语音</h3>
        </div>

        {/* 进度条 */}
        <div
          className="relative w-full h-2 bg-gray-200 rounded-full cursor-pointer mb-4 group"
          onClick={handleSeek}
        >
          {/* 已播放进度 */}
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-150"
            style={{ width: `${progress}%` }}
          />

          {/* 进度指示点 */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `${progress}%`, transform: "translate(-50%, -50%)" }}
          />
        </div>

        {/* 控制栏 */}
        <div className="flex items-center justify-between">
          {/* 左侧：播放按钮和时间 */}
          <div className="flex items-center gap-4">
            {/* 播放/暂停按钮 */}
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            {/* 时间显示 */}
            <div className="text-sm font-medium text-gray-600 tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* 右侧：下载按钮 */}
          <button
            onClick={handleDownload}
            className="p-2.5 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors duration-200 group"
            title="下载音频"
          >
            <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
};

AudioPlayer.propTypes = {
  audioUrl: PropTypes.string.isRequired,
};

export default AudioPlayer;
