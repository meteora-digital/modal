# Modal

Modal is a dependancy free class which can be used to create some basic modals easily.

## Installation

```bash
yarn add @meteora-digital/modal
```

## HTML Usage

```es6
import Modal from '@meteora-digital/modal';

const popup = new Modal;
const content = document.querySelector('.content');
```

## Options

| Option | Type | Description |
|--------|------|-------------|
| className | string (default: 'modal') | If you want more than one style of modal, you can change this class to suit your needs |
| allowClose | boolean (default: true) | If you want to disable the close button, set this to false |
| removeFromDOM | boolean (default: true) | If you want to keep the modal in the DOM, set this to false |

#### Content Loading

Fill your modal with something interesting!

The append method can take either a string, an html element, or an array of both!

```javascript
popup.append(['<h1>Modal Heading</h1>', content]);
```

#### Empty the modal

Dont like your modal's content? Delete it!

The empty method simply removes the content from the modal.

```javascript
popup.empty();
```

#### Opening the modal

It would help if we could see it right?

```javascript
popup.open();
```

#### Closing the modal

Get it out the way!

```javascript
popup.close();
```

#### Event Listeners

What if I need something to happen after it opens or closes?

```javascript
popup.on('open', () => console.log('Your modal has been opened!'));
```

| Events |
|--------|
| open |
| close |
| append |
| empty |

## License
[MIT](https://choosealicense.com/licenses/mit/)

