document.getElementById("sign-up-form").addEventListener("submit", function(event){
    event.preventDefault();
            var scriptURL = "https://script.google.com/macros/s/AKfycbyA1PdRBLxqgaczQA8D9J0_bu0KiGPjciWf5HYw3l8NkWOeEmE7LAZUkLrVDMujzFM_Bw/exec";
            var formData = new FormData();
            formData.append("email",document.getElementById("email").value);
            formData.append("grade",document.getElementById("grade").value);
            fetch(scriptURL, {method: "POST", body:formData})
                .then(response=>alert("Thank you! Your data has been entered."))
                .then(()=>{window.location.href = "index.html";})
                .catch(error => alert("Error - please try again."))
});