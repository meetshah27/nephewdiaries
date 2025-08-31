import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== NEPHEW DIARIES - BIRTHDAY TIME CAPSULE ===============================
This schema creates a birthday message time capsule for a nephew where:
- Family members can add birthday messages for specific ages
- Messages unlock on each birthday (February 20th)
- Admin users can add/edit messages
- Countdown to next birthday is tracked
=========================================================================*/

const schema = a.schema({
  BirthdayMessage: a
    .model({
      age: a.integer().required(), // Age this message is for (1, 2, 3, etc.)
      title: a.string().required(), // Message title
      content: a.string().required(), // Text message content
      videoUrl: a.string(), // Optional video URL
      fromFamilyMember: a.string().required(), // Who sent this message
      isUnlocked: a.boolean().default(false), // Whether this message can be viewed
      unlockDate: a.string().required(), // When this message unlocks (birthday date)
      createdAt: a.string().required(), // When message was created
    })
    .authorization((allow) => [
      // Admin users can create, read, update, delete
      allow.owner(),
      // Public can read unlocked messages
      allow.public().read().when((ctx) => ctx.arguments.isUnlocked === true),
    ]),

  User: a
    .model({
      email: a.string().required(),
      name: a.string().required(),
      password: a.string().required(), // Password for custom authentication
      role: a.enum(['admin', 'family']).default('family'),
      isActive: a.boolean().default(true),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.public().read(),
    ]),

  BirthdayCountdown: a
    .model({
      currentAge: a.integer().required(),
      nextBirthday: a.string().required(), // ISO date string
      daysUntilBirthday: a.integer().required(),
      birthDate: a.string().required(), // Original birth date
    })
    .authorization((allow) => [
      allow.public().read(),
      allow.owner(),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    // API Key for public read access to unlocked messages
    apiKeyAuthorizationMode: {
      expiresInDays: 365,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
