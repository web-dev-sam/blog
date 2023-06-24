---
date: 2023-04-08
moddate: 2021-04-12
title: Boost Your JavaScript with JSDoc Typing
author: samuel-braun
cover: /assets/blog/boost-your-javascript-with-jsdoc-typing/cover.jpg.webp
devto: https://dev.to/samuel-braun/boost-your-javascript-with-jsdoc-typing-3hb3

tags:
  - javascript
  - typescript
  - tutorial
  - tooling
  - jsdoc
  - type checking

share:
  image: https://webry.com/assets/blog/boost-your-javascript-with-jsdoc-typing/cover.jpg.webp
  title: Boost Your JavaScript with JSDoc Typing
  description: >
    Explore my in-depth guide on leveraging JSDoc to enhance your JavaScript code with robust typing. Boost code quality, maintainability, and developer productivity with this powerful tool.
---
There are many reasons why you can't or don't want to use TypeScript in your project. One common reason is that you are using a legacy codebase that is not compatible with TypeScript. Or the switch to TypeScript is harder than everyone tells you. For whatever reason, you are stuck with JavaScript. But that doesnt completely mean you have to give up on the benefits of TypeScript. In this article, we will explore the magic of JSDoc typing, with which you can use most TypeScript features right away. 🧙‍♂️

<br>

So let's dive in! 🏊‍♂️ 

<br>

![Sweaty Sweat](/assets/blog/boost-your-javascript-with-jsdoc-typing/dive.gif)

This is my first blog post so I really appreciate any feedback you have. If you have any questions or suggestions, feel free to leave a comment below.

<br>

Here is an overview of the topics I'll cover in this post:
1. **TypeScript Types:** Here, we'll see how TypeScript types can be used in JSDoc. Don't worry if you're not familiar with TypeScript. I'll explain everything you need to know.

2. **More JSDoc Goodness:** After we've covered how to add types to your project, we'll take a look at some of the other features that JSDoc has to offer.

3. **JSDoc in Practice:** Now you know JSDocs power and want to use it in your project. But how do you start? In this section, we'll take a look at how to set up VSCode to give us the best experience with JavaScript typing.

3. **Best Practices:** Finally, we'll take a look at some best practices for using JSDoc in your project.

## TypeScript Types
### String, number, boolean, etc. 🎭
In TypeScript, the most common types are **primitive types**. These types are special because they represent the lowest level building blocks of the language. It's important to write primitive types in lowercase as it helps avoid confusion with classes or interfaces. For example, if you were to use `String` instead of `string`, it might be mistaken for the global `String` constructor, leading to potential confusion and bugs. You can read more about this on the [Modern JavaScript Tutorial](https://javascript.info/primitives-methods#a-primitive-as-an-object).

<br>

Here’s how you can use primitive types in TypeScript and JSDoc:

```tsx
// TypeScript
const name: string = 'John Doe';
const age: number = 25;
const average: number = 3.14;
const isActive: boolean = true;
const nullable: number | null = null;
const unassigned: string | undefined;

// JavaScript JSDoc
/** @type {string} */
const name = 'John Doe';

/** @type {number} */
const age = 25;

/** @type {number} */
const average = 3.14;

/** @type {boolean} */
const isActive = true;

/** @type {number | null} */
let nullable = null;
nullable = 5;

/** @type {string | undefined} */
let unassigned;
unassigned = 'John Doe';
```
Note that JSDoc comments start with two asterisks `/**` and end with a regular asterisk followed by a forward slash `*/`. If a comment block starts with a single asterisk, it will be treated as a regular comment and will not be parsed by JSDoc. To add a JSDoc comment, simply place the comment block directly before the code element you want to document.

### Arrays and tuples 🍱
Arrays and tuples in TypeScript help you handle lists of items. There are two ways of typing them in JSDoc. The first is to use the `[]` syntax, which is the most common and widely accepted. The second is to use the `Array` generic type, which is less common. 
```tsx
// arrays
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ['John', 'Jane', 'Doe'];
```

Though the `[]` syntax is simpler and easier to read, it becomes harder to read when we have multidimensional arrays or complex types. In such cases, the `Array` generic type is more readable. In the end, it's a matter of personal preference so you can choose whichever you prefer.
```tsx
// More readable as Array<Array<number>> since it 
// clearly shows the nesting structure which makes
// it easier to visualize the array in our heads
const matrix: Array<Array<number>> = [[1, 2], [3, 4]];
const matrix: number[][] = [[1, 2], [3, 4]];

// Using JSDoc
/** @type {number[][]} */
const numbers = [[1, 2], [3, 4]];

/** @type {Array<Array<number>>} */
const numbers = [[1, 2], [3, 4]];
```

