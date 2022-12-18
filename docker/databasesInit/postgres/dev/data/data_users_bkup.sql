--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Debian 14.5-1.pgdg110+1)
-- Dumped by pg_dump version 14.5 (Debian 14.5-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, access, "gitHubToken") FROM stdin;
1	fguntz	fabien.guntz@univ-lemans.fr	toto	2	Je7YoydlxreCnwfnxuuTnD/c2hTMBY7l09qVSfKxx/wkTiCdWs96DIAmK6M65LzKPLoq/xdaREzJ97N0n0OjSQ==
2	sysFriche2	fguntzpro@gmail.com	toto	1	XEe/Gsp6U4PiqnfofoCPhAj0dqQMOi2YcIs87Lep9GzfhHVz1ioUxfxomSndcFSTUmP/0kt9ULLn0iqSougw+A==
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- PostgreSQL database dump complete
--

