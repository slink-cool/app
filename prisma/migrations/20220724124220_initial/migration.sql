-- avoid broken schema, see https://supabase.com/docs/guides/integrations/prisma#troubleshooting
CREATE SCHEMA IF NOT EXISTS "auth";
CREATE SCHEMA IF NOT EXISTS "extensions";
create extension if not exists "uuid-ossp" with schema extensions;
create extension if not exists pgcrypto with schema extensions;
create extension if not exists pgjwt with schema extensions;

grant usage on schema public to postgres, anon, authenticated, service_role;
grant usage on schema extensions to postgres, anon, authenticated, service_role;
alter user supabase_admin SET search_path TO public, extensions; -- don't include the "auth" schema

grant all privileges on all tables in schema public to postgres, anon, authenticated, service_role, supabase_admin;
grant all privileges on all functions in schema public to postgres, anon, authenticated, service_role, supabase_admin;
grant all privileges on all sequences in schema public to postgres, anon, authenticated, service_role, supabase_admin;

alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on functions to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on sequences to postgres, anon, authenticated, service_role;

alter default privileges for user supabase_admin in schema public grant all on sequences to postgres, anon, authenticated, service_role;
alter default privileges for user supabase_admin in schema public grant all on tables to postgres, anon, authenticated, service_role;
alter default privileges for user supabase_admin in schema public grant all on functions to postgres, anon, authenticated, service_role;

alter role anon set statement_timeout = '3s';
alter role authenticated set statement_timeout = '8s';

-- disable graphql
drop extension if exists pg_graphql;
drop schema if exists graphql_public cascade;

-- create auth.sub()
create function auth.sub() returns text as
$$
select coalesce(
               nullif(current_setting('request.jwt.claim.sub', true), ''),
               (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
           )::text;
$$ language sql;

-- CreateTable
CREATE TABLE "user"
(
    "id"           TEXT         NOT NULL,
    "created_at"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "display_name" TEXT,
    "short_name"   TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

alter table "user"
    enable row level security;

CREATE POLICY "read_all"
    ON "user"
    FOR SELECT USING (
    true
    );

CREATE POLICY "update_only_self"
    ON "user"
    FOR UPDATE USING (
    auth.sub() = id
    ) WITH CHECK (
    auth.sub() = id
    );
