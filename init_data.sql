-- user data
INSERT INTO public."user" (id, name, username, password, role, "serviceType") VALUES (1, 'Adem', 'medecin', '$2b$10$MgUrAjXg24ChRwvMR.9ji.dfQyCRRNdFp9dbG60CS9ob9UCFzPz9u', 'medecin', NULL);
INSERT INTO public."user" (id, name, username, password, role, "serviceType") VALUES (2, 'Mohammed', 'admin', '$2b$10$JoWagb3KbcCNDuskbr4RAuZ3PKrNG4YPHtCHxYkZW7CpOj5VJAU86', 'admin', NULL);
INSERT INTO public."user" (id, name, username, password, role, "serviceType") VALUES (3, 'Eya', 'pharmacien', '$2b$10$AAYFLnY1qfTzQGeoVWhuL.hrpqQmfz9Qnv3gzKYoIsByRotYq683e', 'pharmacien', NULL);

--molecule
INSERT INTO public.molecule (id, name, dose, formula, unite, "prodDay", way, "perfusionType", "perfusionDuration", vehicule, "finalVolume", comment) VALUES (1, 'Acide folinique IV', 400, '', 'mg/m²', 1, 'IV', 'Continuous', '10m', '', 0, NULL);
INSERT INTO public.molecule (id, name, dose, formula, unite, "prodDay", way, "perfusionType", "perfusionDuration", vehicule, "finalVolume", comment) VALUES (3, 'Oxaliplatine IV', 85, '', 'mg/m²', 1, 'IV', 'Continuous', '10m', '', 0, NULL);

