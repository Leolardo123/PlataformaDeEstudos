import { ZodSchema } from 'zod';

/**
 * A Method Decorator that validates the first argument of a function
 * against a provided Zod schema.
 */
export function ValidateInput(schema: ZodSchema) {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      // Validate the first argument passed to the function
      const validationResult = schema.safeParse(args[0]);

      if (!validationResult.success) {
        // Throw or handle the validation error as needed by your framework
        throw new Error(
          `Validation failed for ${String(propertyKey)}: ${JSON.stringify(validationResult.error.format())}`,
        );
      }

      // Replace the argument with the securely parsed data (adds defaults, coerces types)
      args[0] = validationResult.data;

      // Execute original method execution
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
