interface LocalizationStrings {
  [key: string]: {
    [langCode: string]: string;
  };
}
const localizationStrings: LocalizationStrings = {
  HOME_PAGE: {
    en: "Home",
    tr: "Ana Sayfa",
    de: "Startseite"
  },
  SETTINGS_PAGE: {
    en: "Settings",
    tr: "Ayarlar",
    de: "Einstellungen"
  },
  PASSCODE: {
    en: "Passcode",
    tr: "Parola",
    de: "Passwort"
  },
  PASSCODE_CONSTRAINT: {
    en: "Passcode must contain at least 4 characters.",
    tr: "Parola en az 4 karakterden oluşmalıdır.",
    de: "Das Passwort muss mindestens 4 Zeichen enthalten."
  },
  PASSCODE_RECOMMENDATION: {
    en: "Recommendation: Create a passcode containing only numbers between 4-6 characters.",
    tr: "Öneri: Yalnızca sayılardan oluşan, 4-6 karakter uzunluğunda bir parola oluşturun.",
    de: "Empfehlung: Erstellen Sie ein Passwort, das nur aus Zahlen mit 4-6 Zeichen besteht."
  },
  LOADING_TEXT: {
    en: "Please wait as your request is processed...",
    tr: "İşleminiz gerçekleştiriliyor, lütfen bekleyiniz...",
    de: "Bitte warten Sie, während Ihre Anfrage verarbeitet wird..."
  },
  SHOW_PASSCODE: {
    en: "Show Passcode",
    tr: "Parolayı Göster",
    de: "Passwort anzeigen"
  },
  CREATE_PASSCODE: {
    en: "Create Passcode",
    tr: "Parola Oluştur",
    de: "Passwort erstellen"
  },
  INVALID_PASSCODE: {
    en: "Invalid passcode.",
    tr: "Geçersiz parola.",
    de: "Ungültiges Passwort."
  },
  LOGIN: {
    en: "Login",
    tr: "Giriş Yap",
    de: "Anmelden"
  },
  CREATE_NEW: {
    en: "New Secret",
    tr: "Yeni Kayıt",
    de: "Neues Geheimnis"
  },
  WEBSITE_ADDRESS: {
    en: "Website Address",
    tr: "Website Adresi",
    de: "Website Adresse"
  },
  EMAIL_ADDRESS: {
    en: "Email Address",
    tr: "E-posta Adresi",
    de: "E-Mail Adresse"
  },
  PASSWORD: {
    en: "Password",
    tr: "Şifre",
    de: "Passwort"
  },
  UPDATE_CONFIRMATION: {
    en: "Are you sure that you want to update this secret?",
    tr: "Bu kaydı güncellemek istediğinize emin misiniz?",
    de: "Sind Sie sicher, dass Sie dieses Geheimnis aktualisieren möchten?"
  },
  UPDATE: {
    en: "Update",
    tr: "Güncelle",
    de: "Aktualisieren"
  },
  DELETE_CONFIRMATION: {
    en: "Are you sure that you want to delete this secret?",
    tr: "Bu kaydı silmek istediğinize emin misiniz?",
    de: "Sind Sie sicher, dass Sie dieses Geheimnis löschen möchten?"
  },
  DELETE: {
    en: "Delete",
    tr: "Sil",
    de: "Löschen"
  },
  CLOSE: {
    en: "Close",
    tr: "Kapat",
    de: "Schließen"
  },
  NAME: {
    en: "Name",
    tr: "Ad",
    de: "Name"
  },
  SUBMIT: {
    en: "Submit",
    tr: "Gönder",
    de: "Einreichen"
  },
  CURRENT_PASSCODE: {
    en: "Current Passcode",
    tr: "Güncel Parola",
    de: "Aktuelles Passwort"
  },
  NEW_PASSCODE: {
    en: "New Passcode",
    tr: "Yeni Parola",
    de: "Neues Passwort"
  },
  CHANGE_PASSCODE: {
    en: "Change Passcode",
    tr: "Parola Değiştir",
    de: "Passwort ändern"
  },
  CHANGE_PASSCODE_INSTRUCTION: {
    en: "To change your passcode, please enter your current and new passcodes.",
    tr: "Parolanızı değiştirmek için lütfen güncel parolanızı ve yeni parolanızı giriniz.",
    de: "Um Ihr Passwort zu ändern, geben Sie bitte Ihr aktuelles und neues Passwort ein."
  },
  IMPORT_DATA: {
    en: "Import Data",
    tr: "Verileri İçeri Aktar",
    de: "Daten importieren"
  },
  EXPORT_DATA: {
    en: "Export Data",
    tr: "Verileri Dışa Aktar",
    de: "Daten exportieren"
  },
  SIGN_OUT: {
    en: "Sign Out",
    tr: "Çıkış Yap",
    de: "Abmelden"
  },
  CREATED_AT: {
    en: "Created At: ",
    tr: "Oluşturulma Tarihi: ",
    de: "Erstellt am: "
  },
  UPDATED_AT: {
    en: "Updated At: ",
    tr: "Güncellenme Tarihi: ",
    de: "Aktualisiert am: "
  },
};

export function getLocalizedString(key: string, langCode: string): string {
  return localizationStrings[key][langCode] || localizationStrings[key]["en"];
}