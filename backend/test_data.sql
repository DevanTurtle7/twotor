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

INSERT INTO accounts (first_name, last_name, email, university_id, username, salt, password)
VALUES ('Megan', 'Chang', 'corey15@example.com', 1, 'MeganChang',
        '911c2baa080bf68b269e4c15f3550b428715a1051197a07e152df1fce7ff11e90b244b884501a8fc2fa2d05c2b2a659ccac3ad27d08be91ca0622b5334c5d540',
        'a8a2671d23550bfc3491be9f3f96265c03b07cfe5c5da8a03c2c95f82793b6c5b44f7744fb67012f2b554ae850e56e89bf0f0ea6f214c24bd1b60b61eddb846c'), -- Password: NtIxqr4_&0
       ('Anita', 'Gomez', 'jessicapadilla@example.org', 1, 'AnitaGomez',
        'f35a9f00c33b6cecc473544523d51e1935390bce47b6313ee0f8c3685aba9ed5eb31d9598a322fba08704c94fe3dbd08ddd9418fdc36ded0b54f1fe1a603eb26',
        'f0886ad9eaa50df8b51e07cb3083f1c81638656386b47afbb759c37e257d35c2a857b30d27454f2e63e4b8ec49f9b99d74c1e8113963c5e1bb9cf61cde020630'), -- Password: ^Nq7lU@gH9
       ('James', 'Bradley', 'zdavis@example.com', 1, 'JamesBradley',
        'eae75821f86618cbeb7989671743c5dc5e1af3f99d510b81acd63fc45258f28cad340b127cca269e68a60aa60dc7bbb7ba2c3ff5bc9d1833941575d20e2b86e2',
        '2250d3b22fbdbb503f72cf1cad6b0d8fbe020aa24a8677dec39b7d4ba9592c2d4667e2cf1da2182022b6984df58b9cc88b015bbda7b33f813ef616db343cd464'), -- Password: L^BZr(Se$2
       ('Logan', 'Allen', 'pattylawrence@example.com', 1, 'LoganAllen',
        'aae0d55eb607538f14ad4f3859c6d658be2896c92874782f70a3080526fbeee075f9ffa9d793c50ba5260afab35f0dcdc97016f07c6b0713d52258df86b42381',
        '72de95a09c89b067c63a93642a0c901cb862035c4b960d73bd8d90e939cf247030be9c45f9cac87e005c45320b4cb7166aee78e6d040526b81093f05988d3941'), -- Password: XaN3Fqbo#u
       ('Bethany', 'Hayes', 'montoyacynthia@example.net', 1, 'BethanyHayes',
        '3e287ea4c2df86706717be6b3655786a3947e7b9a83da75bb59c6fe4da8d2f0bf3be0e624b724844bd13c70e491c6eebe582c00bb28f994dc46359a02b738b0c',
        '661b36b4e55f1e87379d7d6e5fdb646a6bf0dbdb37235a6420311e34f68d7566e9ce5ab99f25909dab2d835b93fd901d12f987fbfad953d2c33796f5ea739b0c'), -- Password: _5Ck5g(4kC
       ('Carrie', 'Jones', 'huffchad@example.org', 1, 'CarrieJones',
        'a8954e170656839b5a14723d59bcd8d58c4a00e59fe164757182db11c7bb8f938ccc0e0c0efa12c3b088db831961f31bd494144ca9f8d5be3477ac50ae1f8875',
        'acfdc62582cf0cce9bb16b938f2fcd50ba143613d74e3c5c485eefe5870e2804333dceb125e046151bafcdccc4260a0eb901aaeb205eae69caa34facc13f838d'), -- Password: @&n(W2Tf3s
       ('Deborah', 'Bell', 'david72@example.org', 1, 'DeborahBell',
        '001968a6b2c0eee59b584697eee092bbb2f8dd89198f3acc38147acbe840e81313a4f2d7db33ff48f0dacd762d53dcacab3e9c9b5ecb110880ef291af21a44d0',
        '1c3f8b8de41ab627608f6c6142ae9d58199c373c93a777a69510b8c3b676248e316229ae2694607e9b9d16c0448f090688019dd466cefd665d2aebe45d6605e1'), -- Password: #*Q2Eoot0b
       ('Thomas', 'Ortiz', 'brittany92@example.net', 1, 'ThomasOrtiz',
        'd164a5c726b911cf177e1ff895c485703774bb8a7dbb537a93d8f60cfeece0c7111eca1f45290d807bd07bd55b3ea0c8f636fb85113b020e7a81232b31951555',
        '99e130d6c3e598605e558b5a278bc52e6de280c053e2998aa4a9eb350954da6e2cb4fde89627e4d2251de964fee5b933262867d650018c7bf0625769b482bd12'), -- Password: En6T8JCu8)
       ('Kyle', 'Goodman', 'greeneric@example.net', 1, 'KyleGoodman',
        'cc9731ac916341baf7b08782c872020f90bb22c0d46b5dd6248490e8ba0050ed29be8f492343e8eb4b73ade1bc62b59b1beb03f62d589ba07837c8c192ec4ccf',
        '910d51c943e59bed042f35fdbcd63ac015cbef0bb2a9f4d3e0642630a895b144f394a0a65b7715113b9289f2418fea2dcf88bd4ca7090f9a5b781f50a3e7cb2e'), -- Password: _C1ZGqAtHd
       ('Nicole', 'Odonnell', 'lewisjennifer@example.org', 1, 'NicoleOdonnell',
        '403a04ed4d57da2f78453bb001ab2ef006614d3d63a811304906a074870f3ceabc334176423bd88de0e89ef5b56e847f7e710a6ebc0496f310b2b4a2c715d582',
        '3fa3a051e52ab6a029f9b482f951d541fe9a358c96695385493711667f15de8f161347cb17a15cb6ab9e87b7b72745a305dbd1ddd8e0cf084322ca4c0160f580'); -- Password: )n0myBpxyn

INSERT INTO help_queue (user_id, course_id, description)
VALUES
       (1, 1, 'Having issues with using React'),
       (2, 1, 'Having issues with using Flask') ,
       (3, 3, 'Integrals'),
       (4, 5, 'Pointers are giving me trouble...');


