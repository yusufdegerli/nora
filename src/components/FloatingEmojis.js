import React, { useMemo } from 'react';

const EMOJI_LIST = ['🩺', '💊', '🧬', '🩸', '🏥', '⚕️', '🩹', '🦷', '🚑', '💉', '🥼', '🔬'];

export default function FloatingEmojis() {
  const emojis = useMemo(() => {
    // 20 adet emojiyi ekranın yatay eksenine eşit aralıklarla (%5'lik dilimler halinde) dağıtıyoruz.
    return Array.from({ length: 20 }).map((_, i) => {
      const emoji = EMOJI_LIST[Math.floor(Math.random() * EMOJI_LIST.length)];
      
      // Ekrana simetrik (eşit aralıklarla) yayılmasını sağlıyoruz
      const left = `${(i * 5)}vw`; 
      
      // Hareket hızını yavaşlatıyoruz (30 ile 60 saniye arasında)
      const duration = 30 + Math.random() * 30; 
      const animationDuration = `${duration}s`; 
      
      // Sayfa ilk açıldığında hepsi aşağıda beklemek yerine 
      // farklı zaman dilimlerinden başlasın diye eksi bir delay veriyoruz.
      // Bu sayede dikey eksende de her tarafa dağılmış gibi gözükecekler.
      const animationDelay = `-${Math.random() * duration}s`; 
      
      const fontSize = `${1.5 + Math.random() * 2}rem`;
      const opacity = 0.15 + Math.random() * 0.25; 

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