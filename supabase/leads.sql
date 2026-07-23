-- Landing page contact form storage.
-- Run once in the Supabase SQL editor of the project used by this site.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (char_length(email) between 3 and 160),
  message text not null check (char_length(message) between 20 and 2000)
);

alter table public.leads enable row level security;

-- The site ships the public anon key, so the database decides what it may do:
-- append a lead and nothing else. There is deliberately no select, update or
-- delete policy, which means a leaked anon key cannot read anyone's messages.
drop policy if exists "anon can submit a lead" on public.leads;

create policy "anon can submit a lead"
  on public.leads
  for insert
  to anon
  with check (true);

-- Read them from the Supabase dashboard, which uses the service role.
create index if not exists leads_created_at_idx
  on public.leads (created_at desc);
