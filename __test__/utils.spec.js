import { multiply } from '../src/api/utils';

describe('Utils', () =>{
	describe('multiply():', () => {
    test('should return 4', () => {
      var res = multiply(2, 3);
      expect(res).toEqual(6);
    });
  });
});
