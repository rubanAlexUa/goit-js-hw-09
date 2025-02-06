let formData = {
  email: '',
  message: '',
};

const storageKey = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

// Завантаження даних із LocalStorage під час завантаження сторінки
function commonValues() {
  if (!localStorage.getItem(storageKey)) return;
  const data = loadFromLs(storageKey);
  if (data) {
    form.elements.email.value = data.email || '';
    form.elements.message.value = data.message || '';
  }
}

commonValues();

// Обробка події input для збереження даних у LocalStorage
form.addEventListener('input', e => {
  formData.email = form.elements.email.value.trim();
  formData.message = form.elements.message.value.trim();
  localStorage.setItem(storageKey, JSON.stringify(formData));
});

// Обробка події submit
form.addEventListener('submit', e => {
  e.preventDefault(); // Перешкоджає стандартній поведінці форми (оновленню сторінки)

  if (
    form.elements.email.value.trim() === '' ||
    form.elements.message.value.trim() === ''
  ) {
    alert('Please fill in all fields.');
    return;
  }

  console.log(formData);

  // Очищення даних після успішної відправки
  formData.email = '';
  formData.message = '';
  form.elements.email.value = '';
  form.elements.message.value = '';
  localStorage.removeItem(storageKey);
});

// Функція для завантаження даних із LocalStorage
function loadFromLs(key) {
  const data = localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch (err) {
    console.error('Error parsing data from localStorage:', err);
    return null;
  }
}
