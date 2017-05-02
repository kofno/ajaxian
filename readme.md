# ajaxian

Ajaxian is a small wrapper around the XMLHttpRequest object based heavily on
the Elm Http module. In many ways it's not all that different from other http
libraries. You build a request, send it to the server, and then handle the
response. The emphasis here is on handling error reponses correctly and
consistently, without resorting to exceptions.

Because it uses XMLHttpRequest, Ajaxian can only be used from the browser.
Browserify, Webpack, or some similar tool is required package for deploy.

## tasks

Instead of Promises, Ajaxian uses Futures (here called Tasks). Tasks are lazy
and will not execute until forked. This means a Task can be returned from a
pure function. Tasks are also composable. You can build a complex chain of
behaviors, while strictly controlling exactly when the side effects happen.

## errors

Ajaxian does not throw errors for failed requests. Instead, failed requests
are returned as one of several different types of errors. Error conditions
are documented this way because I believe that you create a better user
experience when you handle error conditions gracefully. I want to provide
the tools for doing that.

All of the error types are documented in the HttpError module.

## decoders

Decoders are another idea stolen from Elm. A decoder is a function that converts
the response body of a request into a data structure that can be used by the
application.

Ajaxian expects the decoder to return the results wrapped in a Result object.
If the data passes muster, then the decoder should return the data wrapped in
an Ok object. If the data is incorrect, then an error message wrapped will be
wrapped in an Err object. This will result in a BadPayload error.

If you are building a json heavy application, I would recommend checking out
[jsonous](https://github.com/kofno/jsonous). This library is specifically
built for creating composable decoders for handling json content.

# installing

> npm install --save ajaxian

> yarn add ajaxian

# usage

    import { toHttpTask } from 'ajaxian';
    import { ok } from 'resulty';

    const request = {
      url: '/some_end_point',
      method: 'post',
      data: { foo: 'bar' },
      timeout: 0,
      headers: [['X-Some-Header', 'baz']],
      withCredentials: true,
      decoder: () => ok({}),
    };

    toHttpTask(request).fork(
      err => console.error(err),
      data => console.log("Success!", data)
    );

There are some convenience builders for making requests, too:

    import { post } from 'ajaxian';

    const request = post('/some_end_point', { foo: bar }, () => ok({}))
      .withHeader(['X-Some-Header', 'baz']);




