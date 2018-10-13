import 'mocha';
import { expect, AssertionError } from 'chai';

import { chaiErrorToBool } from '../src/index';


describe('chaiErrorToBool', function () {
    it('should return true when block does not raise chai assertionError', function () {
        expect(chaiErrorToBool(() => true)).to.equal(true);
        expect(chaiErrorToBool(() => false)).to.equal(true);
        expect(chaiErrorToBool(() => 'str')).to.equal(true);
        expect(chaiErrorToBool(() => 42)).to.equal(true);
    });

    it('should return false when block raises chai assertionError', function () {
        expect(chaiErrorToBool(() => {
            expect(false).to.equal(true);
        })).to.equal(false);
    });

    it('should throw an error when block raises an error other than chai assertionError', function () {
        expect(() => chaiErrorToBool(() => {
            throw new Error('this is not an error');
        })).to.throw(Error).with.property('message', 'this is not an error');
    });

    describe('when block returns a Promise', function () {
        it('should return true when blocks Promise does not raise chai assertionError', async function () {
            expect(await chaiErrorToBool(() => new Promise(resolve => { setTimeout(() => resolve(true), 1) }))).to.equal(true);
            expect(await chaiErrorToBool(() => new Promise(resolve => { setTimeout(() => resolve(false), 1) }))).to.equal(true);
            expect(await chaiErrorToBool(() => new Promise(resolve => { setTimeout(() => resolve('str'), 1) }))).to.equal(true);
            expect(await chaiErrorToBool(() => new Promise(resolve => { setTimeout(() => resolve(42), 1) }))).to.equal(true);
        });

        it('should return false when blocks Promise raises chai assertionError', async function () {
            expect(await chaiErrorToBool(async () => {
                expect(await new Promise(resolve => { setTimeout(() => resolve(false), 1) })).to.equal(true);
            })).to.equal(false);
        });

        it('should throw an error when blocks Promise raises an error other than chai assertionError', async function () {
            try {
                await chaiErrorToBool(() => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => reject(new Error('this is not an error')), 1)
                    });
                });
                expect(true).to.equal(false, 'Should throw error');
            } catch (err) {
                expect(err).to.be.instanceof(Error).with.property('message', 'this is not an error');
            }
        });
    });
});
