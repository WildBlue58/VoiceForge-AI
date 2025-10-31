import { useEffect, useRef } from "react";

const AudioPlayer = ({ audioUrl }) => {
  const audioPlayer = useRef(null);

  useEffect(() => {
    if (audioPlayer.current && audioUrl) {
      // 当以编程方式更新音频源时，必须调用 load() 才会真正加载
      audioPlayer.current.pause();
      audioPlayer.current.src = audioUrl;
      audioPlayer.current.load();
      audioPlayer.current.play().catch(() => {});
    }
  }, [audioUrl]);

  return (
    <div className="flex relative z-10 my-4 w-full">
      <audio
        ref={audioPlayer}
        controls
        className="w-full h-14 rounded-lg bg-white 
                shadow-xl shadow-black/5 ring-1 ring-slate-700/10"
      />
    </div>
  );
};

export default AudioPlayer;
