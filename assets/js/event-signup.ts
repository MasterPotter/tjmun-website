const signUpForm = document.getElementById("sign-up-form") as HTMLFormElement | null;
const emailInput = document.getElementById("email") as HTMLInputElement | null;
const gradeInput = document.getElementById("grade") as HTMLInputElement | null;

signUpForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!emailInput || !gradeInput) {
    window.alert("Error - please try again.");
    return;
  }

  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbyA1PdRBLxqgaczQA8D9J0_bu0KiGPjciWf5HYw3l8NkWOeEmE7LAZUkLrVDMujzFM_Bw/exec";
  const formData = new FormData();

  formData.append("email", emailInput.value);
  formData.append("grade", gradeInput.value);

  try {
    await fetch(scriptUrl, {
      method: "POST",
      body: formData,
    });

    window.alert("Thank you! Your data has been entered.");
    window.location.href = "index.html";
  } catch {
    window.alert("Error - please try again.");
  }
});
