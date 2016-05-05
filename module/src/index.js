import ReduxUIPanels from './components/ReduxUIPanels'
import Container from './components/Container'
import Panel from './components/Panel'
import ReduxUIPanelsReducer from './reducers/'
import styles from './styles'
import jss from 'js-stylesheet'

module.exports = {
    ReduxUIPanels,
    Container,
    Panel,
    ReduxUIPanelsReducer,
    injectCSS: () => {
        jss(styles)
    }
}
