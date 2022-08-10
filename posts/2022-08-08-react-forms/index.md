---
title: Customizing Native HTML Forms Validation in React
description: ""
syntaxHighlighting: true
---

-- Summary --

## Form with native validation

You have a simple form on your website. Perhaps it's a login form or a newsletter sign-up – a few fields and a submit button. You don't have any complex interaction logic, so just [grab form contents with `FormData`](https://mattboldt.com/2020/05/02/formdata-with-react-hooks-and-fetch/) in `onSubmit` handler and send them to the backend.

Let's create a form with a single e-mail field. Including HTML attributes for [client-side validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation).

```jsx
function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  // Do something with the data
  console.log(Object.fromEntries(formData.entries()));
}

function Form() {
  return (
    <form onSubmit={onSubmit}>
      <p>
        <label>
          Your e-mail
          <input type="email" name="email" required />
        </label>
      </p>
      <p>
        <button type="submit">Submit</button>
      </p>
    </form>
  );
}
```

Now when I try to submit an empty or invalid form, browser gives me a nice pop-up message with default styling.

{% figure "01-form-error.png", "Screenshot of a form with an e-mail field and browser error message 'Please fill out this field.'" %}
HTML validation message in Chrome ([try it in the sandbox](https://kfg10c.csb.app/ex-01)).
{% endfigure %}

## Rendering the validation message

Maybe you don't like how the browser's pop-up looks. Maybe you want it to look the same in all browsers, or you want to put the validation error somewhere else. At this point you may be considering to do the validation logic yourself or to reach out for some React forms library.

But the [Constraint validation API](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Constraint_validation) provides a nice abstraction to start with. Nowadays is also [well supported in browsers](https://caniuse.com/constraint-validation).

When a field fails the validation, it triggers an `invalid` event. The error message can be read from the input field's `validationMessage` property.

```jsx
function Input() {
  // Passed into input's onInvalid prop
  const invalidHandler = (e) => {
    // e.target is the input
    const validationMessage = e.target.validationMessage;
    // prints: 'Please fill out this field.'
    console.log(validationMessage);
  };

  return (
    <input onInvalid={invalidHandler} type="email" name="email" required />
  );
}
```

Now that we have access to this message we can show it to the user. For example, we can store it in a local state and render it. But we also need to prevent the browser from showing the pop-up message – this is done with `e.preventDefault()`.

```jsx
function Input(props) {
  const [validationMessage, setValidationMessage] = useState();
  const invalidHandler = (e) => {
    setValidationMessage(e.target.validationMessage);
    e.preventDefault();
  };
  return (
    <>
      <input onInvalid={invalidHandler} type="email" name="email" required />
      <span className="validation-message">{validationMessage}</span>
    </>
  );
}
```

{% figure "02-form-validation-message.png", "Screenshot of a form with an e-mail field and a red error message 'Please enter an email address.'" %}
Validation message with custom rendering ([try it in the sandbox](https://kfg10c.csb.app/ex-03)).
{% endfigure %}

<aside>

As a bonus, we can also use CSS pseudo-classes for input validation, like [`:required`](https://developer.mozilla.org/en-US/docs/Web/CSS/:required) and [`:valid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:valid). Sadly, the [`:invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:invalid) pseudo-class applies to all the fields immediately, while the much more useful [`:user-invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:user-invalid) pseudo-class (which applies only to the fields user interacted with) is supported only by Firefox.

</aside>

## Resetting the state

There's one issue with this solution: the validation error is being shown even after the field is fixed.

{% figure "03-form-error-fixed-field.png", "Screenshot of a form with a correct email address in a field, still displaying an error message 'Please enter an email address.'" %}
When you enter a correct e-mail address, the error message is still shown ([try it in the sandbox](https://kfg10c.csb.app/ex-03)).
{% endfigure %}

This is because the `invalid` handler is triggered only with the form submission. We can listen for additional field events, like `blur` or `change`, to update or hide the validation message.

```jsx
function Input(props) {
  const [validationMessage, setValidationMessage] = useState();
  const invalidHandler = (e) => {
    setValidationMessage(e.target.validationMessage);
    e.preventDefault();
  };
  return (
    <>
      <input
        onInvalid={invalidHandler}
        onChange={invalidHandler}
        type="email"
        name="email"
        required
      />
      <span className="validation-message">{validationMessage}</span>
    </>
  );
}
```

This is a bare minimum to use native HTML forms validation with React. You can play with the result in a [sandbox](https://kfg10c.csb.app/ex-04).

{% codesandbox "https://codesandbox.io/embed/react-forms-native-validation-kfg10c", path="/ex-04", module="/src/ex-04.js" %}

## Disadvantages and advantages

If you have only small amount of simple forms, native HTML validation can get you quickly to usable results.

The biggest advantages of this approach are **less dependencies** and **progressive enhancement** – the validation will work even if the client fails to load a JavaScript. Probably not a big concern with React, but totally viable if you are using server-side rendering (for example, with frameworks like Next.js or Remix). Just keep in mind the backend must be able to accept a form submitted without JavaScript.

On the other hand, there are some big caveats.

For starters, the default **validation messages respect the browser's locale**, not of the page. The result may be a bit confusing. For example, if you use a custom [input `pattern`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern) with explanation, you can end up with mixed languages in validation message (although it seems like the `title` is displayed only by Firefox).

{% figure "04-mixed-locale.png", "Screenshot of a form with a an email missing a top level domain and validation message about incorrect format in two different languages.'" %}
An e-mail field with a custom pattern and title explaining the format, displayed in Firefox with Czech locale, results in a validation message in mixed languages ([try it in the sandbox](https://kfg10c.csb.app/ex-05)).
{% endfigure %}

Different browsers provide **different validation messages**, so if you need a tight control over copy, you must provide the messages yourself. You can read field's [`validity` property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validity) which gives you the [validity state](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState). The [article about the constraints validation API](https://css-tricks.com/form-validation-part-2-constraint-validation-api-javascript/#aa-getting-the-error) by CSS Tricks shows a convenient `hasError` function which can get you started. But on the other hand, most libraries give you the same validation messages across all browsers.

Since constraints validation API is tied to HTML, it is **harder to share validation logic with the backend**. For example, the Formik forms library [uses Yup library](https://formik.org/docs/tutorial#schema-validation-with-yup) for data validation. You can use the same validation schema both on the client, and the server.

For a forms-heavy application I wouldn't hesitate to pick some popular library, like [React Hook Form](https://react-hook-form.com/), [React Final Form](https://final-form.org/react), or [Formik](https://formik.org/). But for a simple website with a single "Contact Us" form? I'd try to keep things light.

## Resources

- [Forms Validation series on CSS Tricks](https://css-tricks.com/form-validation-part-1-constraint-validation-html/) was extremely valuable resource, despite being a bit dated. Especially [Part 2](https://css-tricks.com/form-validation-part-2-constraint-validation-api-javascript/) goes deep into the JavaScript logic of forms validation.
- MDN provides an up to date tutorial on [Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation) using vanilla JavaScript.
- If you want to learn more about use of `FormData` in React, check out [FormData with React Hooks and Fetch](https://mattboldt.com/2020/05/02/formdata-with-react-hooks-and-fetch/) by Matt Boldt, and [Creating forms in React in 2020](https://blog.logrocket.com/forms-in-react-in-2020/) by Kristofer Selbekk.
