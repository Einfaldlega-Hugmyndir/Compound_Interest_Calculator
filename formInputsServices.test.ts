import { OnlyPositiveNumbers } from "./src/services/formInputs";

describe('Character only a number', () => {

    test('should return only the numbers when input is mix of strings and numbers', () => {
        const number = OnlyPositiveNumbers("abc15478946jj7")
        expect(number).toBe("154789467")
    });
   
    test('should return "" when input is only a string', () => {
       const number = OnlyPositiveNumbers("abc")
       expect(number).toBe("")
    });

    test('should return the number when input is a positive number', () => {
        const number = OnlyPositiveNumbers("12345")
        expect(number).toBe("12345")
    });

   test('should return the positive number if input is negative', () => {
        const number = OnlyPositiveNumbers("-12345")
        expect(number).toBe("12345")
    });

    test('should return the number correctly if input contains -', () => {
        const number = OnlyPositiveNumbers("-12-34-5")
        expect(number).toBe("12345")
    });

    test('should return the number correctly if input contains .', () => {
        const number = OnlyPositiveNumbers("12345.011")
        expect(number).toBe("12345.011")
    });
});