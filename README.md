Wavy Jones
==========

Wavy Jones is a simple way of adding an oscilloscope to your Web Audio project. It was originally written by [Stuart Memo](http://stuartmemo.com/wavy-jones/) back in 2013 - this is a slightly modernized fork for use on the [Crows Electromusic website](https://crowselectromusic.com) - it's key feature is being easier to use from [Tone.js](https://tonejs.github.io/).

Usage:

1. Reference Wavy Jones, after downloading it, by doing something like this:

```<script src="/wavy-jones.js"></script>```

2. Make somewhere to show your oscillator - create and empty div and give it an id like so:

```<div id="oscilloscope"></div>```

Make sure to give it a height and width!

```
<style>
    #oscilloscope {
        width: 100%;
        height: 120px;
    }
</style>
```

3. Connect it to an audio source. Wavy Jones is basically a normal Audio Analyser node wearing a sparkly jacket. This means you can connect it up just like you would any other audio node.

```
// create a wavyjones instance on the 'oscilloscope' element.
let wavy = new WavyJones('oscilloscope');

// create an audio context
let context = new AudioContext()

// get wavy set up in the context
wavy.setupInAudioContext(context);

// create a sinewave oscillator in the audio context
let sineWave = context.createOscillator()

// tell wavy to analyze the sineWave
sineWave.connect(wavy.analyzer);

// connect the sineWave to audio, so we can hear it too
sineWave.connect(context.destination);
```

## Tone.js
To use this with [Tone.js](https://tonejs.github.io/) is pretty simple:

```
    // create an oscillator, routed to the destination
    const osc = new Tone.Oscillator().toDestination();
    osc.frequency.value = "C4";

    // this has to be a user-triggered event, or the browser won't let it happen.
    function startScope() { 
        osc.start("+0");
        if (window.scope.analyser == null) {
            let context = Tone.getContext().rawContext;
            window.scope.setupInAudioContext(context);
            osc.connect(window.scope.analyser);
        }
    }

    // when the page loads, add a scope
    ready(()=>{
        window.scope = new WavyJones('oscilloscope');
    });

    // a little document ready function from https://youmightnotneedjquery.com/#ready
    function ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    // if the window resizes, resize the scope
    window.addEventListener('resize', function(event) {
        if (window.scope) {
            window.scope.updateCanvasSize();
        }
    }, true);
```

## Other fun:

1. customize the look: `window.wavy = new WavyJones('oscilloscope', 5, "orange");`
2. change the look after it's been created: `window.wavy.updateStyle("red", 3);`
