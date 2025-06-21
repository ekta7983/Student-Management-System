// const apiUrl = "http://localhost:3000/students"; // API base URL

// // Fetch and display students on page load
// window.onload = fetchStudents;

// function fetchStudents() {
//   fetch(apiUrl)
//     .then((response) => response.json())
//     .then((students) => {
//       const tableBody = document.getElementById("studentTableBody");
//       tableBody.innerHTML = ""; // Clear existing rows
//       students.forEach((student) => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//                     <td>${student.id}</td>
//                     <td>${student.name}</td>
//                     <td>${student.age}</td>
//                     <td>${student.class}</td>
//                     <td class="actions">
//                         <button onclick="deleteStudent(${student.id})">Delete</button>
//                     </td>
//                 `;
//         tableBody.appendChild(row);
//       });
//     })
//     .catch((error) => console.error("Error fetching students:", error));
// }

// // Handle form submission
// document.getElementById("studentForm").addEventListener("submit", (event) => {
//   event.preventDefault();
//   const name = document.getElementById("name").value;
//   const age = document.getElementById("age").value;
//   const className = document.getElementById("class").value;

//   fetch(apiUrl, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name, age, className }),
//   })
//     .then((response) => response.json())
//     .then((student) => {
//       fetchStudents(); // Refresh the list
//       document.getElementById("studentForm").reset();
//     })
//     .catch((error) => console.error("Error adding student:", error));
// });

// // Delete student
// function deleteStudent(id) {
//   fetch(`${apiUrl}/${id}`, { method: "DELETE" })
//     .then(() => fetchStudents())
//     .catch((error) => console.error("Error deleting student:", error));
// }
