export function validateContact(contact: string): string | null {
  const trimmed = contact.trim();
  if (!trimmed) {
    return "Podaj numer telefonu lub adres e-mail do kontaktu.";
  }
  
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
  const digitsOnly = trimmed.replace(/\D/g, "");
  const isPhone = digitsOnly.length >= 9;

  if (!isEmail && !isPhone) {
    return "Wpisz poprawny numer telefonu (min. 9 cyfr) lub prawidłowy adres e-mail.";
  }
  return null;
}

export function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed || trimmed.length < 2) {
    return "Wpisz imię i nazwisko lub nazwę firmy (min. 2 znaki).";
  }
  return null;
}

export function validateWebsite(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed || trimmed.length < 3) {
    return "Podaj adres strony WWW (np. mojanazwafirmy.pl).";
  }
  return null;
}

export function validateField(val: string, fieldName: string): string | null {
  const trimmed = val.trim();
  if (!trimmed) {
    return `Pole '${fieldName}' nie może być puste.`;
  }
  return null;
}
