const express = require("express");
const mysql2 = require("mysql2");
const cors = require("cors");
const app = express();

const database = mysql2.createConnection({
  host: "sina-database",
  user: "root",
  password: "oj62sfDSJdbyff0u5Jf37mZw",
  database: "maindb",
  port: 3306,
});

database.connect((err) => {
  if (err) console.log(err);
  console.log("trying to connect mySQL database");
});

app.use(cors());

app.get("/students", (req, res) => {
  const query = `select * from maindb.students;`;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/terms", (req, res) => {
  const query = `select * from maindb.terms;`;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/professors", (req, res) => {
  const query = `select * from maindb.professors;`;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/courses", (req, res) => {
  const query = `select * from maindb.courses;`;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/groups", (req, res) => {
  const query = `select * from maindb.groups;`;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/course_student_professor_term", (req, res) => {
  const query = `select * from maindb.course_student_professor_term;`;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/groups_course", (req, res) => {
  const query = `select * from maindb.groups_course;`;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/groups_student", (req, res) => {
  const query = `select * from maindb.groups_student;`;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/query1", (req, res) => {
  // نام وتاریخ تولد دانشجو که شماره داشجویی آن 11118 می باشد
  const query = `select maindb.students.Name , maindb.students.Birth_Date
  from maindb.students
  where maindb.students.Student_ID = 11118`;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/query2", (req, res) => {
  //نام وتاریخ تولد دانشجویان کامپیوتر
  const query = `select maindb.students.Name , maindb.students.Birth_Date
  from maindb.students , maindb.groups , maindb.groups_student
  where maindb.groups.Groupe_ID = maindb.groups_student.Group_ID and
  maindb.students.Student_ID = maindb.groups_student.Student_ID and
  maindb.groups.Group_Name = 'Computer';`;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/query3", (req, res) => {
  //تعداد دانشجویان گروه کامپیوتر
  const query = `select students.Name,count(students.Student_ID) as NumberOfStudents
  from maindb.students , maindb.groups , maindb.groups_student
  where maindb.groups.Groupe_ID = maindb.groups_student.Group_ID and
  maindb.students.Student_ID = maindb.groups_student.Student_ID and
  maindb.groups.Group_Name = 'Computer'
  group by maindb.students.Student_ID`;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/query4", (req, res) => {
  //تعداد دانشجویان گروه کامپیوتر نیمسال اول سال 2018
  const query = `select count(maindb.students.Student_ID) as NumberOfStudents
  from maindb.students , maindb.groups , maindb.groups_student , maindb.course_student_professor_term , maindb.terms
  where maindb.groups.Groupe_ID = maindb.groups_student.Group_ID and
  maindb.students.Student_Code = groups_student.Student_ID and
  maindb.groups.Group_Name = 'computer' and
  maindb.course_student_professor_term.Student_ID = maindb.students.Student_ID and
  maindb.course_student_professor_term.Term_ID = maindb.terms.Term_ID and
  maindb.terms.Description = 'fall of 2018 and winter of 2018';`;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/query5", (req, res) => {
  // ...
  const query = `select maindb.courses.Course_Name
  from maindb.courses , maindb.professors , maindb.terms ,  maindb.course_student_professor_term
  where maindb.courses.Course_ID = maindb.course_student_professor_term.Course_ID and
  maindb.professors.Professor_ID = maindb.course_student_professor_term.Professor_ID and
  maindb.terms.Term_ID = maindb.course_student_professor_term.Term_ID and
  maindb.professors.Professor_ID = 1113 and
  maindb.terms.Term_ID = 20191;`;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/query6", (req, res) => {
  // ...
  const query = `select maindb.groups.Group_Name
  from maindb.groups , maindb.courses , maindb.groups_course
  where maindb.groups.Groupe_ID = maindb.groups_course.Group_ID and
  maindb.courses.Course_ID = maindb.groups_course.Course_ID and
  maindb.courses.Course_Name = 'Data base';`;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/query7", (req, res) => {
  // ...
  const query = `select count(maindb.students.Student_ID) as NumberOfStudents 
  from maindb.students , maindb.courses , maindb.terms , maindb.course_student_professor_term
  where maindb.students.Student_ID = maindb.course_student_professor_term.Student_ID and
  maindb.courses.Course_ID = maindb.course_student_professor_term.Course_ID and
  maindb.terms.Term_ID = maindb.course_student_professor_term.Term_ID and
  maindb.course_student_professor_term.Grade > 12 and
  maindb.courses.Course_Name = 'Data Structure';`;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/query8", (req, res) => {
  // ...
  const query = `select maindb.terms.Term_ID , count(maindb.students.Student_ID) as NumberOfStudents
  from maindb.students , maindb.courses , maindb.terms , maindb.course_student_professor_term
  where maindb.students.Student_ID = maindb.course_student_professor_term.Student_ID and
  maindb.courses.Course_ID = maindb.course_student_professor_term.Course_ID and
  maindb.terms.Term_ID = maindb.course_student_professor_term.Term_ID and
  maindb.course_student_professor_term.Grade > 15 and
  maindb.courses.Course_Name = 'Data Structure'
  group by terms.Term_ID`;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/query9", (req, res) => {
  // ...
  const query = `select sum(maindb.course_student_professor_term.Grade * maindb.courses.Units) / sum( maindb.courses.Units) as GPA
  from maindb.courses , maindb.course_student_professor_term , maindb.students
  where maindb.courses.Course_ID = maindb.course_student_professor_term.Course_ID and
  maindb.students.Student_ID = maindb.course_student_professor_term.Student_ID and
  maindb.students.Name = 'Reza Farshi'`;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/query10", (req, res) => {
  // ...
  const query = `select maindb.courses.Course_Name
  from maindb.courses , maindb.students , maindb.course_student_professor_term 
  where maindb.courses.Course_ID = maindb.course_student_professor_term.Course_ID and
  maindb.students.Student_ID = maindb.course_student_professor_term.Student_ID and
  maindb.students.Name = 'Kian Hosseini'`;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/query11", (req, res) => {
  // ...
  const query = `select sum(maindb.course_student_professor_term.Grade * maindb.courses.Units) / sum(maindb.courses.Units) as GPA
  from course_student_professor_term , courses , students
  where maindb.courses.Course_ID = maindb.course_student_professor_term.Course_ID and
  maindb.students.Student_ID = maindb.course_student_professor_term.Student_ID and
  maindb.students.Name = 'Behrooz Eshghi'`;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/query12", (req, res) => {
  // ...
  const query = `select sum(maindb.courses.Units) as NumberOfUnits
  from maindb.courses , maindb.students , maindb.course_student_professor_term
  where maindb.courses.Course_ID = maindb.course_student_professor_term.Course_ID and
  maindb.students.Student_ID = maindb.course_student_professor_term.Student_ID and
  maindb.students.Name = 'Behrooz Eshghi'`;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/query13", (req, res) => {
  // ...
  const query = `select  maindb.terms.Term_ID , count(*) as count
  from maindb.professors , maindb.terms , maindb.course_student_professor_term
  where maindb.professors.Professor_ID = maindb.course_student_professor_term.Professor_ID and
  maindb.terms.Term_ID = maindb.course_student_professor_term.Term_ID and
  maindb.professors.Professor_ID = 1116
  group by maindb.terms.Term_ID`;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/query14", (req, res) => {
  // ...
  const query = `select avg(maindb.course_student_professor_term.Grade) as avg
  from maindb.course_student_professor_term , maindb.courses , maindb.terms , maindb.professors
  where maindb.courses.Course_ID = maindb.course_student_professor_term.Course_ID and
  maindb.professors.Professor_ID = maindb.course_student_professor_term.Professor_ID and
  maindb.terms.Term_ID = maindb.course_student_professor_term.Term_ID and
  maindb.courses.Course_Name = 'Data Structure' and
  maindb.terms.Description = 'Spring of 2019 and summer of 2019' and
  maindb.professors.Professor_ID = 1113`;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/query15", (req, res) => {
  // ...
  const query = `select maindb.students.Name
  from maindb.students , maindb.courses , maindb.professors , maindb.terms , maindb.course_student_professor_term
  where maindb.courses.Course_ID = maindb.course_student_professor_term.Course_ID and
  maindb.students.Student_ID = maindb.course_student_professor_term.Student_ID and
  maindb.professors.Professor_ID = maindb.course_student_professor_term.Professor_ID and
  maindb.terms.Term_ID = maindb.course_student_professor_term.Term_ID and
  maindb.courses.Course_Name = 'Data Structure' and
  maindb.terms.Description = 'Spring of 2019 and summer of 2019' and
  maindb.professors.Professor_ID = 1113 and
  maindb.course_student_professor_term.Grade > (select avg(maindb.course_student_professor_term.Grade)
  from maindb.course_student_professor_term , maindb.courses , maindb.terms , maindb.professors
  where maindb.courses.Course_ID = maindb.course_student_professor_term.Course_ID and
  maindb.professors.Professor_ID = maindb.course_student_professor_term.Professor_ID and
  maindb.terms.Term_ID = maindb.course_student_professor_term.Term_ID and
  maindb.courses.Course_Name = 'Data Structure' and
  maindb.terms.Description = 'Spring of 2019 and summer of 2019' and
  maindb.professors.Professor_ID = 1113)`;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/query16", (req, res) => {
  // ...
  const query = `select maindb.terms.Term_ID , avg(maindb.course_student_professor_term.Grade) as avg
  from maindb.course_student_professor_term , maindb.courses , maindb.terms
  where maindb.courses.Course_ID = maindb.course_student_professor_term.Course_ID and
  maindb.terms.Term_ID = maindb.course_student_professor_term.Term_ID and
  maindb.courses.Course_Name = 'Data Base'
  group by maindb.course_student_professor_term.Term_ID`;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/query17", (req, res) => {
  // ...
  const query = `select max(maindb.course_student_professor_term.Grade) as max
  from maindb.course_student_professor_term , maindb.courses 
  where maindb.courses.Course_ID = maindb.course_student_professor_term.Course_ID and
  maindb.courses.Course_Name = 'Data Base'`;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/query18", (req, res) => {
  // ...
  const query = `select maindb.students.Name
  from maindb.students , maindb.course_student_professor_term
  where maindb.students.Student_Code = maindb.course_student_professor_term.Student_ID and
  maindb.course_student_professor_term.Grade in (select max(course_student_professor_term.Grade)
  from maindb.course_student_professor_term , maindb.courses
  where maindb.courses.Course_ID = maindb.course_student_professor_term.Course_ID and
  maindb.courses.Course_Name = 'Data Base')`;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/query19", (req, res) => {
  // ...
  const query = `select maindb.students.Student_ID, maindb.terms.Term_ID, sum(maindb.course_student_professor_term.Grade * maindb.courses.Units) / sum(maindb.courses.Units) as GPA
  from maindb.students , maindb.terms , maindb.courses , maindb.course_student_professor_term 
  where maindb.students.Student_ID = maindb.course_student_professor_term.Student_ID and
  maindb.courses.Course_ID = maindb.course_student_professor_term.Course_ID and
  maindb.terms.Term_ID = maindb.course_student_professor_term.Term_ID
  group by maindb.students.Student_ID , maindb.terms.Term_ID `;
  database.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

port = 3000;
app.listen(port, () => console.log(`running on port ${port}`));
