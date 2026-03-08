import React, { useState } from 'react';
import { Send, MapPin, Phone, User, Crosshair } from 'lucide-react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: ''
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
            // Açık kaynaklı Nominatim API kullanarak koordinatı adres (şehir/ilçe) bilgisine çeviriyoruz
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            
            if (data && data.address) {
              const city = data.address.city || data.address.town || data.address.province || '';
              const district = data.address.county || data.address.suburb || '';
              const locationStr = `${city} ${district}`.trim() || data.display_name;
              setFormData(prev => ({ ...prev, location: locationStr }));
            } else {
              setFormData(prev => ({ ...prev, location: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}` }));
            }
          } catch (error) {
            setFormData(prev => ({ ...prev, location: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}` }));
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
    
    // Form verisini oluştur ve ID, Tarih ekle
    const newAppointment = { 
      ...formData, 
      id: Date.now(), 
      date: new Date().toLocaleString('tr-TR') 
    };

    // Mevcut randevuları çek ve yenisini ekle
    const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    localStorage.setItem('appointments', JSON.stringify([...existingAppointments, newAppointment]));

    alert('Bilgileriniz başarıyla alındı. Sizinle en kısa sürede iletişime geçeceğiz.');
    setFormData({ name: '', phone: '', location: '' });
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
          <p>İletişim bilgilerinizi bırakın.</p>
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
              <label className="form-label" htmlFor="location" style={{ marginBottom: 0 }}>Lokasyon</label>
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
            
            <div style={{ position: 'relative' }}>
              <MapPin size={18} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                id="location"
                name="location"
                className="form-input" 
                placeholder="İl / İlçe"
                style={{ paddingLeft: '2.5rem' }}
                value={formData.location}
                onChange={handleChange}
                required 
              />
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