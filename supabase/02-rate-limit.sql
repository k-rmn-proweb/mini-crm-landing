-- Rate limiting for the contact form. Run after 01-leads.sql.
--
-- The limit lives in the database rather than in the Server Action because
-- serverless functions have no shared memory: two concurrent invocations know
-- nothing about each other, so an in-process counter would leak through under
-- exactly the traffic it is meant to stop. Postgres is the one place that sees
-- every submission.

-- Submissions are grouped by a salted hash of the sender's IP. The raw address
-- is never stored, so the table holds no personal data beyond what the visitor
-- typed.
alter table public.leads
  add column if not exists ip_hash text;

create index if not exists leads_ip_hash_created_at_idx
  on public.leads (ip_hash, created_at desc);

-- The only way in. Runs as the owner, so it bypasses RLS and can both read the
-- recent history and append — neither of which the caller may do directly.
create or replace function public.submit_lead(
  p_name text,
  p_email text,
  p_message text,
  p_ip_hash text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  recent_count integer;
begin
  -- Re-validate here too: the function is a public entry point, and it must
  -- not depend on the caller having checked anything.
  if char_length(p_name) not between 2 and 80
     or char_length(p_email) not between 3 and 160
     or char_length(p_message) not between 20 and 2000 then
    raise exception 'invalid_input' using errcode = 'P0001';
  end if;

  select count(*)
    into recent_count
    from public.leads
   where ip_hash = p_ip_hash
     and created_at > now() - interval '1 hour';

  if recent_count >= 3 then
    raise exception 'rate_limited' using errcode = 'P0001';
  end if;

  insert into public.leads (name, email, message, ip_hash)
  values (p_name, p_email, p_message, p_ip_hash);
end;
$$;

revoke all on function public.submit_lead(text, text, text, text) from public;
grant execute on function public.submit_lead(text, text, text, text) to anon;

-- Close the direct insert path. Without this the function is merely a
-- suggestion: anyone holding the anon key could insert straight into the table
-- and never touch the counter.
drop policy if exists "anon can submit a lead" on public.leads;

-- The table now has no policy at all for anon: no select, insert, update or
-- delete. Every write goes through submit_lead, every read through the
-- dashboard's service role.
