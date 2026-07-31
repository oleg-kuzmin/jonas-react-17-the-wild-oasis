import supabase from './supabase';

export async function apiGetSettings() {
  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }

  return data;
}

// Мы ожидаем объект newSetting, который будет выглядеть следующим образом: {setting: newValue}
export async function apiUpdateSetting(newSetting) {
  const { data, error } = await supabase
    .from('settings')
    .update(newSetting)
    // Настройки представлены всего в ОДНОЙ строке, и у неё ID=1, поэтому это обновлённая версия.
    .eq('id', 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be updated');
  }

  return data;
}
