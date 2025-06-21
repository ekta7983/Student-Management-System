const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const path = require("path");
app.use(express.static(path.join(__dirname)));

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123ekta",
  database: "SMS",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Database connected");
  }
});

// Routes

// Get all students
app.get("/students", (req, res) => {
  const query = "SELECT * FROM Students";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving students");
    } else {
      res.json(results);
    }
  });
});

// Add a new student
app.post("/students", (req, res) => {
  const {
    FirstName,
    LastName,
    Gender,
    DateOfBirth,
    PhoneNumber,
    Email,
    Address,
  } = req.body;
  const query = `INSERT INTO Students (FirstName, LastName, Gender, DateOfBirth, PhoneNumber, Email, Address) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    query,
    [FirstName, LastName, Gender, DateOfBirth, PhoneNumber, Email, Address],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error adding student");
      } else {
        res.status(201).send({
          message: "Student added successfully",
          StudentID: result.insertId,
        });
      }
    }
  );
});

// Get all courses
app.get("/courses", (req, res) => {
  const query = "SELECT * FROM Courses";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving courses");
    } else {
      res.json(results);
    }
  });
});

// Add a new course
app.post("/courses", (req, res) => {
  const { CourseName, CourseDuration, CourseFee } = req.body;
  const query = `INSERT INTO Courses (CourseName, CourseDuration, CourseFee) VALUES (?, ?, ?)`;
  db.query(query, [CourseName, CourseDuration, CourseFee], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error adding course");
    } else {
      res.status(201).send({
        message: "Course added successfully",
        CourseID: result.insertId,
      });
    }
  });
});

// Get enrollments by student
app.get("/enrollments/:studentId", (req, res) => {
  const { studentId } = req.params;
  const query = `SELECT c.CourseName, e.EnrollmentDate FROM Enrollments e JOIN Courses c ON e.CourseID = c.CourseID WHERE e.StudentID = ?`;
  db.query(query, [studentId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving enrollments");
    } else {
      res.json(results);
    }
  });
});

// Add a new enrollment
app.post("/enrollments", (req, res) => {
  const { StudentID, CourseID, EnrollmentDate } = req.body;
  const query = `INSERT INTO Enrollments (StudentID, CourseID, EnrollmentDate) VALUES (?, ?, ?)`;
  db.query(query, [StudentID, CourseID, EnrollmentDate], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error adding enrollment");
    } else {
      res.status(201).send({
        message: "Enrollment added successfully",
        EnrollmentID: result.insertId,
      });
    }
  });
});

app.delete("/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  const query = `DELETE FROM Students WHERE StudentID = ?`;
  db.query(query, [studentId], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error deleting student" });
    } else {
      res.send({ message: "Student deleted successfully" });
    }
  });
});

app.put("/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  const {
    FirstName,
    LastName,
    Gender,
    DateOfBirth,
    PhoneNumber,
    Email,
    Address,
  } = req.body;
  const query = `
    UPDATE Students 
    SET FirstName = ?, LastName = ?, Gender = ?, DateOfBirth = ?, PhoneNumber = ?, Email = ?, Address = ? 
    WHERE StudentID = ?
  `;
  db.query(
    query,
    [
      FirstName,
      LastName,
      Gender,
      DateOfBirth,
      PhoneNumber,
      Email,
      Address,
      studentId,
    ],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Error updating student" });
      } else {
        res.send({ message: "Student updated successfully" });
      }
    }
  );
});

app.delete("/courses/:courseId", (req, res) => {
  const { courseId } = req.params;
  const query = `DELETE FROM Courses WHERE CourseID = ?`;
  db.query(query, [courseId], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error deleting course" });
    } else {
      res.send({ message: "Course deleted successfully" });
    }
  });
});

app.put("/courses/:courseId", (req, res) => {
  const { courseId } = req.params;
  const { CourseName, CourseDuration, CourseFee } = req.body;
  const query = `
    UPDATE Courses 
    SET CourseName = ?, CourseDuration = ?, CourseFee = ? 
    WHERE CourseID = ?
  `;
  db.query(query, [CourseName, CourseDuration, CourseFee, courseId], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error updating course" });
    } else {
      res.send({ message: "Course updated successfully" });
    }
  });
});

app.delete("/enrollments/:enrollmentId", (req, res) => {
  const { enrollmentId } = req.params;
  const query = `DELETE FROM Enrollments WHERE EnrollmentID = ?`;
  db.query(query, [enrollmentId], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error deleting enrollment" });
    } else {
      res.send({ message: "Enrollment deleted successfully" });
    }
  });
});

app.put("/enrollments/:enrollmentId", (req, res) => {
  const { enrollmentId } = req.params;
  const { StudentID, CourseID, EnrollmentDate } = req.body;
  const query = `
    UPDATE Enrollments 
    SET StudentID = ?, CourseID = ?, EnrollmentDate = ? 
    WHERE EnrollmentID = ?
  `;
  db.query(
    query,
    [StudentID, CourseID, EnrollmentDate, enrollmentId],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Error updating enrollment" });
      } else {
        res.send({ message: "Enrollment updated successfully" });
      }
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
