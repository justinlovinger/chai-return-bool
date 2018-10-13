import { AssertionError } from 'chai';

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
