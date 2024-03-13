-- user data
INSERT INTO public."user" (id, name, username, password, role, "serviceType") VALUES (1, 'Adem', 'medecin', '$2b$10$MgUrAjXg24ChRwvMR.9ji.dfQyCRRNdFp9dbG60CS9ob9UCFzPz9u', 'medecin', NULL);
INSERT INTO public."user" (id, name, username, password, role, "serviceType") VALUES (2, 'Mohammed', 'admin', '$2b$10$JoWagb3KbcCNDuskbr4RAuZ3PKrNG4YPHtCHxYkZW7CpOj5VJAU86', 'admin', NULL);
INSERT INTO public."user" (id, name, username, password, role, "serviceType") VALUES (3, 'Eya', 'pharmacien', '$2b$10$AAYFLnY1qfTzQGeoVWhuL.hrpqQmfz9Qnv3gzKYoIsByRotYq683e', 'pharmacien', NULL);

--protocol
INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        VALUES (1, 'FOLFOX', 14, 3, '', '', '', false);
--INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        --VALUES (2, 'Taxol-Carboplatine', 21, 3, '', '', '', false);
--INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        --VALUES (3, 'EC', 21, 3, '', '', '', false);
--INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        --VALUES (4, 'Gemzar-Cisplatine', 21, 3, '', '', '', false);
--INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        --VALUES (5, 'FOLFIRI', 14, 3, '', '', '', false);
--INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        --VALUES (6, 'Navelbine-Cisplatine', 21, 3, '', '', '', false);
--INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        --VALUES (7, 'Alimta-Cisplatine', 21, 3, '', '', '', false);
--INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        --VALUES (8, 'VP16-Cisplatine', 21, 3, '', '', '', false);
--INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        --VALUES (9, 'VP16-Carboplatine', 21, 3, '', '', '', false);
--INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        --VALUES (10, 'Folforinox', 14, 3, '', '', '', false);
--INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        --VALUES (11, 'TC', 21, 3, '', '', '', false);
--INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        --VALUES (12, 'FLOT', 14, 3, '', '', '', false);
--INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        --VALUES (13, 'LV5FU2', 14, 3, '', '', '', false);
--INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        --VALUES (14, 'AI', 28, 3, '', '', '', false);
--INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        --VALUES (15, 'BEP', 21, 3, '', '', '', false);
--INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        --VALUES (16, 'EMA', 21, 3, '', '', '', false);
--INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        --VALUES (17, 'CO', 21, 3, '', '', '', false);
--INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        --VALUES (18, 'VDC', 28, 3, '', '', '', false);
--INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        --VALUES (19, 'VC', 21, 3, '', '', '', false);
--INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        --VALUES (20, 'IE', 28, 3, '', '', '', false);
--INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        --VALUES (21, 'VP16 Holoxan', 21, 3, '', '', '', false);
--INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        --VALUES (22, 'API', 28, 3, '', '', '', false);

--molecules
INSERT INTO public.molecule (id, name, way, "perfusionType", comment) VALUES (1, 'Paclitaxel', 'IV', '', '');
INSERT INTO public.molecule (id, name, way, "perfusionType", comment) VALUES (2, 'Docétaxel', 'IV', '', '');
INSERT INTO public.molecule (id, name, way, "perfusionType", comment) VALUES (3, 'Gemcitabine', 'IV', '', '');
INSERT INTO public.molecule (id, name, way, "perfusionType", comment) VALUES (4, 'Vinorelbine', 'IV', '', '');
INSERT INTO public.molecule (id, name, way, "perfusionType", comment) VALUES (5, 'Carboplatine', 'IV', '', '');
INSERT INTO public.molecule (id, name, way, "perfusionType", comment) VALUES (6, 'Trastuzumab', 'IV', '', '');
INSERT INTO public.molecule (id, name, way, "perfusionType", comment) VALUES (7, 'Acide zolédronique', 'IV', '', '');
INSERT INTO public.molecule (id, name, way, "perfusionType", comment) VALUES (8, 'Cisplatine', 'IV', '', '');
INSERT INTO public.molecule (id, name, way, "perfusionType", comment) VALUES (9, 'Pertuzumab', 'IV', '', '');
INSERT INTO public.molecule (id, name, way, "perfusionType", comment) VALUES (10, 'Bevacizumab', 'IV', '', '');
INSERT INTO public.molecule (id, name, way, "perfusionType", comment) VALUES (11, 'Cetuximab', 'IV', '', '');
INSERT INTO public.molecule (id, name, way, "perfusionType", comment) VALUES (12, 'Adriamycine', 'IV', '', '');
INSERT INTO public.molecule (id, name, way, "perfusionType", comment) VALUES (13, 'Pemetrexed', 'IV', '', '');
INSERT INTO public.molecule (id, name, way, "perfusionType", comment) VALUES (14, 'Méthotrexate', 'IV', '', '');
INSERT INTO public.molecule (id, name, way, "perfusionType", comment) VALUES (15, 'Bléomycine', 'IV', '', '');
INSERT INTO public.molecule (id, name, way, "perfusionType", comment) VALUES (16, 'Actinomycine', 'IV', '', '');
INSERT INTO public.molecule (id, name, way, "perfusionType", comment) VALUES (17, 'Vincristine', 'IV', '', '');
INSERT INTO public.molecule (id, name, way, "perfusionType", comment) VALUES (18, 'Vinblastine', 'IV', '', '');
INSERT INTO public.molecule (id, name, way, "perfusionType", comment) VALUES (19, 'Oxaliplatine', 'IV', '', '');
INSERT INTO public.molecule (id, name, way, "perfusionType", comment) VALUES (20, 'Etoposide', 'IV', '', '');
INSERT INTO public.molecule (id, name, way, "perfusionType", comment) VALUES (21, 'Ifosfamide', 'IV', '', '');
INSERT INTO public.molecule (id, name, way, "perfusionType", comment) VALUES (22, 'Mesna', 'IV', '', '');
INSERT INTO public.molecule (id, name, way, "perfusionType", comment) VALUES (26, 'Acide folinique', 'IV', '', '');
INSERT INTO public.molecule (id, name, way, "perfusionType", comment) VALUES (27, 'Fluorouracile', 'IV', '', '');

-- details prep molecule
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (1, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 19);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (2, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 26);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (3, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 27);

-- relation between 
INSERT INTO public.protocole_molecule_association (id, day, "moleculeId", "protocolId", dose, unite) VALUES (1, 1, 19, 1, 85, 'mg/m');
INSERT INTO public.protocole_molecule_association (id, day, "moleculeId", "protocolId", dose, unite) VALUES (2, 1, 26, 1, 400, 'mg/m');
INSERT INTO public.protocole_molecule_association (id, day, "moleculeId", "protocolId", dose, unite) VALUES (3, 1, 27, 1, 1250, 'mg/m');
INSERT INTO public.protocole_molecule_association (id, day, "moleculeId", "protocolId", dose, unite) VALUES (4, 2, 27, 1, 1250, 'mg/m');