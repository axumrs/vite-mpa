(() => {
  const hiDiv = document.getElementById("hi");
  if (hiDiv) {
    const t = setTimeout(() => {
        hiDiv.innerText = "Hello, 世界";
        hiDiv.classList.remove("text-gray-600");
        hiDiv.classList.add("text-green-600");
        clearTimeout(t);
    }, 1500);
  }
})();