Tuples are similar to arrays, but they have a fixed length and each element has a specific type. They are useful when you want to represent a value with a fixed number of elements, where each element has a specific type. For example, you can use a tuple to represent a coordinate in a 2D plane, where the first element is the x-coordinate and the second element is the y-coordinate:
```tsx
// tuples
const coordinates: [number, number] = [40.7128, -74.0060];
const person: [string, number] = ['John Doe', 30];

// Using JSDoc
/** @type {[number, number]} */
const coordinates = [40.7128, -74.0060];

/** @type {[string, number]} */
const person = ['John Doe', 30];
```

### Objects and interfaces 🏢
TypeScript allows you to define the structure of objects using object types and interfaces. Use the inline object type syntax (`{ property: Type }`) to define an object type when the structure is simple and not likely to be reused across your codebase. If you have a complex type or expect the same structure to be reused multiple times throughout your codebase, it becomes increasingly difficult to maintain types which makes it easier to introduce bugs. In such cases, it's better to use the `interface` keyword to define reusable object types. Inline object types are more suitable when you want to create ad-hoc types for specific functions or components without cluttering your code with separate interface declarations.

```tsx
// inline object typing
const user: { name: string; age: number } = {
  name: 'John Doe',
  age: 25,
};

// interface typing
interface User {
  name: string;
  age: number;
}
const user: User = { name: 'John Doe', age: 25 };

// Using JSDoc
/** @type {{ name: string; age: number }} */
const user = { name: 'John Doe', age: 25 };

/** @type {User} */
const user = { name: 'John Doe', age: 25 };
```

We can define interfaces and custom types in JSDoc using the `@typedef` tag. The tag is followed by the type and the name we want to assign it. There are two ways to define the type: The first is to use the `@property` tag to define each property of the type. This allows you to give each property a description revealing more information about the property, its purpose and how it should be used. The second is to use the `@typedef` tag to define the type inline. The second method is more concise and easier to read, but it doesn't allow you to add descriptions to each property.

```tsx
// Using @property tag
/** 
 * @typedef {Object} User
 * @property {string} name The user's full name.
 * @property {number} age The user's age in days. We use days
 *  instead of years to avoid dealing with leap years.
 */
/** @type {User} */
const user = { name: 'John Doe', age: 25 };

// Using inline type definition
/** @typedef {{ name: string; age: number }} User */
const user = { name: 'John Doe', age: 25 };
```

### Optional properties 📝
To mark properties as optional, add a question mark (`?`) after the property name. This tells TypeScript that the property may or may not be present in the object. You can use the `@property` tag to mark a property as optional in JSDoc by wrapping the property name in square brackets (`[property]`).

```tsx
// Using optional properties
interface User {
  name: string;
  age?: number;
}

// Using @property tag
/** 
 * @typedef {Object} User
 * @property {string} name The user's full name.
 * @property {number} [age] The user's age.
 */
```

### Enums and unions 🎲
TypeScript introduces enums and unions to help you manage a set of named constants and combine multiple types, respectively. JavaScript doesn't have enums, but we can tell JSDoc to treat a regular object as an enum by using the `@enum` tag. The `@typedef` tag can be used to define a union type. You could also use the type `Record<string, string>` to define an enum, but the `@enum` tag is more concise and readable. More on utility types later.

```tsx
// enums
/** @enum {string} */
const Color = {
  Red: 'red',
  Green: 'green',
  Blue: 'blue',
  Age: 42, // Error: Type 'number' is not assignable to type 'string'
};

/** @type {Color} */
const color = Color.Red;

// unions
/** @typedef {string | number} StringOrNumber */
/** @type {StringOrNumber} */
let value = 'Hello'; // Can be a string
value = 42; // Or a number
```

### Type aliases 🏷️
Type aliases are a way to create a new name for an existing type. They can be used to improve code readability and maintainability by giving a more meaningful name to a complex type. In TypeScript, there is the `type` keyword to create type aliases. In JSDoc however, you can use the `@typedef` tag we have seen before to define a type alias.

