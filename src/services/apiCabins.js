import supabase, { supabaseUrl } from './supabase';

export async function apiGetCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function apiCreateCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Создание cabin
  let query = supabase.from('cabins').insert([{ ...newCabin, image: imagePath }]);
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  // 2. Загрузка картинки
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error('Cabin image could not be uploaded and the cabin was not created');
  }

  return data;
}

export async function apiEditCabin(newCabin, id, editImage) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  let query = supabase.from('cabins');
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Если hasImagePath === true то это редактирование текста
  // Если hasImagePath === falsе то это редактирование текста и загрузка новой картинки
  if (hasImagePath) {
    query = query.update(newCabin).eq('id', id);
  } else {
    query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be edited');
  }

  if (!hasImagePath) {
    await supabase.storage.from('cabin-images').remove([editImage]);
    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image);
    if (storageError) {
      console.error(storageError);
      throw new Error('Cabin image could not be uploaded');
    }
  }

  return data;
}

export async function apiDeleteCabin(id, image) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);
  await supabase.storage.from('cabin-images').remove([image]);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }
}
