const URL = '/lecturers';

window.onload = function () {
  document.getElementById('submit').addEventListener('click', function () {
    submitForm();
  });
};

async function submitForm() {
  const data = {};
  for (const id of [
    'firstname',
    'lastname',
    'academic_title',
    'email',
    'salutation',
    'phonenumber',
    'experience',
    'comment',
  ]) {
    data[id] = document.getElementById(id).value;
  }
  data.mainFocus_ids = [];
  for (const checkbox of ['is_extern', 'allow_manipulation']) {
    data[checkbox] = document.getElementById(checkbox).checked;
  }

  _submit(data);
}

async function _submit(data) {
  console.log(data);
  const response = await fetch(
    URL + `${URL.includes('?') ? '&' : '?'}token=${document.getElementById('token').value}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );
  const json = await response.json();
  console.log(json);
}
