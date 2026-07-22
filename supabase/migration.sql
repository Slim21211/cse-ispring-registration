-- Запусти в Supabase → SQL Editor
-- Можно добавить в тот же проект что и portal-admin

create table if not exists cities (
  id         uuid        default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name       text        not null,
  url        text        not null,
  is_pinned  boolean     not null default false
);

-- RLS
alter table cities enable row level security;

-- Публичное чтение (лендинг без ключа)
create policy "public read"
  on cities for select
  using (true);

-- Анонимная запись (для админки)
create policy "anon insert" on cities for insert with check (true);
create policy "anon update" on cities for update using (true);
create policy "anon delete" on cities for delete using (true);

-- Тестовые данные
insert into cities (name, url, is_pinned) values
  ('Москва',             'https://cse.ispring.ru/app/user-portal/knowledge-base/content-player/ЗАМЕНИ', true),
  ('Московская область', 'https://cse.ispring.ru/app/user-portal/knowledge-base/content-player/ЗАМЕНИ', true),
  ('Сургут',             'https://cse.ispring.ru/app/user-portal/knowledge-base/content-player/ЗАМЕНИ', false),
  ('Краснодар',          'https://cse.ispring.ru/app/user-portal/knowledge-base/content-player/ЗАМЕНИ', false),
  ('Новосибирск',        'https://cse.ispring.ru/app/user-portal/knowledge-base/content-player/ЗАМЕНИ', false);
