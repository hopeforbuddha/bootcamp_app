const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
const values = [`%${cohortName}%`, limit];

pool.query(`
select distinct teachers.name as teacher, cohorts.name as cohort
from teachers
join assistance_requests on teacher_id = teachers.id
join students on student_id = students.id
join cohorts on cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
order by teacher
limit $2;
`, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.cohort}: ${user.teacher}`);
  })
}).catch(err => console.error('query error', err.stack));

