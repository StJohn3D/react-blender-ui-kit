import TimberApp from './components/TimberApp'
import Container from './components/Container'
import Panel from './components/Panel'
import timberUIReducer from './reducers/'
import styles from './styles'
import jss from 'js-stylesheet'

module.exports = {
    TimberApp,
    Container,
    Panel,
    timberUIReducer,
    injectCSS: () => {
        jss(styles)
    }
}
