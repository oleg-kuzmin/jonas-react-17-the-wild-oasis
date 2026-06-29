import { differenceInDays, formatDistance, parseISO } from 'date-fns';

// Мы хотим, чтобы эта функция работала как с объектами типа Date, так и со строками (которые поступают из Supabase).
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = dateStr =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');

// Supabase требует строку даты в формате ISO. Однако эта строка будет отличаться при каждом рендеринге, поскольку дата в формате MS или SEC может меняться, что нежелательно. Поэтому мы используем этот приём, чтобы удалить любое время.
export const getToday = function (options = {}) {
  const today = new Date();

  // Необходимо сравнить это с датой created_at из Supabase, поскольку она не равна 0.0.0.0, поэтому при сравнении с более ранними датами нам нужно установить дату как КОНЕЦ дня.
  if (options?.end)
    // Записано до последней секунды дня
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = value =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(value);
