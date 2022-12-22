import { getNameAccessFromId } from "./constants";

describe('Access Code Name', () => {
    it('Vérification access code Invité', () => {
        expect(getNameAccessFromId(0)).toBe("Invité");
      });
      it('Vérification access code Utilisateur', () => {
        expect(getNameAccessFromId(1)).toBe("Utilisateur");
      });          
    it('Vérification access code Administrateur', () => {
      expect(getNameAccessFromId(2)).toBe("Administrateur");
    });
  });
  