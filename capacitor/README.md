# Мобильные приложения (Capacitor 8)

Два готовых нативных проекта — Android и iOS — для каждой игры:

| Папка | Игра | Bundle ID / applicationId |
|---|---|---|
| `capacitor/pobeditel` | «Победитель» (взрослая, v28) | `ru.pobeditel.game` |
| `capacitor/junior` | «Победитель Junior» (Junior 10) | `ru.pobeditel.junior` |

Внутри каждой: `www/index.html` (игра), `android/` (проект Android Studio), `ios/` (проект Xcode, Swift Package Manager — CocoaPods не нужен), `assets/` (исходная иконка), иконки и заставки уже сгенерированы под обе платформы.
Настроено: полноэкранный режим, вырез экрана, обе ориентации, тёмный фон заставки `#1b1535`, без рекламы/аналитики/сети.

## Собрать APK без своего компьютера
GitHub → вкладка **Actions** → «Build apps» → последний запуск → внизу **Artifacts**: `pobeditel-debug-apk`, `junior-debug-apk`. Скачать, распаковать, установить на Android (разрешить установку из неизвестных источников). Там же проверяется, что iOS-проект компилируется.
Запуск вручную: Actions → Build apps → Run workflow.

## Собрать у себя
```
cd capacitor/pobeditel        # или capacitor/junior
npm install
npx cap sync
npx cap open android          # Android Studio → Run / Build → Generate Signed Bundle (AAB для Google Play)
npx cap open ios              # Xcode (только Mac) → Signing: ваша Team → Product → Archive
```
После правки игры: скопировать новый html в `www/index.html` и выполнить `npx cap sync`.

## Перед публикацией
- Bundle ID можно сменить в `capacitor.config.json` (`appId`) до первой загрузки в магазины.
- Google Play: нужен аккаунт разработчика ($25 один раз) и подписанный AAB; в Android Studio: Build → Generate Signed Bundle.
- App Store: Apple Developer Program ($99/год), Mac с Xcode 16+.
- Детская версия в Google Play — программа «Designed for Families», в App Store — Kids Category; тексты и политика: `AppStore_paket/store/`.
