import { AssertionError } from 'chai';

/**
 * Call block and return true if it does not raise a chai.AssertionError
 * 
 * Return false if block returns a chai.AssertionError
 * 
 * If any other exception is raised, that exception will not be caught by returnBool.
 */
export function returnBool<T>(block: () => T): T extends Promise<any> ? Promise<boolean> : boolean
export function returnBool(block: () => any): boolean | Promise<boolean> {
    try {
        const result = block();

        // Handle async
        if (result instanceof Promise) {
            return result
                .then(
                    () => true,
                    (err) => {
                        if (err instanceof AssertionError) {
                            return false;
                        } else {
                            throw err;
                        }
                    });
        }
        // Handle sync, here and in catch
        else {
            return true;
        }
    } catch (err) {
        if (err instanceof AssertionError) {
            return false;
        } else {
            throw err;
        }
    }
}
