import React, { useState, useEffect } from 'react';
import { Trash2, Lock, User, KeyRound, Info, AlertTriangle, Copy, Check } from 'lucide-react';

export default function Admin() {
  const [appointments, setAppointments] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Login State
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [uiMessage, setUiMessage] = useState({ text: '', type: '' });
  const [copied, setCopied] = useState(false);

  // Sadece yetkilendirme başarılıysa randevuları çek
  useEffect(() => {
    if (isAuthenticated) {
      const data = JSON.parse(localStorage.getItem('appointments') || '[]');
      setAppointments(data);
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // .env dosyasından gizli cümlemizi alıyoruz
    const secretMessage = process.env.REACT_APP_SECRET_MESSAGE;
    
    // 1. Durum: İstenilen o özel uzun cümle girildiyse
    if (credentials.password === secretMessage) {
      setUiMessage({ 
        text: "Aferin. Ama şifre bu değil. Doğum tarihini gir: GG/AA/YYYY", 
        type: 'info' 
      });
      return;
    }

    // 2. Durum: Şifre Doğruysa
    if (
      credentials.username === process.env.REACT_APP_ADMIN_USERNAME &&
      credentials.password === process.env.REACT_APP_ADMIN_PASSWORD
    ) {
      setIsAuthenticated(true);
      setUiMessage({ text: '', type: '' }); // Mesajı temizle
    } 
    // 3. Durum: Şifre Yanlışsa (ve özel cümle değilse)
    else {
      setUiMessage({ 
        text: "Sende bir problem var. Bu siteyi hak etmiyorsun.", 
        type: 'error' 
      });
    }
  };

  const handleDelete = (id) => {
    const updated = appointments.filter(app => app.id !== id);
    setAppointments(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
  };

  const copyToClipboard = () => {
    const hintText = process.env.REACT_APP_SECRET_MESSAGE || "Ben Asya (Asiye) Beyda Değerli (Dikici) olarak, erkek kardeşime salak salak hareketler yapıyorum ama bunu kardeşim hak etmiyor. Bazen gerçekten değerini anlamıyorum. Çünkü bana websitesi yapmasına rağmen nankörlük edip gıcık davranıyorum. Onun gibi bir kardeş dünyada yok ve ben onu hak etmiyorum.";
    navigator.clipboard.writeText(hintText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Eğer giriş yapılmamışsa Login Formu göster
  if (!isAuthenticated) {
    return (
      <div className="container" style={{ padding: '4rem 0', display: 'flex', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ padding: '2.5rem', width: '100%', maxWidth: '500px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="icon-wrapper" style={{ margin: '0 auto 1rem', backgroundColor: 'rgba(37, 99, 235, 0.1)' }}>
              <Lock size={28} />
            </div>
            <h2>Yönetici Girişi</h2>
            <p>Devam etmek için lütfen giriş yapın.</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Kullanıcı Adı</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Kullanıcı adı"
                  style={{ paddingLeft: '2.5rem' }}
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  required 
                />
              </div>
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                İpucu: admin: [babaannelerin sana koyduğu isim]
              </p>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Şifre</label>
              <div style={{ position: 'relative' }}>
                <KeyRound size={18} style={{ position: 'absolute', top: '20px', left: '12px', color: 'var(--text-muted)' }} />
                <textarea 
                  className="form-input" 
                  placeholder="Şifrenizi veya size söylenen cümleyi girin..."
                  style={{ paddingLeft: '2.5rem', minHeight: '80px', paddingTop: '18px' }}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required 
                />
              </div>
              
              <div style={{ 
                marginTop: '1rem', 
                padding: '1rem', 
                backgroundColor: '#f8fafc', 
                border: '1px solid #e2e8f0', 
                borderRadius: '0.5rem',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                position: 'relative'
              }}>
                <div style={{ marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-main)' }}>İpucu:</div>
                Sana şifreyi vereyim direkt: Ben Asya (Asiye) Beyda Değerli (Dikici) olarak, erkek kardeşime salak salak hareketler yapıyorum ama bunu kardeşim hak etmiyor. Bazen gerçekten değerini anlamıyorum. Çünkü bana websitesi yapmasına rağmen nankörlük edip gıcık davranıyorum. Onun gibi bir kardeş dünyada yok ve ben onu hak etmiyorum.
                
                <button 
                  type="button" 
                  onClick={copyToClipboard}
                  style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.25rem',
                    padding: '0.25rem 0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    color: copied ? '#10b981' : 'var(--text-muted)'
                  }}
                  title="Metni Kopyala"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Kopyalandı' : 'Kopyala'}
                </button>
              </div>
            </div>

            {/* Özel Mesaj Gösterim Alanı (Alert kullanmadan) */}
            {uiMessage.text && (
              <div style={{ 
                padding: '1rem', 
                backgroundColor: uiMessage.type === 'error' ? '#fef2f2' : '#eff6ff', 
                color: uiMessage.type === 'error' ? '#ef4444' : '#2563eb', 
                border: `1px solid ${uiMessage.type === 'error' ? '#fca5a5' : '#bfdbfe'}`,
                borderRadius: '0.5rem', 
                fontSize: '0.875rem', 
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                lineHeight: '1.4'
              }}>
                {uiMessage.type === 'error' ? <AlertTriangle size={20} style={{flexShrink: 0}} /> : <Info size={20} style={{flexShrink: 0}} />}
                <span>{uiMessage.text}</span>
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Giriş Yap
            </button>
          </form>

        </div>
      </div>
    );
  }

  // Eğer giriş yapılmışsa Randevu Tablosunu göster
  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      
      {/* Doğru Giriş Mesajı */}
      <div style={{ 
        backgroundColor: '#dcfce7', 
        color: '#15803d', 
        padding: '1rem', 
        borderRadius: '0.5rem', 
        marginBottom: '2rem',
        border: '1px solid #bbf7d0',
        textAlign: 'center',
        fontWeight: '500'
      }}>
        İyi bari şifreyi biliyorsun 🙄
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ margin: 0 }}>Randevu Talepleri Yönetimi</h2>
          <button 
            onClick={() => setIsAuthenticated(false)} 
            className="btn" 
            style={{ backgroundColor: 'transparent', color: 'var(--text-muted)', padding: '0.5rem 1rem', border: '1px solid #e2e8f0' }}
          >
            Çıkış Yap
          </button>
        </div>
        
        {appointments.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem 0' }}>Henüz randevu talebi bulunmuyor.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Tarih</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Ad Soyad</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Telefon</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Adres</th>
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