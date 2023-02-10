
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import Create from './components/Create'
const App=()=>{

return(
<BrowserRouter>
<Routes>
<Route path='/' element={<Home/>} />
<Route path='/create' element={<Create/>} />

</Routes>
</BrowserRouter>

)
}
export default App