```tsx
// In TypeScript
type Age = number;
type Name = string;
type User = { name: Name; age: Age };

const user: User = { name: 'John Doe', age: 25 };

// Using JSDoc
/** @typedef {number} Age */
/** @typedef {string} Name */
/** @typedef {{ name: Name; age: Age }} User */

/** @type {User} */
const user = { name: 'John Doe', age: 25 };
```

### Literal types 🔠
Literal types in TypeScript are a way to define types that can only be of a specific value. They can be used with strings, numbers, or booleans. To create a literal type, simply use the desired value as the type.

```tsx
// In TypeScript
type Red = 'red';
type Blue = 'blue';
type Green = 'green';
type Color = Red | Blue | Green;

const color: Color = 'red'; // Allowed
color = 'yellow'; // Error: Type '"yellow"' is not assignable to type 'Color'

// In JSDoc
/** @typedef {'red' | 'blue' | 'green'} Color */
/** @type {Color} */
const color3 = 'red'; // Allowed
color3 = 'yellow'; // Error: Type '"yellow"' is not assignable to type 'Color'
```

### Utility types 🧰
TypeScript provides a set of predefined utility types that can help you manipulate and transform types. This way you can create new types based on existing types. Some of the most common are `Partial`, `Readonly`, `Record`, `Pick` and `Omit`. But there are many more available and you can find a list in the [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/utility-types.html).

```tsx
interface User {
  name: string;
  age: number;
}

// Partial: Make all properties in User optional
type PartialUser = Partial<User>;
// {
//   name?: string | undefined;
//   age?: number | undefined;
// }

// Readonly: Make all properties in User readonly
type ReadonlyUser = Readonly<User>;
// {
//   readonly name: string;
//   readonly age: number;
// }

// Record: Create a new type with keys from a union and values of a specific type
type UserRole = 'admin' | 'user';
type Roles = Record<UserRole, boolean>;
// {
//   admin: boolean;
//   user: boolean;
// }

// Pick: Create a new type by picking specific properties from another type
type UserWithoutAge = Pick<User, 'name'>;
// {
//   name: string;
// }

// Omit: Create a new type by omitting specific properties from another type
type UserWithoutName = Omit<User, 'name'>;
// {
//   age: number;
// }
```

These utility types can be used in JSDoc like this: 
```tsx
/** @typedef {{ name: string; age: number }} User */
/** @typedef {Partial<User>} PartialUser */
/** @typedef {Readonly<User>} ReadonlyUser */
/** @typedef {Record<'admin' | 'user', boolean>} Roles */
/** @typedef {Pick<User, 'name'>} UserWithoutAge */
/** @typedef {Omit<User, 'name'>} UserWithoutName */
```

### Generics 🧬
Generics are a way to create reusable components that can work with a variety of types. They allow you to define a dynamic type that can be used in multiple places with different types. Sounds very complex, but you can think of them as a function parameter where the type you want to create is the function and the generic type is the parameter. The function/type then uses the generic type to create a new type. To create one, use the `<>` syntax and specify the name of it. You can then use the generic in the type definition. To specify multiple generic types use a comma-separated list. In the following example `T` and `U` are the generic types.

```tsx
// In TypeScript
type TypeT<T> = T;
type TypeTorU<T, U> = T | U;
type TypeBoolean = TypeT<boolean>;
type TypeStringOrNumber = TypeTorU<string, number>;

const value: TypeStringOrNumber = 'Hello'; // Allowed
const value2: TypeBoolean = true; // Allowed

// In JSDoc
/** 
 * @template T
 * @typedef {T} TypeT
 */
/** 
 * @template T,U
 * @typedef {T | U} TypeTorU 
 */
/** @typedef {TypeT<boolean>} TypeBoolean */
/** @typedef {TypeTorU<string, number>} TypeStringOrNumber */
```

### Mapped types 🗺️
Mapped types allow you to create new types by transforming the properties of existing types. You can think of them as you would think of the `map` array method in JavaScript. They can be particularly useful when you want to modify the shape of an object type based on a set of keys or apply specific transformations to the properties of a type. To create a mapped type, use the `in` and `keyof` keywords within a type definition.

<br>

The `in keyof` keywords are used to iterate over the keys of a type. `P` represents the keys of `T` and `T[P]` is the type of the property `P` in `T`:
```tsx
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

interface User {
  name: string;
  age: number;
}

type NullableUser = Nullable<User>;
// {
//   name: string | null;
//   age: number | null;
// }
```

