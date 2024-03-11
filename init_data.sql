-- user data
INSERT INTO public."user" (id, name, username, password, role, "serviceType") VALUES (1, 'Adem', 'medecin', '$2b$10$MgUrAjXg24ChRwvMR.9ji.dfQyCRRNdFp9dbG60CS9ob9UCFzPz9u', 'medecin', NULL);
INSERT INTO public."user" (id, name, username, password, role, "serviceType") VALUES (2, 'Mohammed', 'admin', '$2b$10$JoWagb3KbcCNDuskbr4RAuZ3PKrNG4YPHtCHxYkZW7CpOj5VJAU86', 'admin', NULL);
INSERT INTO public."user" (id, name, username, password, role, "serviceType") VALUES (3, 'Eya', 'pharmacien', '$2b$10$AAYFLnY1qfTzQGeoVWhuL.hrpqQmfz9Qnv3gzKYoIsByRotYq683e', 'pharmacien', NULL);

--protocol
INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        VALUES (1, 'FOLFOX', 14, 3, '', '', '', false);
INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        VALUES (2, 'Taxol-Carboplatine', 21, 3, '', '', '', false);
INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        VALUES (3, 'EC', 21, 3, '', '', '', false);
INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        VALUES (4, 'Gemzar-Cisplatine', 21, 3, '', '', '', false);
INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        VALUES (5, 'FOLFIRI', 14, 3, '', '', '', false);
INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        VALUES (6, 'Navelbine-Cisplatine', 21, 3, '', '', '', false);
INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        VALUES (7, 'Alimta-Cisplatine', 21, 3, '', '', '', false);
INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        VALUES (8, 'VP16-Cisplatine', 21, 3, '', '', '', false);
INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        VALUES (9, 'VP16-Carboplatine', 21, 3, '', '', '', false);
INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        VALUES (10, 'Folforinox', 14, 3, '', '', '', false);
INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        VALUES (11, 'TC', 21, 3, '', '', '', false);
INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        VALUES (12, 'FLOT', 14, 3, '', '', '', false);
INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        VALUES (13, 'LV5FU2', 14, 3, '', '', '', false);
INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        VALUES (14, 'AI', 28, 3, '', '', '', false);
INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        VALUES (15, 'BEP', 21, 3, '', '', '', false);
INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        VALUES (16, 'EMA', 21, 3, '', '', '', false);
INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        VALUES (17, 'CO', 21, 3, '', '', '', false);
INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        VALUES (18, 'VDC', 28, 3, '', '', '', false);
INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        VALUES (19, 'VC', 21, 3, '', '', '', false);
INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        VALUES (20, 'IE', 28, 3, '', '', '', false);
INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        VALUES (21, 'VP16 Holoxan', 21, 3, '', '', '', false);
INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        VALUES (22, 'API', 28, 3, '', '', '', false);

