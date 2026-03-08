import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

export default function Admin() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Tarayıcının lokal hafızasından randevuları çekiyoruz
    const data = JSON.parse(localStorage.getItem('appointments') || '[]');
    setAppointments(data);
  }, []);

  const handleDelete = (id) => {
    const updated = appointments.filter(app => app.id !== id);
    setAppointments(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
  };

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '2rem' }}>Randevu Talepleri Yönetimi</h2>
        
        {appointments.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Henüz randevu talebi bulunmuyor.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Tarih</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Ad Soyad</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Telefon</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Lokasyon</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((app) => (
                  <tr key={app.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    <td style={{ padding: '1rem' }}>{app.date}</td>
                    <td style={{ padding: '1rem', fontWeight: '500' }}>{app.name}</td>
                    <td style={{ padding: '1rem' }}>{app.phone}</td>
                    <td style={{ padding: '1rem' }}>{app.location}</td>
                    <td style={{ padding: '1rem' }}>
                      <button 
                        onClick={() => handleDelete(app.id)} 
                        className="btn" 
                        style={{ padding: '0.5rem', color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                        title="Sil"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