In JSDoc, you can use the `@template` tag to define a generic and the `@typedef` tag to define a mapped type. 
```tsx
/** 
 * @template T 
 * @typedef {{ [P in keyof T]: T[P] | null }} Nullable<T>
 */

/** @typedef {{ name: string; age: number }} User */
/** @typedef {Nullable<User>} NullableUser */
// {
//   name: string | null;
//   age: number | null;
// }
```

### Conditional types 🌓
Conditional types in TypeScript enable you to create types based on conditions, allowing for more flexible and dynamic typing. You can think of them as you would think of the `if` statement in JavaScript. They use the ternary operator syntax within a type definition. `extends` is used to define the condition, and `?` and `:` are used to define the types that will be returned if the condition is true or false, respectively.

```tsx
type IsString<T> = T extends string ? 'yes' : 'no';

type A = IsString<string>; // 'yes'
type B = IsString<number>; // 'no'
// A and B are now literal types of 'yes' and 'no', respectively

// JSDoc
/** 
 * @template T
 * @typedef {T extends string ? 'yes' : 'no'} IsString<T>
 */
/** @typedef {IsString<string>} A */ // 'yes'
/** @typedef {IsString<number>} B */ // 'no'
```

### Indexed access types 🔍
For the last type feature, we'll explore indexed access types. Indexed access types allow you to access the type of a property in another type. They can be helpful when you want to extract the type of a specific property or create more complex types based on the properties of existing types.

```tsx
interface User {
  name: string;
  age: number;
}

type UserName = User['name']; // string
type UserAge = User['age']; // number

// JSDoc
/** @typedef {{ name: string; age: number }} User */
/** @typedef {User['name']} UserName */ // string
/** @typedef {User['age']} UserAge */ // number
```

### Casting Types 🎭
Now that we have experienced the glory of TypeScript, let's see how we can use type casting to tell the compiler that you know better than it does. It can be useful when you want to override the type inference of the compiler. To cast a type, use the `@type` tag and specify the type you want to cast to. Note that you have to put the expression you want to cast in parentheses.

```tsx
const input = document.querySelector('input[type="text"]');

// TypeScript infers the type of input to be `Element | null`
// But now if we try to access a property that is not available 
// on `Element`, we get an error

if (input) {
  input.value; // ERROR: Property 'value' does not exist on type 'Element'
}

// To fix this we can cast the type to `HTMLInputElement` like this:
if (input) {
  const value = /** @type {HTMLInputElement} */ (input).value;
  // Now TypeScript knows that the type of `value` is `string`
}
```

<br>

