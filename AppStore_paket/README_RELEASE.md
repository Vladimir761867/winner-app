# Как отправить «Победитель» в App Store

Здесь готово: игра (`www/`), иконки (`www/icons`, `store/AppIcon-1024.png`), Capacitor-обёртка для iOS, политика конфиденциальности, тексты магазина, скриншоты 6,7".
Собрать .ipa на этом сервере нельзя: для iOS нужен Mac с Xcode. Дальше — по шагам.

## Что нужно от вас
1. **Apple Developer Program** — $99/год (developer.apple.com/programs). Одобрение до 2 дней.
2. **Mac с Xcode 16+** (или Mac в аренду/облаке).
3. **Место для политики конфиденциальности** — публичная ссылка (GitHub Pages, Notion, сайт). Содержимое — `store/PRIVACY_POLICY.md`, впишите e-mail.
4. **Support URL** — любая страница/e-mail-форма.
5. **Свой Bundle ID**: замените `com.example.pobeditel` в `capacitor.config.json` на `com.ВАШЕ_ИМЯ.pobeditel`.

## Шаги на Mac
```
cd AppStore_paket
npm install
npx cap add ios
npm run assets      # иконки для iOS из assets/icon-only.png
npm run sync
npm run open        # откроется Xcode
```
В Xcode: Signing & Capabilities → ваша Team; в General: ориентации — Portrait + Landscape, Status bar hidden, Requires full screen. Product → Archive → Distribute App → App Store Connect.
В App Store Connect: создать приложение, вставить тексты из `store/STORE_LISTING.md`, загрузить скриншоты, указать URL политики, возраст 4+, цена — бесплатно, отправить на проверку (обычно 1–2 дня).

## Что я НЕ могу проверить отсюда (сделайте до отправки)
- Играть на настоящем iPhone 15–20 минут (звук, касания, нагрев, «челка»/Dynamic Island, переключение в фон).
- Баланс (−50% за удар, заряд супера, скорость) — подстроить по ощущениям тестеров.
- Тексты «Семья» и «Мама с детьми» — прочитать редактору.
- Графика нарисована кодом (стиль мультяшный, единый); для «топового» вида желательно заказать спрайты у художника — код рисования это заменит без переделки механики.
- Apple может отклонить «приложение-сайт» (guideline 4.2), если оно слишком простое; у нас полноценная игра с оффлайн-прогрессом, это учтено в Review Notes.
