import React, { useState } from 'react';
import { Send, MapPin, Phone, User, Crosshair } from 'lucide-react';

const ISTANBUL_ILCELER = [
  "Adalar", "Arnavutköy", "Ataşehir", "Avcılar", "Bağcılar", "Bahçelievler", "Bakırköy", 
  "Başakşehir", "Bayrampaşa", "Beşiktaş", "Beykoz", "Beylikdüzü", "Beyoğlu", "Büyükçekmece", 
  "Çatalca", "Çekmeköy", "Esenler", "Esenyurt", "Eyüpsultan", "Fatih", "Gaziosmanpaşa", 
  "Güngören", "Kadıköy", "Kağıthane", "Kartal", "Küçükçekmece", "Maltepe", "Pendik", 
  "Sancaktepe", "Sarıyer", "Silivri", "Sultanbeyli", "Sultangazi", "Şile", "Şişli", 
  "Tuzla", "Ümraniye", "Üsküdar", "Zeytinburnu"
];

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    ilce: '',
    mahalle: ''
  });
  const [isLocating, setIsLocating] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            
            if (data && data.address) {
              const district = data.address.county || data.address.suburb || data.address.town || '';
              const neighborhood = data.address.neighbourhood || data.address.village || '';
              
              // İstanbul ilçesi eşleşiyor mu kontrol et (büyük/küçük harf duyarsız)
              const matchedIlce = ISTANBUL_ILCELER.find(i => 
                district.toLocaleLowerCase('tr-TR').includes(i.toLocaleLowerCase('tr-TR')) || 
                i.toLocaleLowerCase('tr-TR').includes(district.toLocaleLowerCase('tr-TR'))
              );

              setFormData(prev => ({ 
                ...prev, 
                ilce: matchedIlce || prev.ilce, // Eğer bulamazsa eski halinde bırak
                mahalle: neighborhood || prev.mahalle 
              }));
            }
          } catch (error) {
            console.error("Konum çevirme hatası:", error);
          }
          setIsLocating(false);
        },
        (error) => {
          alert('Konum alınamadı. Lütfen tarayıcınızın konum izinlerini kontrol edin.');
          setIsLocating(false);
        }
      );
    } else {
      alert('Tarayıcınız konum özelliğini desteklemiyor.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const locationStr = `${formData.ilce} İlçesi, ${formData.mahalle} Mahallesi`;
    const newAppointment = { 
      id: Date.now(), 
      name: formData.name,
      phone: formData.phone,
      location: locationStr,
      date: new Date().toLocaleString('tr-TR') 
    };

    const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    localStorage.setItem('appointments', JSON.stringify([...existingAppointments, newAppointment]));

    alert('Bilgileriniz başarıyla alındı. Sizinle en kısa sürede iletişime geçeceğiz.');
    setFormData({ name: '', phone: '', ilce: '', mahalle: '' });
  };

  return (
    <div className="container hero-section">
      <div className="hero-content">
        <h1>Sağlığınız İçin<br/><span style={{ color: 'var(--primary)' }}>Doğru Adım</span></h1>
        <p>
          Uzman kadromuzla yanınızdayız. Randevu oluşturmak veya detaylı bilgi almak için 
          yandaki formu doldurun, size hemen ulaşalım.
        </p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--accent)' }}>✓</span> Hızlı Geri Dönüş
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--accent)' }}>✓</span> Güvenilir Hizmet
          </div>
        </div>
      </div>

      <div className="glass-panel glass-form-container">
        <div className="form-header">
          <h2>Sizi Arayalım</h2>
          <p>Sadece İstanbul içi hizmet vermekteyiz.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="name">Ad Soyad</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                id="name"
                name="name"
                className="form-input" 
                placeholder="Örn: Ahmet Yılmaz"
                style={{ paddingLeft: '2.5rem' }}
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="phone">Telefon Numarası</label>
            <div style={{ position: 'relative' }}>
              <Phone size={18} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="tel" 
                id="phone"
                name="phone"
                className="form-input" 
                placeholder="0 (5XX) XXX XX XX"
                style={{ paddingLeft: '2.5rem' }}
                value={formData.phone}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label className="form-label" style={{ marginBottom: 0 }}>Adres (İstanbul)</label>
              <button 
                type="button" 
                onClick={handleGetLocation}
                disabled={isLocating}
                style={{
                  background: 'none', border: 'none', color: 'var(--primary)', 
                  fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem',
                  fontWeight: '600'
                }}
              >
                <Crosshair size={14} />
                {isLocating ? 'Konum Bulunuyor...' : 'Konumumu Bul'}
              </button>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <MapPin size={18} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <select 
                  name="ilce" 
                  className="form-input" 
                  style={{ paddingLeft: '2.5rem', appearance: 'none' }}
                  value={formData.ilce}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>İlçe Seçin</option>
                  {ISTANBUL_ILCELER.map(ilce => (
                    <option key={ilce} value={ilce}>{ilce}</option>
                  ))}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <input 
                  type="text" 
                  name="mahalle"
                  className="form-input" 
                  placeholder="Mahalle"
                  value={formData.mahalle}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
            <Send size={18} />
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
}
