#Project description

Since the project is not functional, I wanted to take some time to explain the reasoning behind what it is
that I wanted to achieve. I've tried to solve this in many ways so what you are seeing now (inside `MemeMachine.js`) is
the latest iteration in which I wanted to achieve the basic functionality of saving a frame from a video with some
overlay text on it.

Unfortunately, I could not get past the error of 
> The operation is insecure. (Mozilla)
 
OR

> SecurityError: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported. (Chrome)

I have tried various solutions that I found online, including the creation of another endpoint on the backend
`/uploads` which was aimed at saving the stream of data locally as the first attempt to save the
image programmatically with a download link in the browser had previously failed with the same error as above
but in the end I have narrowed down the problem to the following call:

```javascript 1.8
image.src = canvas.toDataURL();
```

The way to replicate the error is to just use the video slider in order to select a frame which upon release
will be posted on an absolute positioned canvas element which is going to have another element layered
on top of it.

I hope I could offer a brief explanation on my reasoning for this assignment. I could have invested more time into
making it prettier but since my approach is usually based on 'make it work, then make it pretty' I've focused
all the time that I had at hand in order to make the meme-machine functional.

Again, I appreciate the opportunity to review the code at hand even in a non-functional state and if
you would like to dive in deep and discuss about it, I am more than open for it. Thank you!

George
