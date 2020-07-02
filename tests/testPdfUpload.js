const URL = '/lecturers';

window.onload = function () {
  document.getElementById('submit').addEventListener('click', function () {
    submitForm();
  });

  document.getElementById('token2').addEventListener('input', updateFormAction);
  document.getElementById('lecturerId2').addEventListener('input', updateFormAction);
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
    'possible_lectures',
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
  try {
    const lecturerId = json.payload.lecturer_id;
    document.getElementById("created-message").textContent = `created lecturer with id ${lecturerId}, see console for whole object`;
    updateLecturerIdInputFields(lecturerId);
  } catch (error) {}
}

function updateLecturerIdInputFields (lecturerId) {
  document.getElementById("lecturerId2").value = lecturerId;
  document.getElementById("lecturerId3").value = lecturerId;
  updateFormAction();
}

function updateFormAction () {
  const token = document.getElementById("token2").value;
  const lecturerId = document.getElementById("lecturerId2").value;

  document.getElementById("uploadForm").setAttribute("action", `/lecturerCV?lecturerId=${lecturerId}&token=${token}`)
}
