DROP TABLE IF EXISTS to_do CASCADE;
DROP TABLE IF EXISTS completed_to_do CASCADE;

CREATE TABLE   to_do (
    id serial primary key,
    task varchar not null,
    task_start date not null,
    task_deadline date not null
);

CREATE TABLE completed_to_do (
    id serial primary key,
    task varchar not null,
    task_start date not null,
    task_deadline date not null,
    task_completed date not null
);