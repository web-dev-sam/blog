---
date: 2023-04-18
moddate: 2021-04-18
title: Naming! Every Developer's Nightmare
author: samuel-braun
cover: /assets/blog/naming-every-developers-nightmare/cover.jpg
devto: https://dev.to/samuel-braun/naming-every-developers-nightmare-3ge8

tags:
  - webdev
  - javascript
  - programming
  - tutorial

share:
  image: https://webry.com/assets/blog/naming-every-developers-nightmare/og-cover.jpg
  title: Naming! Every Developer's Nightmare
  description: >
    Improve your code's readability with my guide on variable naming. Explore a powerful naming pattern to create self-explanatory and maintainable code, enhancing your programming experience and productivity.
---
Aah.. naming things. A developer's favorite brain sport, nestled somewhere between attending endless meetings and refactoring code. As developers, we know that naming can be both a blessing and a curse. It's a critical part of our work, but it can lead to some hilarious but most likely frustrating names. In this post, I'll show a way we can think of variables and how you can use them effectively. Even if you feel confident naming your variables, are you also using their full potential? 🤔

![jeff.gif](/assets/blog/naming-every-developers-nightmare/jeff.gif)

## A Naming Pattern to Save the Day

When you find yourself struggling to name a specific variable, function, or class, consider using the following pattern and ask yourself the corresponding questions. The pattern is **`[scope][typePrefix][baseName][qualifier][typeSuffix]`.**

1. **Scope:**
    - What is the visibility or accessibility of this variable? 
    <br>(e.g., private, public, protected, internal, package-private)
    - Is this variable specific to any programming language features or conventions?
    <br>(e.g., double underscore prefix in Python, dollar sign in jQuery, '@' for instance variables in Ruby)
    - Is this variable part of a framework or library that requires a specific naming pattern?
    <br>(e.g., Angular's 'ng' prefix for directives, React's 'use' prefix for hooks)
2. **TypePrefix:**
    - Is this variable a boolean or a function that returns a boolean?
    <br>(e.g., is, has, contains, are, integrates)
    - Does the variable represent a state, condition, or action that can be described with words like "is," "has," "contains," or "integrates"?
    <br>(e.g., isEnabled, hasAccess, containsItem)
    - Is this a function responsible for getting, setting, fetching, or updating data?
    <br>(e.g., get, set, fetch, update, retrieve, store, save)
3. **BaseName:**
    - What is the primary purpose of this variable?
    <br>(e.g., user, distance, payment, errorMessage)
    - Can I describe the variable's role in the code with a clear, concise word or phrase?
    <br>(e.g., registrationStatus, totalPrice, elapsedTime)
4. **Qualifier:**
    - Are there any additional details or context that would help distinguish this variable from others with a similar purpose?
    <br>(e.g., firstName, lastName, phoneNumber)
    - Does the variable have specific units or properties that should be included in the name, such as "InMeters" or "InSeconds"?
    <br>(e.g., distanceInMiles, timeInSeconds)
    - Is there a specific state or condition that this variable represents, such as "Valid" or "Removable"?
    <br>(e.g., isValidEmail, isRemovableItem)
5. **TypeSuffix:**
    - What is the fundamental purpose or structure of this variable?
    <br>(e.g., Count, Index, Sum, Average, List, Map, Array, Set, Queue)
    - Can the variable's role be clarified by adding a suffix for the structure like "Count," "Index," "Sum," "Average," "List," or "Map"?
    <br>(e.g., itemCount, currentIndex, totalPriceSum, ratingAverage, userList, settingsMap)

Here are 6 examples:

1. **`__isUserLoggedIn`**:
    - scope: __ (Python private variable)
    - typePrefix: is (boolean)
    - baseName: User
    - qualifier: LoggedIn
2. **`fetchProductById`**:
    - scope: “” (Public methods dont have a specific prefix in most languages)
    - typePrefix: fetch (function)
    - baseName: Product
    - qualifier: ById
3. **`updateEmailPreference`**:
    - scope: “” (public)
    - typePrefix: update (function)
    - baseName: Email
    - qualifier: Preference
4. **`$distanceInMetersInput`**:
    - scope: $ (jQuery variable)
    - typePrefix: “”
    - baseName: distance
    - qualifier: InMeters
    - typeSuffix: Input
5. **`getUserByEmail`**:
    - typePrefix: get (function)
    - baseName: User
    - qualifier: ByEmail

There may be times where you need to swap the base name and qualifier in order to give the variable a more appropriate and meaningful name. Example: **getLoggedInUser** instead of **~~getUserLoggedIn~~**.

1. **`getLoggedInUser`**
    - typePrefix: get (function)
    - qualifier: LoggedIn
    - baseName: User

## Naming Variables Effectively
Alright, so you've got a solid plan for naming variables 😎. But that's only half the battle. The other half? Comments. But not in the way you're thinking.

You might have heard the advice to scatter comments throughout your code to make it more understandable, especially for your future self. But, in reality, that's not always the best approach.

![fail](/assets/blog/naming-every-developers-nightmare/fail.gif)

Consider this: if your code is incomprehensible without comments, then the problem isn't a lack of comments. And if your code is already clear, then you don't need the comments in the first place. So, what's the point I'm trying to make? Use variables as comments.

When you store everything in a variable with a meaningful name, you can often understand the entire code just by reading those names and key control structures like if statements. Let me show you an example. The other day, I came across a piece of code that took me about 10 minutes to grasp completely:

