# fetures
- tiny libarary for repeat dom depand on javascript data
- better use for static html page(replace jQuery maybe), not work with SPA project, or very engineered project(no need)
- write template directly as html
- not two-way bind data to template, only one time render, but you can instantiate it when async callback, or some sync data deals
- wish it helpful for you
- welcome any pull requests


# usage

## step1:
```
<script src="./redom.js"></script>
```
## step2:

write some html snippets like these:
```
<div re="lists" title="{{ name }}">
    <a title="{{ val }}">
        {{ name }}: {{ val }}
    </a>
</div>
```

## step3
instantiate ```Redom```, import data to it

```
var reDom = new ReDom({
    data: {
        lists: [
            {
                name: 'apple',
                val: 1.5
            },
            {
                name: 'banana',
                val: 5.4
            }
        ]
    }
})
```

## step4
other usage and demos, see demo1.html, and demo2.html

# see demos online
- https://fishenal.github.io/redomjs/demo1.html
- https://fishenal.github.io/redomjs/demo2.html

