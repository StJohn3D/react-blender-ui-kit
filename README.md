#Timber UI

####A configurable panel framework inspired by blender.org

[tim-ber] 5. a single ~~piece of wood~~ _component_ forming part of a structure or the like

##How to use it

`npm install --save timber-ui`

Where you combine your Redux reducers bring in the Timber UI Reducer

```
import { timberUIReducer } from 'timber-ui'

const rootReducer = combineReducers({
    timberUI: timberUIReducer,
    ...
})
```

Where you define your default page layouts...
```
import { TimberApp, Container, Panel }
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

```
cd timber-ui/timber-ui

npm install

npm run build

npm link
```

then...

```
cd timber-ui/demos

npm install

npm link timber-ui

npm start
```

Now go look at localhost:3000

Also install the [Redux dev tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) in chrome if you haven't already