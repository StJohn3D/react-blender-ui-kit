#Redux UI Panels

####A configurable panel framework inspired by blender.org

##How to use it

`npm install --save timber-ui`

Where you combine your Redux reducers bring in the Timber UI Reducer

```js
import { timberUIReducer } from 'timber-ui'

const rootReducer = combineReducers({
    timberUI: timberUIReducer,
    ...
})
```

Where you define your default page layouts...
```js
import { TimberApp, Container, Panel } from 'timber-ui'
...
 render() {
    <TimberApp tools={[ myAweseomeComponent1, myOtherCoolComponent]}>
        <Container flow="HORIZONTAL">
            <Panel width="25%" toolIndex={0}/>
            <Panel toolIndex={1}/>
            <Panel>
                <Container>
                    <Panel height="100px" toolIndex={1}/>
                    <Panel toolIndex={0}/>
                </Container>
            </Panel>
        </Container>
    </TimberApp>
 }
```

##Local Dev Setup

```bash
cd redux-ui-panels/module

npm install

npm run build

npm link
```

then...

```bash
cd redux-ui-panels/demos

npm install

npm link timber-ui

npm start
```

Now go look at localhost:3000

Also install the [Redux dev tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) in chrome if you haven't already