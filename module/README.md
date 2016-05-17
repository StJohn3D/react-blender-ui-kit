
#In Open Beta 0.x.x
For anyone interested in trying out this npm package please note that the 0.x.x series is to be considered an open beta.
Possible breaking changes may occur during this phase although I will do my best to avoid them and document in the change log.

This package is currently being tested with a greenfield enterprise solution. As the two projects evolve and mature this package will eventually reach a point where it will be considered production ready. At that time version 1.0.0 will be released and this package will follow [semver](http://semver.org/) from then on.

For more information see the project roadmap below, and feel free to reach out to me on [github](https://github.com/StJohn3D/repanel) or [twitter](https://twitter.com/StJohn3D)
___

[![Build Status](https://travis-ci.org/StJohn3D/repanel.svg?branch=master)](https://travis-ci.org/StJohn3D/repanel)
[![Coverage Status](https://coveralls.io/repos/github/StJohn3D/repanel/badge.svg?branch=master)](https://coveralls.io/github/StJohn3D/repanel?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/StJohn3D/repanel.svg)](https://gemnasium.com/github.com/StJohn3D/repanel)

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
    return(
    <Repanel tools={[
        <myAweseomeComponent1 name={"DropdownName"} yourProp1={"yourValue"} />,
        <myOtherCoolComponent name={"DropdownName at index 1"} {...YourBrops} />
    ]}>
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
    )
 }
```

##Project Road-map
 - Resize edge snapping **_feature_**
 - Cross container panel merging **_feature_**
 - Thorough documentation on github **_maintenance_**
 - v1.0.0 **_1st Production Ready Release!_**
 - Screen Casts demonstrations **_tutorial_**
 - Tonic example or some public demo page **_feature_**

##Change log

###0.0.8

**Improvements**
 - Travis Integration tests **_maintenance_**
 - Coveralls integration **_maintenance_**
 - Greeenkeeper integration **_maintenance_**
 - Gemnasium integration **_maintenance_**

###0.0.7

**Improvements**
 - [#9:](https://github.com/StJohn3D/repanel/issues/9) The .hidden class is now properly scoped to repanel-hidden
 - All CSS classes have been rescoped to repanel (formerly ruip)
   - NOTE: If you were overriding the CSS this will break your overrides. I'm releasing this under 0.0.7 because it is a hot fix for a publish that went out yesterday. Normally a breaking change like this would follow semver.
___
###0.0.6

**New Features**
 - Splitting/Merging Panels

**Improvements**
 - CHANGED NAME to repanel (Formerly redux-ui-panels) Last name change I promise
___
###0.0.5

**Improvements**
 - TimberUI is now TestDriven!
 - Row components will warn instead of throwing Invariant errors
   - This should never happen in production since the Row component is not exposed in the public api
   - Still, it is possible in development to accidentally create a row with no children
   - Now they will give a more meaningful warning message and return false
___
###0.0.4

 - CHANGED NAME to redux-ui-panels ( Formerly timber-ui )
___
###0.0.3

**New Features**
 - Added Project Road-Map and this Change log to the npm documentation

**Bug fixes**
 - [**#5:**](https://github.com/StJohn3D/repanel/issues/5) NPM documentation was missing ` from 'timber-ui'` in the _HOW to use it_ instructions
 - [**#4:**](https://github.com/StJohn3D/repanel/issues/4) TimberApp throws an error if the tools prop isn't provided
 - [**#3:**](https://github.com/StJohn3D/repanel/issues/3) Container throws an error if no Flow is provided
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