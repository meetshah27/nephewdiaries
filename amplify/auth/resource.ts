import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource for Nephew Diaries
 * Only allows sign-in (no public sign-up) - nephew gets credentials from family
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    // Disable public sign-up - only admin can create accounts
    allowSignUp: false,
  },
  // Configure password requirements
  passwordFormat: {
    minLength: 8,
    requireLowercase: true,
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialCharacters: true,
  },
  // Configure user attributes
  userAttributes: {
    // Require email verification
    email: {
      required: true,
      mutable: true,
    },
    // Optional name attribute
    name: {
      required: false,
      mutable: true,
    },
  },
  // Configure verification
  verification: {
    email: true,
  },
});
