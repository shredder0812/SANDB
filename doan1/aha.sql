-- Database: dbsan

-- DROP DATABASE IF EXISTS dbsan;

CREATE DATABASE dbsan
    WITH
    OWNER = tung
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

ALTER DATABASE dbsan






-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    user_id integer AUTO_INCREMENT NOT NULL,
    username character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to tung;

GRANT ALL ON TABLE public.users TO tung;

-- Table: public.object_details

-- DROP TABLE IF EXISTS public.object_details;

CREATE TABLE IF NOT EXISTS public.object_details
(
    classname text COLLATE pg_catalog."default",
    coords geometry,
    cad_id bigint NOT NULL,
    layer text COLLATE pg_catalog."default",
    linetype text COLLATE pg_catalog."default",
    linetype_scale double precision,
    lineweight bigint,
    material text COLLATE pg_catalog."default",
    thickness double precision,
    transparency bigint,
    closed boolean,
    jsondata json,
    objdetails_id integer AUTO_INCREMENT NOT NULL,
    CONSTRAINT object_details_pkey PRIMARY KEY (objdetails_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.object_details
    OWNER to tung;

GRANT ALL ON TABLE public.users TO tung;

-- Table: public.object

-- DROP TABLE IF EXISTS public.object;

CREATE TABLE IF NOT EXISTS public.object
(
    object_id bigint AUTO_INCREMENT NOT NULL,
    objdetails_id bigint AUTO_INCREMENT,
    draw_id bigint AUTO_INCREMENT,
    CONSTRAINT object_pkey PRIMARY KEY (object_id),
    CONSTRAINT object_objdetails_id_fkey FOREIGN KEY (objdetails_id)
        REFERENCES public.object_details (objdetails_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
    CONSTRAINT object_draw_id_fkey FOREIGN KEY (draw_id)
        REFERENCES public.draw_details (draw_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.object
    OWNER to postgres;

GRANT ALL ON TABLE public.object TO tung;

-- Table: public.draw_details

-- DROP TABLE IF EXISTS public.draw_details;

CREATE TABLE IF NOT EXISTS public.draw_details
(
    draw_id integer AUTO_INCREMENT NOT NULL,
    draw_name character(100) COLLATE pg_catalog."default",
    cm_id integer AUTO_INCREMENT NOT NULL,
    CONSTRAINT draw_details_pkey PRIMARY KEY (draw_id),
    CONSTRAINT committ_details_cm_id_fkey FOREIGN KEY (cm_id)
        REFERENCES public.committ_details (cm_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.draw_details
    OWNER to tung;

GRANT ALL ON TABLE public.draw_details TO tung;

-- Table: public.committs

-- DROP TABLE IF EXISTS public.committs;

CREATE TABLE IF NOT EXISTS public.committs
(
    user_id integer AUTO_INCREMENT NOT NULL,
    committ_id bigint AUTO_INCREMENT NOT NULL,
    committ_time timestamp without time zone,
    draw_id bigint AUTO_INCREMENT,
    CONSTRAINT committs_pkey PRIMARY KEY (committ_id),
    CONSTRAINT committs_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.committs
    OWNER to tung;

GRANT ALL ON TABLE public.committs TO tung;

-- Table: public.committ_details

-- DROP TABLE IF EXISTS public.committ_details;

CREATE TABLE IF NOT EXISTS public.committ_details
(
    committ_id integer AUTO_INCREMENT NOT NULL,
    cm_id integer AUTO_INCREMENT NOT NULL,
    draw_id integer AUTO_INCREMENT NOT NULL,
    object_id integer AUTO_INCREMENT NOT NULL,
    CONSTRAINT committ_details_pkey PRIMARY KEY (cm_id),
    CONSTRAINT committ_details_committ_id_fkey FOREIGN KEY (committ_id)
        REFERENCES public.committs (committ_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.committ_details
    OWNER to tung;

GRANT ALL ON TABLE public.committ_details TO tung;