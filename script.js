function updateInfo() {
    let newName = document.getElementById("new-name").value;
    if (newName) {
        document.getElementById("student-name").innerText = newName;
        alert("Student name updated to " + newName);
    } else {
        alert("Please enter a name");
    }
}