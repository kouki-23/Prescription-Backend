-- user data
INSERT INTO public."user" (name, username, password, role, "serviceType") VALUES ('Adem', 'medecin', '$2b$10$MgUrAjXg24ChRwvMR.9ji.dfQyCRRNdFp9dbG60CS9ob9UCFzPz9u', 'medecin', NULL);
INSERT INTO public."user" (name, username, password, role, "serviceType") VALUES ('Mohammed', 'admin', '$2b$10$JoWagb3KbcCNDuskbr4RAuZ3PKrNG4YPHtCHxYkZW7CpOj5VJAU86', 'admin', NULL);
INSERT INTO public."user" (name, username, password, role, "serviceType") VALUES ('Eya', 'pharmacien', '$2b$10$AAYFLnY1qfTzQGeoVWhuL.hrpqQmfz9Qnv3gzKYoIsByRotYq683e', 'pharmacien', NULL);
INSERT INTO public."user" (name, username, password, role, "serviceType") VALUES ('n.mejri', 'n.mejri', '$2a$10$6HcJMvP7QAMm/7V.dG.op.vw8bznGHx3OohEdkd8O8AMDlaFVWYYi', 'medecin', NULL);
INSERT INTO public."user" (name, username, password, role, "serviceType") VALUES ('a.hamdi', 'a.hamdi', '$2a$10$6g1i2iiKjTEwr2td/r64nO9BttMp208YSyG7kEWS/ZZPjZ0mDF6/6', 'medecin', NULL);
INSERT INTO public."user" (name, username, password, role, "serviceType") VALUES ('f.mghirbi', 'f.mghirbi', '$2a$10$7/xKgEQqXwjHu2dVOcS7Ee3EyOAkhXRPNYDWN9h78ONkZCnsXiEly', 'medecin', NULL);

