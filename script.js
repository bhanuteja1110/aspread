window.onload = function () {
  setTimeout(() => {
    document.getElementById("appPopup").style.display = "flex";
  }, 3000);
};

function closePopup() {
  document.getElementById("appPopup").style.display = "none";
}
