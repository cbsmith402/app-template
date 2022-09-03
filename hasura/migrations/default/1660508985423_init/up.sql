SET check_function_bodies = false;
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
declare _new record;
begin _new := new;
_new."updated_at" = now();
return _new;
end;
$$;