```js
if (!row.doc[otherField]) {

	let val;

	if(currentField == "left") {
		val = row.doc[currentField].charAt(0) === "-" ? row.doc[currentField].slice(1) : row.doc[currentField];
	}

	if(currentField == "right") {
		val = row.doc[currentField].charAt(0) === "-" ? row.doc[currentField] : `-${row.doc[currentField]}`;
	}

	row.doc[otherField] = val === "-0" ? "0" : val;
	row.refreshField(otherField);
}

if (currentField === "left" && row.doc["left"] && row.doc["left"].charAt(0) !== "-") {
	row.doc["left"] = row.doc["left"] === "0" ? row.doc["left"] : `-${row.doc["left"]}`;
	row.refreshField("left");
}

if (currentField === "right" && row.doc["right"] && row.doc["right"].charAt(0) === "-") {
	row.doc["right"] = row.doc["right"].slice(1);
	row.refreshField("right");
}
```

So let's clean it up by putting stuff into variables and giving them meaningful names:

```js
const valueOfOtherField = row.doc[otherField];
const valueOfCurrentField = row.doc[currentField];
const valueOfLeftField = row.doc["left"];
const valueOfRightField = row.doc["right"];
const isCurrentFieldOnLeft = currentField === "left";
const isCurrentFieldOnRight = currentField === "right";

const startsWithMinusSign = (str) => str.charAt(0) === "-";
const removeMinusFromZero = (str) => str === "-0" ? "0" : str;
const addMinusAtStart = (str) => startsWithMinusSign(str) ? str : `-${str}`;
const removeMinusFromStart = (str) => str.replace(/^-/, "");

if (!valueOfOtherField) {
	let val;
	if (isCurrentFieldOnLeft) {
		val = startsWithMinusSign(valueOfCurrentField) ? 
			removeMinusFromStart(valueOfCurrentField) : 
			valueOfCurrentField;
	} else if (isCurrentFieldOnRight) {
		val = startsWithMinusSign(valueOfCurrentField) ? 
			valueOfCurrentField : 
			addMinusAtStart(valueOfCurrentField);
	}

	row.doc[otherField] = removeMinusFromZero(val);
	row.refreshField(otherField);
}

if (isCurrentFieldOnLeft && valueOfLeftField && !startsWithMinusSign(valueOfLeftField)) {
	row.doc["left"] = removeMinusFromZero(addMinusAtStart(valueOfLeftField));
	row.refreshField("left");
}

if (isCurrentFieldOnRight && valueOfRightField && startsWithMinusSign(valueOfRightField)) {
	row.doc["right"] = removeMinusFromStart(valueOfRightField);
	row.refreshField("right");
}
```

With this change, the code reads almost like plain English. However, upon closer inspection, we can identify some unnecessary logic steps that can be removed and simplified. Take this line, for example:

```js
val = startsWithMinusSign(valueOfCurrentField) ? 
			valueOfCurrentField : 
			addMinusAtStart(valueOfCurrentField);
```

Logically, it can be further simplified. If the value starts with a minus sign, we keep it; otherwise, we add a new minus sign. Essentially, this means we can simply add a minus sign at the beginning. So, the line can be simplified to:

```js
val = addMinusAtStart(valueOfCurrentField);
```

Assuming the performance of `row.refreshField` is negligible, the same logic can be applied to the if statements by removing the `&& startsWithMinusSign(valueOfRightField)` and `&& !startsWithMinusSign(valueOfLeftField)` conditions. The entire code should now look like this:

```js
const valueOfOtherField = row.doc[otherField];
const valueOfCurrentField = row.doc[currentField];
const valueOfLeftField = row.doc["left"];
const valueOfRightField = row.doc["right"];
const isCurrentFieldOnLeft = currentField === "left";
const isCurrentFieldOnRight = currentField === "right";

const startsWithMinusSign = (str) => str.charAt(0) === "-";
const removeMinusFromZero = (str) => str === "-0" ? "0" : str;
const addMinusAtStart = (str) => removeMinusFromZero(
	startsWithMinusSign(str) ? str : `-${str}`
);
const removeMinusFromStart = (str) => str.replace(/^-/, "");

if (!valueOfOtherField) {

  // If the current input field is on the left, let's remove the minus from the start
  // and if its on the right, let's add the minus at the start. And put it into the
  // other field. (NOTE: In the original code there were exactly two fields, left and right.)
	const newValue = isCurrentFieldOnLeft ?
		removeMinusFromStart(valueOfCurrentField) :
		addMinusAtStart(valueOfCurrentField);

	row.doc[otherField] = newValue;
	row.refreshField(otherField);
}

// If the current field is the left one and there is an inputted value then
// make sure to add the minus at the start
if (isCurrentFieldOnLeft && valueOfLeftField) {
	row.doc["left"] = addMinusAtStart(valueOfLeftField);
	row.refreshField("left");
}

// If the current field is the right one and there is an inputted value then
// make sure to remove the minus from the start
if (isCurrentFieldOnRight && valueOfRightField) {
	row.doc["right"] = removeMinusFromStart(valueOfRightField);
	row.refreshField("right");
}
```

At this point, we can easily read through the code without tearing our hair out. The code accomplishes two main tasks:

1. It ensures that when the user enters values in the left and right fields, the right one will always be positive, and the left one will be negative.
2. If one of the fields hasn't been filled in yet, the code copies the value of the current input field to the other field.

Understanding this behavior with the original code would have been quite challenging. However, by using variables more effectively, we can abstract away the complicated syntax mess and make the code read more naturally.

Let me know what you think in the comments. Maybe you have some more suggestions. If you found this post helpful, consider liking it and following for more posts in the future. Your support means a lot and encourages me to keep sharing more ❤. Happy coding!

![jeff.gif](/assets/blog/naming-every-developers-nightmare/properly-named-jeff.gif)
