SELECT '1. Дубликаты строк' AS check_name, 
       project_code, task_code, employee_email, changed_at, COUNT(*) AS duplicate_count
FROM project_work_raw 
GROUP BY project_code, task_code, employee_email, changed_at 
HAVING COUNT(*) > 1;

SELECT '2. Регистр и пробелы в email' AS check_name, 
       row_id, employee_email 
FROM project_work_raw 
WHERE employee_email <> lower(btrim(employee_email));

SELECT '3. Битые трудозатраты' AS check_name, 
       row_id, spent_hours 
FROM project_work_raw 
WHERE spent_hours LIKE '%-%' 
   OR spent_hours ~ '[a-zA-Z]' 
   OR spent_hours LIKE '%;;%'
   OR spent_hours = '1000';

SELECT '4. Недопустимые статусы' AS check_name, 
       task_status, COUNT(*) 
FROM project_work_raw 
WHERE task_status NOT IN ('NEW', 'IN_PROGRESS', 'REVIEW', 'DONE', 'BLOCKED')
GROUP BY task_status;

SELECT '5. Разные названия у проекта' AS check_name, 
       project_code, array_agg(DISTINCT project_name) AS project_names
FROM project_work_raw 
GROUP BY project_code 
HAVING COUNT(DISTINCT project_name) > 1;

SELECT '6. Один task_code в разных проектах' AS check_name, 
       task_code, array_agg(DISTINCT project_code) AS project_codes
FROM project_work_raw 
GROUP BY task_code 
HAVING COUNT(DISTINCT project_code) > 1;

SELECT '7. Битые списки assignees' AS check_name, 
       row_id, assignees 
FROM project_work_raw 
WHERE assignees IS NULL 
   OR assignees IN ('', ',') 
   OR assignees LIKE '%not-an-email%' 
   OR assignees LIKE '%;%';

SELECT '8. Будущие даты или NULL' AS check_name, 
       row_id, changed_at, status_history 
FROM project_work_raw 
WHERE changed_at > '2027-01-01' 
   OR changed_at IS NULL;
