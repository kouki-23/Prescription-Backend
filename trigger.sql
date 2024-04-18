CREATE OR REPLACE FUNCTION check_cure_status()
RETURNS TRIGGER AS $$
DECLARE
    cure_id INTEGER;
    prescription_id INTEGER;
    total_preparations INTEGER;
    finished_preparations INTEGER;
    next_cure_id INTEGER;
BEGIN
    SELECT "cureId" INTO cure_id
    FROM prep_molecule
    WHERE id = NEW.id;

    SELECT COUNT(*) INTO total_preparations FROM prep_molecule WHERE "cureId" = cure_id;

    SELECT COUNT(*) INTO finished_preparations FROM prep_molecule WHERE "cureId" = cure_id AND finished = TRUE;

    IF finished_preparations = total_preparations THEN
        UPDATE cure SET "state" = 'Terminée' WHERE id = cure_id;

        SELECT "prescriptionId" INTO prescription_id 
        FROM cure
        WHERE id = cure_id;

        SELECT id INTO next_cure_id
        FROM cure
        WHERE "prescriptionId" = prescription_id AND "state" = 'Prévu'
        ORDER BY "startDate"
        LIMIT 1;

        IF next_cure_id IS NOT NULL THEN
            UPDATE cure SET "state" = 'En cours' WHERE id = next_cure_id;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_cure_status_trigger
AFTER UPDATE ON prep_molecule
FOR EACH ROW
EXECUTE FUNCTION check_cure_status();

DROP TRIGGER check_cure_status_trigger ON prep_molecule;