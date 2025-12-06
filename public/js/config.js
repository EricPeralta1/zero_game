const updateBtns = document.querySelectorAll(".update-btn");
const popup = document.getElementById("popup");
const updateForm = document.getElementById("update-user-form");

// OPEN UPDATE USER FORM
updateBtns.forEach((updateBtn) => {
    updateBtn.addEventListener("click", function (e) {
        updateForm.style.display = "flex";
        popup.style.display = "flex";
        const user = e.target.dataset;

        // OPEN POPUP WITH INPUTS FILLED WITH USER'S DATA
        updateForm.querySelector("#id-update").value = user.id;
        updateForm.querySelector("#username").value = user.username;
        updateForm.querySelector("#email").value = user.email;
        updateForm.querySelector("#role").value = user.rol;
    });
});

// DELETE USER FORM
const deleteBtns = document.querySelectorAll(".delete-btn");
const deleteText = document.getElementById("delete-text");
const deleteForm = document.getElementById("delete-user-form");
deleteBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
        popup.style.display = "flex";
        deleteForm.style.display = "flex";
        const user = e.target.dataset;

        deleteText.textContent = `¿Seguro que quiere eliminar a ${user.username}?`;

        deleteForm.querySelector("#id-delete").value = user.id;
    });
});

// CLOSE FORM
popup.addEventListener("click", function () {
    updateForm.style.display = "none";
    deleteForm.style.display = "none";
    popup.style.display = "none";
});

const cancelBtns = document.querySelectorAll(".cancel-btn");
cancelBtns.forEach((cancelBtn) => {
    cancelBtn.addEventListener("click", function () {
        updateForm.style.display = "none";
        deleteForm.style.display = "none";
        popup.style.display = "none";
    });
});

updateForm.addEventListener("click", function (e) {
    e.stopPropagation();
});
deleteForm.addEventListener("click", function (e) {
    e.stopPropagation();
});