--protocol
--INSERT INTO public.protocol(id, name, intercure, "nbCures", details, indications, "histoType", "isCreated") 
        --VALUES (1, 'FOLFOX', 14, 3, '', '', '', false);
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
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (1, 'Paclitaxel', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (2, 'Docétaxel', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (3, 'Gemcitabine', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (4, 'Vinorelbine', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (5, 'Carboplatine', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (6, 'Trastuzumab', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (7, 'Acide zolédronique', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (8, 'Cisplatine', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (9, 'Pertuzumab', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (10, 'Bevacizumab', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (11, 'Cetuximab', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (12, 'Adriamycine', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (13, 'Pemetrexed', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (14, 'Méthotrexate', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (15, 'Bléomycine', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (16, 'Actinomycine', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (17, 'Vincristine', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (18, 'Vinblastine', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (19, 'Oxaliplatine', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (20, 'Etoposide', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (21, 'Ifosfamide', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (22, 'Mesna', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (23, 'Atezolizumab', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (24, 'Pembrolizumab', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (25, 'Nivolumab', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (26, 'Acide folinique', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (27, 'Fluorouracile', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (28, 'Irinotecan', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (29, 'Epirubicine', 'IV', '');
INSERT INTO public.molecule(
	id, name, way,comment)
	VALUES (30, 'Cyclophosphamide', 'IV', '');

---Products

-- Paclitaxel
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Paclitaxel', 150, 'mg', 5, 'mL', true, 'Cremophor EL 6%/Ethanol 13%', 25, 'mL', true, 250, 'mL', 0.3, 1.2, 'mg/mL', true, 28, true, true, 1, false);

-- Docétaxel
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Docétaxel', 160, 'mg', 8, 'mL', true, 'Polysorbate 80', 8, 'mL', true, 250, 'mL', 0.3, 0.74, 'mg/mL', true, 8, true, true, 2, false);

-- Gemcitabine
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Gemcitabine', 1000, 'mg', 40, 'mL', true, 'Sterile Water for Injection', 0, 'mL', true, 0, 'mL', 5, 50, 'mg/mL', true, 12, true, true, 3, false);

-- Vinorelbine
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Vinorelbine', 50, 'mg', 1, 'mL', true, 'Water for Injection', 0, 'mL', true, 0, 'mL', 1.5, 3, 'mg/mL', true, 8, true, true, 4, false);

-- Carboplatine
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Carboplatine', 10, 'mg', 1, 'mL', true, 'Glucose 50 mg/mL', 100, 'mL', true, 0, 'mL', 0.02, 0.2, 'mg/mL', true, 8, true, true, 5, false);

-- Trastuzumab
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Trastuzumab', 440, 'mg', 20, 'mL', true, 'Water for Injection', 0, 'mL', true, 0, 'mL', 10, 20, 'mg/mL', true, 48, true, true, 6, false);

-- Acide zolédronique
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Acide zolédronique', 4, 'mg', 5, 'mL', true, 'Sterile Water for Injection', 0, 'mL', true, 0, 'mL', 0.4, 2, 'mg/mL', true, 24, true, true, 7, false);

-- Cisplatine
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Cisplatine', 50, 'mg', 50, 'mL', true, 'Sterile Water for Injection', 0, 'mL', true, 0, 'mL', 0.5, 1, 'mg/mL', true, 24, true, true, 8, false);

-- Pertuzumab
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Pertuzumab', 420, 'mg', 14, 'mL', true, 'Sterile Water for Injection', 0, 'mL', true, 0, 'mL', 3.8, 30, 'mg/mL', true, 24, true, true, 9, false);

-- Bevacizumab  
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Bevacizumab', 400, 'mg', 16, 'mL', true, 'Sterile Water for Injection', 0, 'mL', true, 0, 'mL', 1.4, 16.5, 'mg/mL', true, 30, true, false, 10, false);

-- Cetuximab
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Cetuximab', 100, 'mg', 20, 'mL', true, 'Sterile Water for Injection', 0, 'mL', true, 0, 'mL', 0.5, 2, 'mg/mL', true, 12, true, false, 11, false);

-- Adriamycine  
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Adriamycine', 10, 'mg', 5, 'mL', true, 'Sterile Water for Injection', 0, 'mL', true, 250, 'mL', 0.04, 0.1, 'mg/mL', true, 24, true, true, 12, false);

-- Pemetrexed
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Pemetrexed', 500, 'mg', 20, 'mL', true, 'Sterile Water for Injection', 0, 'mL', true, 0, 'mL', 3.7, 25, 'mg/mL', true, 24, true, true, 13, false);

-- Méthotrexate  
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Méthotrexate', 25, 'mg', 2, 'mL', true, 'Sterile Water for Injection', 0, 'mL', true, 0, 'mL', 0.05, 25, 'mg/mL', true, 24, true, true, 14, false);

-- Bléomycine
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Bléomycine', 15, 'mg', 10, 'mL', true, 'Sterile Water for Injection', 0, 'mL', true, 0, 'mL', 0.6, 1.5, 'mg/mL', true, 24, true, true, 15, false);

-- Actinomycine
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Actinomycine', 0.5, 'mg', 1, 'mL', true, 'Sterile Water for Injection', 0, 'mL', true, 0, 'mL', 0.005, 0.05, 'mg/mL', true, 24, true, true, 16, false);  
-- Vincristine
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Vincristine', 1, 'mg', 1, 'mL', true, 'Sterile Water for Injection', 0, 'mL', true, 0, 'mL', 0.01, 0.1, 'mg/mL', true, 24, true, true, 17, false);

-- Vinblastine
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Vinblastine', 10, 'mg', 10, 'mL', true, 'Sterile Water for Injection', 0, 'mL', true, 0, 'mL', 0.1, 1, 'mg/mL', true, 24, true, true, 18, false);
 
-- Oxaliplatine
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)  
VALUES ('Oxaliplatine', 100, 'mg', 20, 'mL', true, 'Glucose 5%', 0, 'mL', true, 500, 'mL', 0.07, 0.7, 'mg/mL', true, 24, true, false, 19, false);

-- Etoposide
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Etoposide', 100, 'mg', 5, 'mL', true, 'Sterile Water for Injection', 0, 'mL', true, 0, 'mL', 0.1, 0.8, 'mg/mL', true, 24, true, true, 20, false);

-- Ifosfamide
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Ifosfamide', 1000, 'mg', 20, 'mL', true, 'Sterile Water for Injection', 60, 'mL', true, 0, 'mL', 10, 60, 'mg/mL', true, 24, true, true, 21, false);

-- Mesna
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Mesna', 400, 'mg', 4, 'mL', true, 'Sterile Water for Injection', 0, 'mL', true, 100, 'mL', 4, 40, 'mg/mL', true, 24, true, true, 22, false);

-- Atezolizumab
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Atezolizumab', 1200, 'mg', 20, 'mL', true, 'Sterile Water for Injection', 0, 'mL', true, 0, 'mL', 3.2, 60, 'mg/mL', true, 24, true, true, 23, false);

-- Pembrolizumab
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)  
VALUES ('Pembrolizumab', 100, 'mg', 4, 'mL', true, 'Sterile Water for Injection', 0, 'mL', true, 0, 'mL', 1, 25, 'mg/mL', true, 24, true, false, 24, false);

-- Nivolumab
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Nivolumab', 100, 'mg', 10, 'mL', true, 'Sterile Water for Injection', 0, 'mL', true, 0, 'mL', 1, 10, 'mg/mL', true, 24, true, false, 25, false);

-- Acide folinique
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Acide folinique', 15, 'mg', 2, 'mL', true, 'Sterile Water for Injection', 0, 'mL', true, 0, 'mL', 0.15, 7.5, 'mg/mL', true, 24, true, true, 26, false);

-- Fluorouracile
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Fluorouracile', 500, 'mg', 20, 'mL', true, 'Sterile Water for Injection', 0, 'mL', true, 0, 'mL', 5, 50, 'mg/mL', true, 8, true, true, 27, false);  

-- Irinotecan
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Irinotecan', 100, 'mg', 5, 'mL', true, 'Sterile Water for Injection', 25, 'mL', true, 0, 'mL', 0.12, 3.5, 'mg/mL', true, 24, true, true, 28, false);

-- Epirubicine 
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled)
VALUES ('Epirubicine', 50, 'mg', 25, 'mL', true, 'Sterile Water for Injection', 0, 'mL', true, 0, 'mL', 0.2, 2, 'mg/mL', true, 24, true, true, 29, false);

-- Cyclophosphamide
INSERT INTO public.product(specialite, dosage, "dosageUnite", volume, "volumeUnite", "isReconstruct", "solventReconstitution", "volumeReconstitution", "volumeReconstitutionUnite", "conservationReconstitutionFridge", "dilutionVolume", "dilutionVolumeUnite", "minConcentrarion", "maxConcentrarion", "concentrationUnite", "conservrationDilutionFridge", "concervationtionPeriodDilution", "lightShelter", "SensivityPVC", "moleculeId", disabled) 
VALUES ('Cyclophosphamide', 1000, 'mg', 50, 'mL', true, 'Sterile Water for Injection', 0, 'mL', true, 0, 'mL', 3.3, 40, 'mg/mL', true, 24, true, true, 30, false);


--Protocols
INSERT INTO public.protocol VALUES (1, 'FOLFOX', 14, 3, '', '', '', false);
INSERT INTO public.protocol VALUES (3, 'EC', 21, 3, '', '', '', false);
INSERT INTO public.protocol VALUES (12, 'FLOT', 14, 3, '', '', '', false);
INSERT INTO public.protocol VALUES (13, 'Pembrolizumab', 21, 6, 'Pembrolizumab ', 'Métastatique ', '', true);
INSERT INTO public.protocol VALUES (14, 'Taxol-Carboplatine', 21, 6, '', '', '', true);
INSERT INTO public.protocol VALUES (15, 'Gemzar-Cisplatine', 21, 6, '', 'Cancer du poumon', '', true);
INSERT INTO public.protocol VALUES (16, 'Folfox', 15, 12, '', 'ADK colon droit carcinose P', 'ADK mucineux', true);
INSERT INTO public.protocol VALUES (17, 'Folfox', 15, 12, '', 'ADK colon droit carcinose P', 'ADK mucineux', true);
INSERT INTO public.protocol VALUES (18, 'Docétaxel sein 100mg', 21, 3, 'Docetaxel', 'Cancer du sein', '', true);
INSERT INTO public.protocol VALUES (19, 'Docetaxel seul 75', 21, 3, 'Docétaxel', 'Cancer du sein, du poumon, prostate', '', true);
INSERT INTO public.protocol VALUES (20, 'Taxol hebdo', 21, 3, 'Paclitaxel', 'Cancer du sein, ovaire', '', true);
INSERT INTO public.protocol VALUES (21, 'Taxol 3w', 21, 3, 'Pacitaxel', 'Cancer de l''ovaire, cancer du poumon ', '', true);
INSERT INTO public.protocol VALUES (22, 'FOLFOX Rapido', 15, 9, 'Folfox', 'cancer du rectum', '', true);
INSERT INTO public.protocol VALUES (23, 'FOLFIRI', 15, 6, 'FOLFIRI', 'Cancers digestifs', '', true);
INSERT INTO public.protocol VALUES (24, 'Gemzar seul J1-J8', 21, 3, '', 'Cancers métastatiques', '', true);
INSERT INTO public.protocol VALUES (25, 'Gemzar S7/8', 56, 1, '', 'Pancréas métastatique', '', true);
INSERT INTO public.protocol VALUES (26, 'Gemzar 3S/4', 28, 3, '', 'Pancréas métastatique', '', true);
INSERT INTO public.protocol VALUES (27, 'Navelbine seule', 21, 3, 'Navelbine', 'Cancer du sein et du poumon ', '', true);
INSERT INTO public.protocol VALUES (28, 'Trastuzumab dose de charge', 21, 18, '', 'cancer du sein ', '', true);
INSERT INTO public.protocol VALUES (29, 'Trastuzumab 3S', 21, 18, '', 'Cancer du sein ', '', true);
INSERT INTO public.protocol VALUES (30, 'Trastu-Pertu-Doc ', 21, 6, '', 'Cancer du sein métastatique', '', true);
INSERT INTO public.protocol VALUES (31, 'TC', 21, 6, '', 'Cancer du sein ', '', true);
INSERT INTO public.protocol VALUES (32, 'TC', 21, 6, '', 'Cancer du sein ', '', true);


--relations protocols molecules
INSERT INTO public.protocole_molecule_association VALUES (4, 1, 50, 'mg/m²', 'Perf continue', 2, 12);
INSERT INTO public.protocole_molecule_association VALUES (5, 1, 85, 'mg/m²', 'Perf continue', 19, 12);
INSERT INTO public.protocole_molecule_association VALUES (6, 1, 400, 'mg/m²', 'Perf continue', 7, 12);
INSERT INTO public.protocole_molecule_association VALUES (7, 1, 2600, 'mg/m²', 'Perf continue', 27, 12);
INSERT INTO public.protocole_molecule_association VALUES (8, 1, 100, 'mg/m²', 'Perf continue', 29, 3);
INSERT INTO public.protocole_molecule_association VALUES (9, 1, 600, 'mg/m²', 'Perf continue', 30, 3);
INSERT INTO public.protocole_molecule_association VALUES (10, 1, 175, 'mg/m²', 'Perf continue', 1, 14);
INSERT INTO public.protocole_molecule_association VALUES (11, 1, 6, 'AUC', 'Perf continue', 5, 14);
INSERT INTO public.protocole_molecule_association VALUES (12, 1, 1250, 'mg/m²', 'Perf continue', 3, 15);
INSERT INTO public.protocole_molecule_association VALUES (13, 8, 1250, 'mg/m²', 'Perf continue', 3, 15);
INSERT INTO public.protocole_molecule_association VALUES (14, 1, 75, 'mg/m²', 'Perf continue', 8, 15);
INSERT INTO public.protocole_molecule_association VALUES (15, 1, 85, 'mg/m²', 'Perf continue', 19, 17);
INSERT INTO public.protocole_molecule_association VALUES (16, 5, 85, 'mg/m²', 'Perf continue', 19, 17);
INSERT INTO public.protocole_molecule_association VALUES (17, 1, 400, 'mg/m²', 'Perf continue', 26, 17);
INSERT INTO public.protocole_molecule_association VALUES (18, 5, 400, 'mg/m²', 'Perf continue', 26, 17);
INSERT INTO public.protocole_molecule_association VALUES (19, 1, 2400, 'mg/m²', 'Infuseur 48h', 27, 17);
INSERT INTO public.protocole_molecule_association VALUES (20, 5, 2400, 'mg/m²', 'Infuseur 48h', 27, 17);
INSERT INTO public.protocole_molecule_association VALUES (21, 1, 100, 'mg/m²', 'Perf continue', 2, 18);
INSERT INTO public.protocole_molecule_association VALUES (22, 1, 75, 'mg/m²', 'Perf continue', 2, 19);
INSERT INTO public.protocole_molecule_association VALUES (23, 1, 80, 'mg/m²', 'Perf continue', 1, 20);
INSERT INTO public.protocole_molecule_association VALUES (24, 8, 80, 'mg/m²', 'Perf continue', 1, 20);
INSERT INTO public.protocole_molecule_association VALUES (25, 15, 80, 'mg/m²', 'Perf continue', 1, 20);
INSERT INTO public.protocole_molecule_association VALUES (26, 1, 175, 'mg/m²', 'Perf continue', 1, 21);
INSERT INTO public.protocole_molecule_association VALUES (27, 1, 85, 'mg/m²', 'Perf continue', 19, 22);
INSERT INTO public.protocole_molecule_association VALUES (28, 1, 400, 'mg/m²', 'Perf continue', 26, 22);
INSERT INTO public.protocole_molecule_association VALUES (29, 1, 400, 'mg/m²', 'Bolus', 27, 22);
INSERT INTO public.protocole_molecule_association VALUES (30, 1, 1200, 'mg/m²', 'Infuseur 48h', 27, 22);
INSERT INTO public.protocole_molecule_association VALUES (31, 1, 180, 'mg/m²', 'Perf continue', 28, 23);
INSERT INTO public.protocole_molecule_association VALUES (32, 1, 400, 'mg/m²', 'Perf continue', 26, 23);
INSERT INTO public.protocole_molecule_association VALUES (33, 1, 2400, 'mg/m²', 'Infuseur 48h', 27, 23);
INSERT INTO public.protocole_molecule_association VALUES (34, 1, 1250, 'mg/m²', 'Perf continue', 3, 24);
INSERT INTO public.protocole_molecule_association VALUES (35, 8, 1250, 'mg/m²', 'Perf continue', 3, 24);
INSERT INTO public.protocole_molecule_association VALUES (36, 1, 1000, 'mg/m²', 'Perf continue', 3, 25);
INSERT INTO public.protocole_molecule_association VALUES (37, 8, 1000, 'mg/m²', 'Perf continue', 3, 25);
INSERT INTO public.protocole_molecule_association VALUES (38, 15, 1000, 'mg/m²', 'Perf continue', 3, 25);
INSERT INTO public.protocole_molecule_association VALUES (39, 21, 1000, 'mg/m²', 'Perf continue', 3, 25);
INSERT INTO public.protocole_molecule_association VALUES (40, 28, 1000, 'mg/m²', 'Perf continue', 3, 25);
INSERT INTO public.protocole_molecule_association VALUES (41, 35, 1000, 'mg/m²', 'Perf continue', 3, 25);
INSERT INTO public.protocole_molecule_association VALUES (42, 42, 1000, 'mg/m²', 'Perf continue', 3, 25);
INSERT INTO public.protocole_molecule_association VALUES (43, 49, 1000, 'mg/m²', 'Perf continue', 3, 25);
INSERT INTO public.protocole_molecule_association VALUES (44, 1, 1000, 'mg/m²', 'Perf continue', 3, 26);
INSERT INTO public.protocole_molecule_association VALUES (45, 8, 1000, 'mg/m²', 'Perf continue', 3, 26);
INSERT INTO public.protocole_molecule_association VALUES (46, 15, 1000, 'mg/m²', 'Perf continue', 3, 26);
INSERT INTO public.protocole_molecule_association VALUES (47, 1, 25, 'mg/m²', 'Bolus', 4, 27);
INSERT INTO public.protocole_molecule_association VALUES (48, 8, 25, 'mg/m²', 'Bolus', 4, 27);
INSERT INTO public.protocole_molecule_association VALUES (49, 1, 8, 'mg/kg', 'Perf continue', 6, 28);
INSERT INTO public.protocole_molecule_association VALUES (50, 1, 6, 'mg/kg', 'Perf continue', 6, 29);
INSERT INTO public.protocole_molecule_association VALUES (51, 1, 6, 'mg/kg', 'Perf continue', 6, 30);
INSERT INTO public.protocole_molecule_association VALUES (52, 1, 420, 'mg', 'Perf continue', 9, 30);
INSERT INTO public.protocole_molecule_association VALUES (53, 1, 75, 'mg/m²', 'Perf continue', 2, 30);
INSERT INTO public.protocole_molecule_association VALUES (54, 1, 75, 'mg/m²', 'Perf continue', 2, 31);
INSERT INTO public.protocole_molecule_association VALUES (55, 1, 600, 'mg/m²', 'Perf continue', 30, 31);
INSERT INTO public.protocole_molecule_association VALUES (56, 1, 75, 'mg/m²', 'Perf continue', 2, 32);
INSERT INTO public.protocole_molecule_association VALUES (57, 1, 600, 'mg/m²', 'Perf continue', 30, 32);
INSERT INTO public.protocole_molecule_association VALUES (58, 1, 85, 'mg/m²', 'Perf continue', 19, 1);
INSERT INTO public.protocole_molecule_association VALUES (59, 1, 400, 'mg/m²', 'Perf continue', 26, 1);
INSERT INTO public.protocole_molecule_association VALUES (60, 1, 2500, 'mg/m²', 'Perf continue', 27, 1);

SELECT pg_catalog.setval('public.protocole_molecule_association_id_seq', 60, true);
