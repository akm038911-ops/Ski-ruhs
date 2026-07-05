# Meta Mimarlık — Kurumsal Web Sitesi

Meta Mimarlık için hazırlanmış modern, duyarlı (responsive) ve tamamen statik tanıtım sitesi.

## Özellikler

- **Tek sayfa tasarım**: Ana sayfa (hero), istatistikler, projeler, hizmetler, hakkımızda, tasarım süreci, referanslar ve iletişim bölümleri
- **Proje filtreleme**: Konut / Ticari / Kamusal / İç Mekân kategorilerine göre filtreleme
- **Animasyonlar**: Kaydırmayla beliren içerikler ve sayaç animasyonları (`prefers-reduced-motion` desteğiyle)
- **Mobil uyumlu**: Hamburger menü ve tüm ekran boyutlarına uyumlu ızgara düzeni
- **Bağımlılık yok**: Saf HTML + CSS + JavaScript; framework, CDN veya harici font gerekmez

## Dosya Yapısı

```
index.html      # Tüm sayfa içeriği
css/style.css   # Stiller ve responsive kurallar
js/main.js      # Menü, filtreleme, animasyon ve form doğrulama
```

## Çalıştırma

Herhangi bir derleme adımı yoktur; `index.html` dosyasını tarayıcıda açmanız yeterlidir:

```bash
# veya basit bir yerel sunucuyla:
python3 -m http.server 8000
# http://localhost:8000
```

## Not

İletişim formu statik olduğundan veriler bir sunucuya gönderilmez. Canlıya alırken formu bir backend'e veya Formspree benzeri bir servise bağlayın.
