#repanel

####A configurable Redux panel framework inspired by blender.org

##How to use it

`npm install --save repanel`

Where you combine your Redux reducers bring in the repanel Reducer

```js
import { repanelReducer } from 'repanel'

const rootReducer = combineReducers({
    repanel: repanelReducer,
    ...
})
```

Where you define your default page layouts...
```js
import { Repanel, Container, Panel } from 'repanel'
...
 render() {
    <Repanel tools={[ myAweseomeComponent1, myOtherCoolComponent]}>
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
    </Repanel>
 }
```

##Local Dev Setup

```bash
cd repanel/module

npm install

npm run build

npm link
```

then...

```bash
cd repanel/demos

npm install

npm link repanel

npm start
```

Now go look at localhost:3000

Also install the [Redux dev tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) in chrome if you haven't already