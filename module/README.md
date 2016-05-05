
##How to use it

`npm install --save redux-ui-panels`

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

##Project Road-map

 - Bring in BDD/TDD and code coverage: **_maintenance_**
 - Splitting/Merging Panels: **_feature_**
 - Thorough documentation on github: **_maintenance_**

##Change log

###0.0.4

 - CHANGED NAME to redux-ui-panels ( Formerly timber-ui )
___
###0.0.3

**New Features**
 - Added Project Road-Map and this Change log to the npm documentation

**Bug fixes**
 - [**#5:**](https://github.com/StJohn3D/redux-ui-panels/issues/5) NPM documentation was missing ` from 'timber-ui'` in the _HOW to use it_ instructions
 - [**#4:**](https://github.com/StJohn3D/redux-ui-panels/issues/4) TimberApp throws an error if the tools prop isn't provided
 - [**#3:**](https://github.com/StJohn3D/redux-ui-panels/issues/3) Container throws an error if no Flow is provided
___
###0.0.2

**New Features**
 - Added an NPM README

**Bug fixes**
 - There was no README on npm before
___
####0.0.1

Initial publish

**Features**
 - TimberApp component
   - Initializes the timber ui and injects the necessary css for you
   - Takes a _tools_ array property which can be used by all panels
 - Container component
   - Used to specify direction (HORIZONTAL or VERTICAL)
   - Can be nested in Panels
 - Panel component
   - Used to hold your own content or display the tools
   - Takes a _toolIndex_ int property which can specify which tool it should initialize with - 0 by default
 - timberUIReducer
   - Redux reducer for the timberUI - nothing works without it
   - Expects to be assign to a key of _timberUI_
 ***