let formData = {
  email: '',
  message: '',
};
const storageKey = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

function commonValues() {
  if(!localStorage.getItem(storageKey)) return
  const data = loadFromLs(storageKey);
  console.log(data)
  form.elements.email.value = data.email;
  form.elements.message.value = data.message;
}

commonValues();

form.addEventListener('input', e => {
  formData.email = e.currentTarget.elements.email.value.trim();
  formData.message = e.currentTarget.elements.message.value.trim();
  localStorage.setItem(storageKey, JSON.stringify(formData));
  console.log(formData);
});

form.addEventListener('submit', e => {
  if (
    e.currentTarget.elements.email.value.trim() === '' ||
    e.currentTarget.elements.message.value.trim() === ''
  ) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  formData.email = ''
  formData.message = '';
  e.currentTarget.elements.message.value = ''
  e.currentTarget.elements.email.value = '';
  localStorage.removeItem(storageKey);
});

function loadFromLs(key) {
  let data = localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
    return data;
  }
}
