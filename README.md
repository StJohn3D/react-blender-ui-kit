#repanel

####A configurable Redux panel framework inspired by blender.org

[![Build Status](https://travis-ci.org/StJohn3D/repanel.svg?branch=master)](https://travis-ci.org/StJohn3D/repanel)
[![Coverage Status](https://coveralls.io/repos/github/StJohn3D/repanel/badge.svg?branch=master)](https://coveralls.io/github/StJohn3D/repanel?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/StJohn3D/repanel.svg)](https://gemnasium.com/github.com/StJohn3D/repanel)
[![npm version](https://badge.fury.io/js/repanel.svg)](https://badge.fury.io/js/repanel)
[![Downloads](https://img.shields.io/npm/dm/repanel.svg)](https://www.npmjs.com/package/repanel)

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

Now go look at localhost:7765 (RPNL)

Also install the [Redux dev tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) in chrome if you haven't already
