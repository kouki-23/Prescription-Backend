-- user data
INSERT INTO public."user" (name, username, password, role, "serviceType") VALUES ('Adem', 'medecin', '$2b$10$MgUrAjXg24ChRwvMR.9ji.dfQyCRRNdFp9dbG60CS9ob9UCFzPz9u', 'medecin', NULL);
INSERT INTO public."user" (name, username, password, role, "serviceType") VALUES ('Mohammed', 'admin', '$2b$10$JoWagb3KbcCNDuskbr4RAuZ3PKrNG4YPHtCHxYkZW7CpOj5VJAU86', 'admin', NULL);
INSERT INTO public."user" (name, username, password, role, "serviceType") VALUES ('Eya', 'pharmacien', '$2b$10$AAYFLnY1qfTzQGeoVWhuL.hrpqQmfz9Qnv3gzKYoIsByRotYq683e', 'pharmacien', NULL);
INSERT INTO public."user" (name, username, password, role, "serviceType") VALUES ('n.mejri', 'n.mejri', '$2a$10$6HcJMvP7QAMm/7V.dG.op.vw8bznGHx3OohEdkd8O8AMDlaFVWYYi', 'medecin', NULL);
INSERT INTO public."user" (name, username, password, role, "serviceType") VALUES ('a.hamdi', 'a.hamdi', '$2a$10$6g1i2iiKjTEwr2td/r64nO9BttMp208YSyG7kEWS/ZZPjZ0mDF6/6', 'medecin', NULL);
INSERT INTO public."user" (name, username, password, role, "serviceType") VALUES ('f.mghirbi', 'f.mghirbi', '$2a$10$7/xKgEQqXwjHu2dVOcS7Ee3EyOAkhXRPNYDWN9h78ONkZCnsXiEly', 'medecin', NULL);

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

-- relation between 
INSERT INTO public.protocole_molecule_association (day, "moleculeId", "protocolId", dose, unite, "perfusionType") VALUES (1, 19, 1, 85, 'mg/m²','Perf continue');
INSERT INTO public.protocole_molecule_association (day, "moleculeId", "protocolId", dose, unite, "perfusionType") VALUES (1, 26, 1, 400, 'mg/m²','Perf continue');
INSERT INTO public.protocole_molecule_association (day, "moleculeId", "protocolId", dose, unite, "perfusionType") VALUES (1, 27, 1, 2500, 'mg/m²','Perf continue');

INSERT INTO public.protocole_molecule_association (day, "moleculeId", "protocolId", dose, unite, "perfusionType") VALUES (1, 2, 12, 50, 'mg/m²','Perf continue');
INSERT INTO public.protocole_molecule_association (day, "moleculeId", "protocolId", dose, unite, "perfusionType") VALUES (1, 19, 12, 85, 'mg/m²','Perf continue');
INSERT INTO public.protocole_molecule_association (day, "moleculeId", "protocolId", dose, unite, "perfusionType") VALUES (1, 7, 12, 400, 'mg/m²','Perf continue');
INSERT INTO public.protocole_molecule_association (day, "moleculeId", "protocolId", dose, unite, "perfusionType") VALUES (1, 27, 12, 2600, 'mg/m²','Perf continue');

INSERT INTO public.protocole_molecule_association (day, "moleculeId", "protocolId", dose, unite, "perfusionType") VALUES (1, 29, 3, 100, 'mg/m²','Perf continue');
INSERT INTO public.protocole_molecule_association (day, "moleculeId", "protocolId", dose, unite, "perfusionType") VALUES (1, 30, 3, 600, 'mg/m²','Perf continue');