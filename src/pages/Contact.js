import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="container contact-page">
      <div className="contact-header">
        <h1>İletişim</h1>
        <p>Bize ulaşmak için aşağıdaki iletişim kanallarını kullanabilirsiniz.</p>
      </div>

      <div className="contact-cards">
        <div className="glass-card contact-card">
          <div className="icon-wrapper">
            <Phone size={24} />
          </div>
          <h3>Telefon</h3>
          <p>0 (850) 123 45 67</p>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>7/24 Çağrı Merkezi</span>
        </div>

        <div className="glass-card contact-card">
          <div className="icon-wrapper">
            <Mail size={24} />
          </div>
          <h3>E-Posta</h3>
          <p>info@saglikmerkezi.com</p>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Kurumsal İletişim</span>
        </div>

        <div className="glass-card contact-card">
          <div className="icon-wrapper">
            <MapPin size={24} />
          </div>
          <h3>Adres</h3>
          <p>Sağlık Mahallesi, Şifa Caddesi</p>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No: 1, İstanbul, TR</span>
        </div>
      </div>

      <div className="glass-card" style={{ marginTop: '2rem', padding: '2rem', textAlign: 'center' }}>
          <div className="icon-wrapper" style={{ margin: '0 auto 1rem' }}>
            <Clock size={24} />
          </div>
          <h3>Çalışma Saatleri</h3>
          <p style={{ marginTop: '0.5rem', marginBottom: '0.25rem' }}>Pazartesi - Cuma: 08:30 - 18:00</p>
          <p>Cumartesi: 09:00 - 13:00</p>
      </div>
    </div>
  );
}
