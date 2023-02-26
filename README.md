# dioada-carousel

A bare-bones carousel that uses a flex container to ensure that all items are the same height (the height of the tallest).

Features:

-   Swipe navigation via mouse or touch
-   Navigation via the keyboard

Other navigation needs to be implemented separately. See, below, for an example of button and indicator navigation.

<br>

## Installation

### 1. Via package installation

```cmd
npm install dioada-carousel
```

```js
import carousel from "dioada-carousel";
import "/path/to/node_modules/dioada-carousel/dist/dioada-carousel.css";
```

### 2. Via file links

Download the code zip and extract `dist/dioada-carousel.js` and `dist/dioada-carousel.css`.

```html
<script type="text/javascript" src="/path/to/dioada-carousel.js"></script>
<link href="/path/to/dioada-carousel.css" rel="stylesheet" />
```

**Note:** when installed via file links, the component is prefixed as `dioada.carousel`.

<br>

## HTML

```html
<dioada-carousel idx="2" duration="0.25">
    <dioada-carousel-items>
        <dioada-carousel-item>
            <h2>Slide 1</h2>
        </dioada-carousel-item>
        <dioada-carousel-item>
            <h2>Slide 2</h2>
        </dioada-carousel-item>
    </dioada-carousel-items>
</dioada-carousel>
```

Each `dioada-carousel-item` has `display: flex` and takes up the full width and height of the container. Apply any padding and alignment to an immediate child node of the item.

<br>

## Initialize

```js
carousel();

// Or with non-default options
carousel({});
```

| Name             | Attribute          | Default             | Description                                                                                                                                                                                                                               |
| ---------------- | ------------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| selector         | n/a                | `"dioada-carousel"` | The carousel selector.                                                                                                                                                                                                                    |
| idx              | idx                | `0`                 | The active slide index.                                                                                                                                                                                                                   |
| duration         | duration           | `0.6`               | The slide duration in seconds.                                                                                                                                                                                                            |
| timingFunction   | timing-function    | `"ease-out"`        | The timing function used by the slide transition.                                                                                                                                                                                         |
| keyboard         | keyboard           | `true`              | If `true`, pressing the left arrow key, the right arrow key, the Home key and the End key navigate to the previous, next, first and last slide respectively.<br>A `tabindex` is attached to the carousel to allow for this functionality. |
| swipe            | swipe              | `true`              | If `true`, swiping left and right navigates to the previous and next slide respectively.                                                                                                                                                  |
| ariaHideInactive | aria-hide-inactive | `true`              | If `true`, inactive slides are aria hidden.<br>If `false`, `role="list"` is attached to `dioada-carousel-items` and `role="list-item"` to each `dioada-carousel-item`.                                                                    |

<br>

## Events

### dioada.carousel.nav

Fires as soon as the active slide index changes.

```js
carousel().node.addEventListener("dioada.carousel.nav", e => {
    if (e.last) {
        // do something...
    }
});
```

| Name  | Description                             |
| ----- | --------------------------------------- |
| item  | The active slide node                   |
| from  | The previous slide index                |
| to    | The active slide index                  |
| first | `true` if the active slide is the first |
| last  | `true` if the active slide is the last  |

<br>

## Methods

| Name      | Description                         |
| --------- | ----------------------------------- |
| node      | Returns the carousel DOM node       |
| itemCount | Returns the number of slides        |
| idx       | Gets or sets the active slide index |
| next      | Navigates to the next slide         |
| prev      | Navigates to the previous slide     |

<br>

## Example

This example shows how to implement navigation via a previous/next button and indicators. See the demo for a full implementation.

```html
<dioada-carousel>
    <dioada-carousel-items>
        <dioada-carousel-item> Slide 1 </dioada-carousel-item>
        <dioada-carousel-item> Slide 2 </dioada-carousel-item>
    </dioada-carousel-items>
</dioada-carousel>
<div class="navigation">
    <button type="button" aria-label="Previous slide" disabled>Previous slide</button>
    <button type="button" aria-label="Next slide">Next slide</button>
</div>
<ul class="indicators" aria-label="Slideshow navigation">
    <li><button type="button" data-idx="0" aria-current="true" aria-label="Go to slide 1" /></li>
    <li><button type="button" data-idx="1" aria-current="false" aria-label="Go to slide 2" /></li>
</ul>
```

```js
import "/path/to/node_modules/dioada-carousel/dist/dioada-carousel.css";
import dioadaCarousel from "dioada-carousel";

export default function () {
    const carousel = dioadaCarousel(),
        btns = document.querySelectorAll(".navigation button"),
        indicators = document.querySelectorAll(".indicators button");

    carousel.node.addEventListener("dioada.carousel.nav", e => {
        e = e.detail;
        if (e.first) {
            btns[0].setAttribute("disabled", "disabled");
        } else {
            btns[0].removeAttribute("disabled");
        }
        if (e.last) {
            btns[1].setAttribute("disabled", "disabled");
        } else {
            btns[1].removeAttribute("disabled");
        }
        indicators[e.from].setAttribute("aria-current", "false");
        indicators[e.to].setAttribute("aria-current", "true");
    });

    btns[0].addEventListener("click", carousel.prev);
    btns[1].addEventListener("click", carousel.next);

    document.querySelector(".indicators").addEventListener("click", e => carousel.idx(parseInt(e.target.dataset.idx, 10)));
}
```

```scss
.indicators {
    button {
        &[aria-current="true"] {
            // Highlight it
        }
    }
}
```
