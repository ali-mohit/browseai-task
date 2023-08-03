import {describe, test, expect} from '@jest/globals'
import { test_ctrl } from '../app/main';


describe('testing project test procedures', () => {
    test('run test_ctrl method', () => {
        expect(test_ctrl('ALI MOHIT')).toBe(0);
    });
});
