import { useCallback, useRef } from "react";
import { VoiceEvent } from "chat-bot-rtvi-client";
import { useVoiceClientEvent } from "chat-bot-rtvi-web-react";

import styles from "./styles.module.css";

export const AudioIndicatorBar: React.FC = () => {
  const volRef = useRef<HTMLDivElement>(null);

  useVoiceClientEvent(
    VoiceEvent.LocalAudioLevel,
    useCallback((volume: number) => {
      if (volRef.current)
        volRef.current.style.width = Math.max(2, volume * 100) + "%";
    }, [])
  );

  return (
    <div className={styles.bar}>
      <div ref={volRef} />
    </div>
  );
};

export default AudioIndicatorBar;
