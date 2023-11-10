import { ValidateService } from '.';

describe('ValidateService', () => {
  describe('checkEmail', () => {
    it('should return true if it is a valid email', () => {
      expect(ValidateService.checkEmail('valid@email.com')).toBe(true);
    });

    it('should return false if it is a invalid email', () => {
      expect(ValidateService.checkEmail('invalid.com')).toBe(false);
    });
  });

  describe('checkCellphone', () => {
    it('should return true if it is a valid mobile number', () => {
      expect(ValidateService.checkCellphone('13688886666')).toBe(true);
    });

    it('should return false if it is a invalid mobile number', () => {
      expect(ValidateService.checkCellphone('010-51829328')).toBe(false);
    });
  });

  describe('checkSpecial', () => {
    it('should return true if not includes special charactars', () => {
      expect(ValidateService.checkSpecial('12adfsdfADF')).toBe(true);
    });

    it('should return false if include special charactars', () => {
      expect(ValidateService.checkCellphone('*&sa13')).toBe(false);
    });
  });
});
