import { requireAll } from 'utils/util'

const modules = requireAll(require.context('./', true, /\.js$/), './index.js')
export default modules
