#Timber UI

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