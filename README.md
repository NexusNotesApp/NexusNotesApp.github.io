# Nexus Notes website

Static GitHub Pages website: https://nexus-notes.net/.
Publish this directory to the separate NexusNotesApp/NexusNotesApp.github.io
repository. Do not publish the desktop source repository.

## Firebase setup

Project: nexus-notes-9f146. Website accounts use Firebase Authentication only.
No Firestore, Analytics, custom SMTP or desktop cloud sync is required.

1. Enable Authentication > Sign-in method > Email/Password (not email-link login).
2. Under Authentication > Settings > Authorized domains add nexus-notes.net.
   Add nexusnotesapp.github.io only if you use that hostname directly.
   Add localhost explicitly for local HTTP testing if needed.
3. Under Authentication > Templates configure both Email address verification
   and Password reset action URLs to:
   https://nexus-notes.net/account.html
   The page handles Firebase mode and oobCode parameters; expired/used links
   report an error. Do not copy a real one-time code into configuration.
   The default Firebase-hosted handler also works if you retain it; its Continue
   link returns to account.html. Test whichever handler you configure.
4. Enable email enumeration protection and consider an eight-character minimum
   password policy in Firebase to match the website's signup/reset forms.
5. Register a fresh Firebase account. The owner's sole Supabase test account and
   session are not migrated or deleted. Existing Supabase verification/reset
   links must be replaced with newly requested Firebase emails after cutover.
6. Test registration, verification, login, logout, password reset and token
   refresh using an address you control, including on the company network/VPN.

config.js contains intentionally public Firebase browser configuration. Never
put service-account keys or other private credentials in this directory.
Firebase App and Auth compat SDK 13.0.0 are vendored under vendor/ from Google's
www.gstatic.com/firebasejs/13.0.0/ distribution; license headers are retained.
Serving them locally avoids a runtime dependency on the Google SDK CDN.
Firebase API access still requires identitytoolkit.googleapis.com and
securetoken.googleapis.com. No Analytics SDK is loaded.

## Compatibility and access

Desktop databases, paths, backups, notes and attachments are unchanged on Mac
and Windows. This is a website update, not an application version.
Firebase sessions are separate from Supabase sessions; sign in again after
cutover. Downloads require a Firebase account with a verified email address.
The browser refreshes account information and tokens before showing links.
GitHub release assets remain public: this is a website login gate, not private
file hosting or server-enforced installer access control.

Rollback: restore the previous website files and Supabase configuration.
Firebase accounts do not automatically exist in Supabase; accounts created after
cutover would need separate handling. Retain the Supabase project until the
Firebase flows are verified. This change does not delete either provider's data.

## Validation and publication

Serve over HTTP locally, not file URLs. Run:
node --test tests/website.test.cjs
Node 22+ and Chrome are required; CHROME_PATH can select Chrome.
Tests use isolated browser profiles and mocked authentication; they never create
real users or send email. Real email delivery and Firebase console configuration
require separate acceptance testing. See VALIDATION.md for recorded results.
Publish only the reviewed website changes; the current local homepage also
contains previously unpublished CSV FAQ copy documented in VALIDATION.md.

Google sign-in uses the existing Firebase project alongside email/password. Enable Google in Firebase Authentication and retain nexus-notes.net as an authorized domain. Google popup completion requires real-user acceptance.
