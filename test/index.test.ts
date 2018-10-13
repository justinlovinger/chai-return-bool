import 'mocha';
import { expect, AssertionError } from 'chai';

import { returnBool } from '../src/index';


describe('returnBool', function () {
    it('should return true when block does not raise chai assertionError', function () {
        expect(returnBool(() => true)).to.equal(true);
        expect(returnBool(() => false)).to.equal(true);
        expect(returnBool(() => 'str')).to.equal(true);
        expect(returnBool(() => 42)).to.equal(true);
    });

    it('should return false when block raises chai assertionError', function () {
        expect(returnBool(() => {
            expect(false).to.equal(true);
        })).to.equal(false);
    });

    it('should throw an error when block raises an error other than chai assertionError', function () {
        expect(() => returnBool(() => {
            throw new Error('this is not an error');
        })).to.throw(Error).with.property('message', 'this is not an error');
    });

    describe('when block returns a Promise', function () {
        it('should return true when blocks Promise does not raise chai assertionError', async function () {
            expect(await returnBool(() => new Promise(resolve => { setTimeout(() => resolve(true), 1) }))).to.equal(true);
            expect(await returnBool(() => new Promise(resolve => { setTimeout(() => resolve(false), 1) }))).to.equal(true);
            expect(await returnBool(() => new Promise(resolve => { setTimeout(() => resolve('str'), 1) }))).to.equal(true);
            expect(await returnBool(() => new Promise(resolve => { setTimeout(() => resolve(42), 1) }))).to.equal(true);
        });

        it('should return false when blocks Promise raises chai assertionError', async function () {
            expect(await returnBool(async () => {
                expect(await new Promise(resolve => { setTimeout(() => resolve(false), 1) })).to.equal(true);
            })).to.equal(false);
        });

        it('should throw an error when blocks Promise raises an error other than chai assertionError', async function () {
            try {
                await returnBool(() => {
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
