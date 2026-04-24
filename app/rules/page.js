export default function RulesPage() {
  return (
    <div className="rules-container">
      <h1 className="rules-title gradient-text">
        Rules Tournament
      </h1>

      <div className="rules-card">
        <h2>1. Format Turnamen</h2>
        <ul>
          <li>BO1 untuk penyisihan</li>
          <li>BO3 untuk Quarter final</li>
          <li>BO5 untuk Semi final & Grand final</li>
        </ul>
      </div>

      <div className="rules-card">
        <h2>2. Syarat Peserta</h2>
        <ul>
          <li>5 pemain inti + maksimal 2 cadangan</li>
          <li>Wajib menggunakan akun pribadi</li>
          <li className="rules-important">Dilarang akun joki</li>
          <li>Nickname harus sesuai pendaftaran</li>
        </ul>
      </div>

      <div className="rules-card">
        <h2>3. Jadwal & Kehadiran</h2>
        <ul>
          <li>Hadir 15 menit sebelum match</li>
          <li>Toleransi 10 menit</li>
          <li className="rules-important">Lewat = WO</li>
        </ul>
      </div>

      <div className="rules-card">
        <h2>4. Pengaturan Game</h2>
        <ul>
          <li>Server menyesuaikan ping terbaik</li>
          <li>Spectator hanya admin</li>
          <li>Pause max 2x per tim</li>
          <li>Durasi pause max 3 menit</li>
        </ul>
      </div>

      <div className="rules-card">
        <h2>5. Draft Pick</h2>
        <ul>
          <li>Sesuai sistem ranked terbaru</li>
          <li>Ban & pick mengikuti Moonton</li>
          <li className="rules-important">Dilarang bug exploit</li>
        </ul>
      </div>

      <div className="rules-card">
        <h2>6. Disqualification</h2>
        <ul>
          <li>Cheat / hack / script</li>
          <li>Emulator ilegal</li>
          <li>Match fixing</li>
          <li>Toxic berlebihan</li>
          <li>Stream sniping</li>
        </ul>
      </div>

      <div className="rules-card">
        <h2>7. Disconnect</h2>
        <ul>
          <li>{"<"} 5 menit → bisa remake</li>
          <li>{">"} 5 menit → lanjut</li>
          <li>Keputusan panitia final</li>
        </ul>
      </div>

      <div className="rules-card">
        <h2>8. Pemenang</h2>
        <ul>
          <li>Hancurkan base lawan</li>
          <li>Keputusan panitia mutlak</li>
        </ul>
      </div>

      <div className="rules-card">
        <h2>9. Fair Play</h2>
        <ul>
          <li>Wajib profesional</li>
          <li>Dilarang provokasi</li>
          <li>Keputusan admin final</li>
        </ul>
      </div>

      <div className="rules-card">
        <h2>10. Teknis Tambahan</h2>
        <ul>
          <li>Koneksi tanggung jawab pemain</li>
          <li>Wajib join grup resmi</li>
        </ul>
      </div>
    </div>
  );
}