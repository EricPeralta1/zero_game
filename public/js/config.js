// OPEN POPUP WITH INPUTS FILLED WITH USER'S DATA
const updateBtns = document.querySelectorAll(".update-btn");
const popup = document.getElementById("popup");
const updateForm = document.getElementById("update-admin-form");

updateBtns.forEach((updateBtn) => {
    updateBtn.addEventListener("click", function (e) {
        popup.style.display = "flex";
        const admin = e.target.dataset;

        updateForm.querySelector("#id").value = admin.id;
        updateForm.querySelector("#username").value = admin.username;
        updateForm.querySelector("#email").value = admin.email;
        updateForm.querySelector("#role").value = admin.rol;
    });
});

// CLOSE FORM
popup.addEventListener("click", function () {
    popup.style.display = "none";
});

const cancelBtn = document.getElementById("cancel-btn");
cancelBtn.addEventListener("click", function () {
    popup.style.display = "none";
});

updateForm.addEventListener("click", function (e) {
    e.stopPropagation();
});