With these powerful features, you can create dynamic and expressive types. One last thing I want to mention before moving on, is that you can install libraries with which you can add more types to your project like [type-fest](https://github.com/sindresorhus/type-fest) or [utility-types](https://github.com/piotrwitek/utility-types). These libraries contain a lot of useful types that you can use in your project.

<br>

Great!!! Now that we've explored the different type features that TypeScript has to offer, let's see what else we can do with JSDoc.

![Elmo Burn Meme](/assets/blog/boost-your-javascript-with-jsdoc-typing/burn.gif)

## More JSDoc Goodness 📚
There are a few more JSDoc tags that you should know about. These tags are not directly related to types, but they can still be useful when you're working with JSDoc. So let's take a look at them.

### Quick recap 📝
- `@type` is used to define the type of a variable.
- `@typedef` is used to define a type alias.
- `@property` or `@prop` is used to define the properties of an object.
- `@template` is used to define a generic.
- `@enum` is used to define an enum.
- `@param` is used to define the parameters of a function.
- `@returns` or `@return` is used to define the return type of a function.

Let's continue with some more tags.

### @see and @link
The `@see` and `@link` tags help you connect different parts of your documentation. Use the `@see` tag when you want to point to related items like classes or types. The `@link` tag is for linking to other documents that aren't directly connected to what you're currently documenting. You can use both tags to link to things inside your project or to other resources online.

With the `@link` tag, you can also direct readers to a specific section in the documentation or a particular line of code. To link to a section, use the # symbol followed by the section name. To link to a line of code, use the `#L` symbol and add the line number you want to point to. To reference multiple lines of code, use the `-` symbol to separate the start and end line numbers (e.g. `#L6-L13`).

```tsx
/** @typedef {{ name: string; age: number }} Person */
/**
 * @see {Person}
 * @see {@link https://webry.com}
 * @link https://github.com/sindresorhus/type-fest#install
 * @link https://github.com/sindresorhus/type-fest/blob/main/source/primitive.d.ts#L6-L13
 */
```

### @example
The `@example` tag is used to add examples to your documentation. You can use it to show how to use a function or to show how a certain type works. You can also use it to show how to use a library or to show how to use a specific feature of a library.
```tsx
/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @example
 * add(1, 2) // 3
 */
```

### @summary and @description
The `@summary` tag is used to add a short description to your documentation. It's used to give a quick overview of what the item you're documenting does. The `@description` tag is used to add a longer description to your documentation. It's used to give more detailed information about the item you're documenting. 
```tsx
/**
 * @summary Adds two numbers together.
 * @description This function adds two numbers together and returns the result.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
```

### Formatting of JSDoc comments 🎨
You can use Markdown in your JSDoc comments. This means that you can use headings, lists, and other Markdown features to make your documentation more readable. You can also use some HTML tags like `<br>` to add more styling to your documentation. 

```tsx
/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @example
 * ### Example usage
 * You can use this **function** _like_ ~this~:
 * ```js
 * add(1, 2) // 3
 * ```
 */
function add(a, b) {
    return a + b;
}
```
You can also use more complex Markdown features like lists and tables. Check out the [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) from Adam Pritchard for more information. 

### Other JSDoc tags 📚
There are a few other JSDoc tags that you may find useful:
- `@function` or `@func`: Documents a function or method.
- `@class`: Documents a class constructor.
- `@constructor`: Indicates that a function is a constructor for a class.
- `@extends` or `@augments`: Indicates that a class or type extends another class or type.
- `@implements`: Indicates that a class or type implements an interface.
- `@namespace`: Groups related items, such as functions, classes, or types, under a common namespace.
- `@memberof`: Specifies that an item belongs to a class, namespace, or module.
- `@ignore`: Tells JSDoc to exclude an item from the generated documentation.
- `@deprecated`: Marks a function, class, or property as deprecated, indicating it should no longer be used.
- `@since`: Documents the version when an item was introduced.
And many more. You can find a full list of JSDoc tags [here](https://jsdoc.app/).

Ok ok, enough of the theory. Let's see how we can use JSDoc in practice.

![Reality Check Meme](/assets/blog/boost-your-javascript-with-jsdoc-typing/reality.gif)

## Using JSDoc in practice 🏄‍♂️
There are a few challenges when starting to use JSDoc in your project. So this section will focus on these challenges and how you can overcome them.
### How to get the most out of JSDoc
In this post I'm going to stick with VSCode. If you're using another editor, you can still follow along, but you might have to look up how to configure things in your editor.

<br> 

VSCode has built-in support for JSDoc. This means that you can get a lot of the JSDoc benefits without having to install any additional extensions. But there are a few things that you can do to get even more out of JSDoc. Enabling the checkJs option in your `jsconfig.json` file will make the editor display errors for type mismatches, even in JavaScript files. Place it in the root of your project or in the folder where you want to enable type checking. This file can look like this:
```json
{
  "compilerOptions": {
    "checkJs": true,
  }
}
```
To apply this option across all your projects, access the VSCode settings by pressing `cmd + ,`, search for checkJs, and enable it there. For more strict type checking, consider enabling other options in your jsconfig, such as `strict` and `noImplicitAny`.

`strict` enforces a set of stricter type checking rules, which can help identify potential issues in your code. When this option is enabled, the following type-related flags are set to true as of the time of writing this post:

* **noImplicitAny:** This will cause an error to be reported when an expression or declaration has an implied any type. If you don't specify a type for a variable, it will be inferred as any and you'll get an error.
* **noImplicitThis:** If TypeScript can't determine the type of this, it will report an error.
* **alwaysStrict:** Treats all files as if they have the strict mode directive ("use strict") at the top of the file.
* and other options like **strictBindCallApply**, **strictNullChecks**, **strictFunctionTypes**, **strictPropertyInitialization**, **useUnknownInCatchVariables**.

You can read more about these options in the [TypeScript documentation](https://www.typescriptlang.org/tsconfig#strict).

<br>

Often you just want to enable a subset of these options. You can do this by enabling `strict` and then disabling the options that you don't want to use. For example, if you want to enable `strictNullChecks` but not `strictFunctionTypes`, you can do this by enabling `strict` and then disabling `strictFunctionTypes` in your jsconfig. There are also a couple of other relevant options that you might want to enable depending on your use case:
* `allowUmdGlobalAccess` allows you to access global variables in UMD modules. I won't go into detail about JavaScript modules here, but you can read more about them in this [post](https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm) from Igor Irianto. In short, you'll most probably want to enable this option if you're using a library like jQuery or Lodash and you want to access their global variables `$` and `_`, respectively without importing them.
* `typeAcquisition` allows you to specify which libraries you want to use in your project. It will then automatically download the type definitions for these libraries from the [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) project. This community project contains type definitions for npm packages that don't ship with their own type definitions. This is how it may look like:
```json
{
  "compilerOptions": {
    "typeAcquisition": {
      "include": ["jquery", "lodash"]
    }
  }
}
```
### .d.ts files
TypeScript uses `.d.ts` files to store type definitions. These files are often used to define types for JavaScript libraries that don't ship with their own type definitions. You can also use them to define types for your own JavaScript code. Here's an example of what a `.d.ts` file might look like:
```tsx
declare const foo: string;
declare function bar(): User;
declare class Baz {}

interface User {
  name: string;
  age?: number;
}
```
And this is how you can use it in your JavaScript code:
```tsx
foo; // string
bar(); // User
new Baz(); // Baz
```
In `.d.ts` files, you can use all the TypeScript features we have seen before and more. TypeScript will automatically pick up your `.d.ts` files as well as those from npm packages you install. In practice, you can create the file near the JavaScript file you want to add types to. For global types, you can create a file called `globals.d.ts` in the root of your project and add them there.

There are two ways to import types from a `.d.ts` file in JavaScript. The first way is to use triple-slash directives. These directives will tell TypeScript to include the type definitions from the specified modules. This is how it may look like:
```tsx
// If you want to use a .d.ts file
/// <reference path="./foo.d.ts" />

// If you want to use jQuery
/// <reference types="jquery" />

// If you want to use es2017 string features like .padStart()
/// <reference lib="es2017.string" />
```
More on triple-slash directives can be found in the [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html).

The second way is to use the `import` keyword. This will import the type definitions from the specified module. Here's an example:
```tsx
/** @typedef {import('./foo.d.ts').Foo} Foo */
/** @typedef {import('type-fest').JsonValue} JsonValue */
```

<br>

For the last chapter, I want to share some best practices for writing JSDoc comments. I'll also share some resources that you can use to learn more about JSDoc and TypeScript.

![Riding a chandelier meme](/assets/blog/boost-your-javascript-with-jsdoc-typing/chandelier.gif)


## Best Practices
The level of detail in your code documentation depends on the specific use case, project size, and audience. It is important to strike a balance between providing enough information to help users understand the code and avoiding clutter. Here are some best practices you can use:

1. **Consider your audience:** If you're working on a library, your documentation should be comprehensive and include detailed descriptions of all types, functions, and interfaces. This helps users of the library understand how to use it effectively. On the other hand, if you're working on an internal project with a smaller team, you might choose to focus on high-level explanations and important edge cases.

2. **Keep comments up to date:** As your code evolves, make sure to update the corresponding comments and documentation. Outdated comments can be misleading and cause confusion for developers working with your code.

3. **Be concise and clear:** Aim for concise, clear explanations in your comments. Avoid overly technical jargon, and focus on providing information that is easy to understand. Remember that your documentation should be helpful to both experienced developers and newcomers alike.

4. **Include code examples:** Where appropriate, include code examples to illustrate how a particular function or type should be used. This can be especially helpful for users who are new to your codebase or the concepts it involves.

5. **Follow a consistent style:** Use a consistent style for your comments and documentation. This helps create a cohesive and professional appearance, making it easier for users to read and understand your documentation.

If you have made it this far, kudos to you! I'm happy that you've learned something new today. Now you can start adding JSDoc comments to your JavaScript code and make it almost TypeScript-like 🎉. You can support me by following and leaving a comment. I'd love to hear your thoughts and feedback.

![Congratulations](/assets/blog/boost-your-javascript-with-jsdoc-typing/congrats.gif)

## Additional Resources
* [JSDoc documentation](https://jsdoc.app/)
* [TypeScripts JSDoc documentation](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
* [TypeScript Roadmap](https://roadmap.sh/typescript)
* [JavaScript Roadmap](https://roadmap.sh/javascript)
* [What the heck are CJS, AMD, UMD, and ESM in Javascript? by Igor Irianto](https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm)
* [The Modern JavaScript Tutorial](https://javascript.info/)


