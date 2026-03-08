import React, { useMemo } from 'react';

const EMOJI_LIST = ['🩺', '💊', '🧬', '🩸', '🏥', '⚕️', '🩹', '🦷', '🚑', '💉', '🥼', '🔬'];

export default function FloatingEmojis() {
  // Emojilerin özellikleri sadece bileşen ilk render edildiğinde oluşturulsun ki re-renderlarda zıplamasınlar
  const emojis = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => {
      const emoji = EMOJI_LIST[Math.floor(Math.random() * EMOJI_LIST.length)];
      const left = `${Math.random() * 100}vw`;
      const animationDuration = `${15 + Math.random() * 20}s`; // 15-35 saniye arası hız
      const animationDelay = `-${Math.random() * 20}s`; // Sayfa yüklenir yüklenmez ekranda olmaları için eksi delay
      const fontSize = `${1.5 + Math.random() * 1.5}rem`;
      const opacity = 0.1 + Math.random() * 0.3; // Yumuşak, arkaplanı boğmayan şeffaflık

      return {
        id: i,
        emoji,
        style: { left, animationDuration, animationDelay, fontSize, opacity }
      };
    });
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {emojis.map((item) => (
        <div key={item.id} className="floating-emoji" style={item.style}>
          {item.emoji}
        </div>
      ))}
    </div>
  );
}
