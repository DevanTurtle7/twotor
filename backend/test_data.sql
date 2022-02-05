INSERT INTO universities (name)
VALUES ('Rochester Institute of Technology');

INSERT INTO subjects (name, code, university_id)
VALUES ('Software Engineering', 'SWEN', 1),
        ('Mathematics', 'MATH', 1),
        ('Computer Science', 'CSCI', 1),
        ('Cybersecurity', 'CSEC', 1);

INSERT INTO courses (name, number, subject_id)
VALUES ('Web Engineering', 344, 1),
       ('Intro to Software Engineering', 261, 1),
       ('Calculus I', 181, 2),
       ('Discrete Math', 131, 2),
       ('Mechanics of Programming', 243, 3),
       ('Concepts of Computer Systems', 250, 3),
       ('Intro to Cybersecurity', 140, 4),
       ('Reverse Engineering Fundamentals', 202, 4);


