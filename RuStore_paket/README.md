# Публикация в RuStore — «Победитель» и «Победитель Junior»

Ветка `rustore`. Что уже готово в репозитории и что нужно сделать вам.

## Уже готово
- Android-проекты обеих игр (`capacitor/pobeditel`, `capacitor/junior`), targetSdk 36, minSdk 24 (Android 7+).
- Во взрослой игре платежи идут через **RuStore Pay SDK** (плагин `RuStorePayPlugin.kt`); Google Play Billing из этой ветки убран. В Junior покупок за деньги нет.
- Сборка: GitHub → Actions → «RuStore — сборка APK». Без ключа подписи собирается тестовый APK, с ключом — подписанный release для загрузки в RuStore.
- Материалы карточек: `pobeditel/` и `junior/` — иконка 512×512, скриншоты 1920×1080, тексты (`LISTING.md`), товары (`pobeditel/PRODUCTS.md`).

## Что сделать вам (по порядку)
1. **Аккаунт разработчика**: https://console.rustore.ru → войти через VK ID → создать компанию. Для встроенных покупок нужна подключённая монетизация (договор и реквизиты: самозанятый, ИП или юрлицо) — уточните условия в Консоли, раздел «Монетизация». Junior можно публиковать и без монетизации.
2. **Ключ подписи** (один раз, хранить вечно — без него нельзя выпускать обновления). На компьютере с Java:
   ```
   keytool -genkeypair -v -keystore pobeditel-release.jks -alias pobeditel -keyalg RSA -keysize 2048 -validity 10000
   ```
   Затем в PowerShell: `[Convert]::ToBase64String([IO.File]::ReadAllBytes("pobeditel-release.jks")) | Set-Clipboard`
   GitHub → репозиторий → Settings → Secrets and variables → Actions → **Secrets**:
   `KEYSTORE_BASE64` (из буфера), `KEYSTORE_PASSWORD`, `KEY_ALIAS` (= `pobeditel`), `KEY_PASSWORD`.
3. **Создать приложения в Консоли** («Добавить приложение»): имена пакетов `ru.pobeditel.game` и `ru.pobeditel.junior`. Имя пакета после первой загрузки поменять нельзя.
4. **ID приложения для платежей** (только взрослая): в адресе страницы приложения в Консоли — число после `apps/`. GitHub → Settings → Secrets and variables → Actions → **Variables** → `RUSTORE_APP_ID` = это число.
5. **Товары** (только взрослая): Консоль → приложение → Монетизация → Продукты → создать 10 разовых товаров по таблице `pobeditel/PRODUCTS.md`.
6. **Собрать APK**: Actions → «RuStore — сборка APK» → Run workflow (ветка `rustore`) → скачать `pobeditel-rustore-apk` и `junior-rustore-apk`.
7. **Заполнить карточку** текстами из `LISTING.md`, загрузить иконку, скриншоты (ориентация — горизонтальная) и APK, заполнить «Безопасность данных» (ответы в `LISTING.md`), отправить на модерацию.
8. **Проверить покупку** до публикации: Консоль → Монетизация → тестовые платежи (sandbox), установить подписанный APK на телефон с RuStore.

## Перед отправкой — вписать e-mail
В политике конфиденциальности (`privacy.html`, `junior/privacy.html` в ветке `main`) стоит заглушка вместо контактного e-mail. RuStore требует рабочий контакт разработчика.

## Обновления
Для новой версии увеличьте `versionCode` в `capacitor/<игра>/android/app/build.gradle` (1 → 2 …) и соберите снова тем же ключом.
