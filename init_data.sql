-- user data
INSERT INTO public."user" (id, name, username, password, role, "serviceType") VALUES (1, 'Adem', 'medecin', '$2b$10$MgUrAjXg24ChRwvMR.9ji.dfQyCRRNdFp9dbG60CS9ob9UCFzPz9u', 'medecin', NULL);
INSERT INTO public."user" (id, name, username, password, role, "serviceType") VALUES (2, 'Mohammed', 'admin', '$2b$10$JoWagb3KbcCNDuskbr4RAuZ3PKrNG4YPHtCHxYkZW7CpOj5VJAU86', 'admin', NULL);
INSERT INTO public."user" (id, name, username, password, role, "serviceType") VALUES (3, 'Eya', 'pharmacien', '$2b$10$AAYFLnY1qfTzQGeoVWhuL.hrpqQmfz9Qnv3gzKYoIsByRotYq683e', 'pharmacien', NULL);
INSERT INTO public."user" (id, name, username, password, role, "serviceType") VALUES (4, 'n.mejri', 'n.mejri', '$2a$10$6HcJMvP7QAMm/7V.dG.op.vw8bznGHx3OohEdkd8O8AMDlaFVWYYi', 'medecin', NULL);
INSERT INTO public."user" (id, name, username, password, role, "serviceType") VALUES (5, 'a.hamdi', 'a.hamdi', '$2a$10$6g1i2iiKjTEwr2td/r64nO9BttMp208YSyG7kEWS/ZZPjZ0mDF6/6', 'medecin', NULL);
INSERT INTO public."user" (id, name, username, password, role, "serviceType") VALUES (6, 'f.mghirbi', 'f.mghirbi', '$2a$10$7/xKgEQqXwjHu2dVOcS7Ee3EyOAkhXRPNYDWN9h78ONkZCnsXiEly', 'medecin', NULL);

--protocol
INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        VALUES (1, 'FOLFOX', 14, 3, '', '', '', false);
--INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        --VALUES (2, 'Taxol-Carboplatine', 21, 3, '', '', '', false);
INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        VALUES (3, 'EC', 21, 3, '', '', '', false);
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
INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        VALUES (12, 'FLOT', 14, 3, '', '', '', false);
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
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (1, 'Paclitaxel', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (2, 'Docétaxel', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (3, 'Gemcitabine', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (4, 'Vinorelbine', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (5, 'Carboplatine', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (6, 'Trastuzumab', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (7, 'Acide zolédronique', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (8, 'Cisplatine', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (9, 'Pertuzumab', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (10, 'Bevacizumab', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (11, 'Cetuximab', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (12, 'Adriamycine', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (13, 'Pemetrexed', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (14, 'Méthotrexate', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (15, 'Bléomycine', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (16, 'Actinomycine', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (17, 'Vincristine', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (18, 'Vinblastine', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (19, 'Oxaliplatine', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (20, 'Etoposide', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (21, 'Ifosfamide', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (22, 'Mesna', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (23, 'Atezolizumab', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (24, 'Pembrolizumab', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (25, 'Nivolumab', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (26, 'Acide folinique', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (27, 'Fluorouracile', 'IV', 'Infuseur 48h', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (28, 'Irinotecan', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (29, 'Epirubicine', 'IV', 'Perf continue', '');
INSERT INTO public.molecule(
	id, name, way, "perfusionType", comment)
	VALUES (30, 'Cyclophosphamide', 'IV', 'Perf continue', '');

-- details prep molecule
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (1, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 1);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (2, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 2);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (3, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 3);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (4, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 4);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (5, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 5);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (6, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 6);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (7, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 7);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (8, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 8);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (9, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 9);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (10, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 10);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (11, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 11);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (12, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 12);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (13, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 13);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (14, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 14);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (15, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 15);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (16, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 16);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (17, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 17);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (18, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 18);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (19, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 19);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (20, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 20);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (21, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 21);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (22, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 22);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (23, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 23);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (24, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 24);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (25, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 25);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (26, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 26);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (27, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 27);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (28, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 28);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (29, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 29);
INSERT INTO public.detail_prep_molecule (id, dci, specialite, volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnity", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId") VALUES (30, '', '', 0, '', false, '', 0, '', false, 0, '', 0, 0, '', false, 0, false, false, 30);

-- relation between 
INSERT INTO public.protocole_molecule_association (id, day, "moleculeId", "protocolId", dose, unite) VALUES (1, 1, 19, 1, 85, 'mg/m²');
INSERT INTO public.protocole_molecule_association (id, day, "moleculeId", "protocolId", dose, unite) VALUES (2, 1, 26, 1, 400, 'mg/m²');
INSERT INTO public.protocole_molecule_association (id, day, "moleculeId", "protocolId", dose, unite) VALUES (3, 1, 27, 1, 2500, 'mg/m²');

INSERT INTO public.protocole_molecule_association (id, day, "moleculeId", "protocolId", dose, unite) VALUES (4, 1, 2, 12, 50, 'mg/m²');
INSERT INTO public.protocole_molecule_association (id, day, "moleculeId", "protocolId", dose, unite) VALUES (5, 1, 19, 12, 85, 'mg/m²');
INSERT INTO public.protocole_molecule_association (id, day, "moleculeId", "protocolId", dose, unite) VALUES (6, 1, 7, 12, 400, 'mg/m²');
INSERT INTO public.protocole_molecule_association (id, day, "moleculeId", "protocolId", dose, unite) VALUES (7, 1, 27, 12, 2600, 'mg/m²');

INSERT INTO public.protocole_molecule_association (id, day, "moleculeId", "protocolId", dose, unite) VALUES (8, 1, 29, 3, 100, 'mg/m²');
INSERT INTO public.protocole_molecule_association (id, day, "moleculeId", "protocolId", dose, unite) VALUES (9, 1, 30, 3, 600, 'mg/m²');