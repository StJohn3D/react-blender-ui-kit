import Repanel from './components/Repanel'
import Container from './components/Container'
import Panel from './components/Panel'
import repanelReducer from './reducers/'
import styles from './styles'
import jss from 'js-stylesheet'

module.exports = {
    Repanel,
    Container,
    Panel,
    repanelReducer,
    injectCSS: () => {
        jss(styles)
    }
}
